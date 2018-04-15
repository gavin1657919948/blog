import {
  Component,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core'
import { MapService } from '../map.service'
import { Router, ActivatedRoute } from '@angular/router'
import {
  SystemUserApi,
  AreaCenterApi,
  LocationApi,
  Location,
  ProvinceApi,
  CityApi,
  DistrictApi,
} from '@uranplus/admin-lb-sdk'
import { NzMessageService } from 'ng-zorro-antd'
import { AbmComponent } from 'angular-baidu-maps'
import { concat } from '../../../../../node_modules/rxjs/operators/concat'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import * as _ from 'lodash'

declare const BMap: any
declare const BMAP_SATELLITE_MAP: any

interface Marker {
  point: any
  // location: Location
  // province: Province
  // city: City
  // district: District
  title: string
  content: string
  count: number
}

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss'],
})
export class MapDisplayComponent implements OnInit {
  options: any = {}
  status = ''
  points: any
  @ViewChild('map') mapComp: AbmComponent
  satelliteOptions: any
  private mapSatellite: any
  private mapRange$ = new ReplaySubject<any[]>(1)
  private map: any
  private point: any
  private infoWindowData$ = new ReplaySubject<any>(1)
  private ngUnsubscribe = new Subject()
  private areaHostCountCacheMap = new Map<string, Observable<number>>()

  private viewHight: any

  constructor(
    public service: MapService,
    private el: ElementRef,
    private zone: NgZone,
    public router: Router,
    private route: ActivatedRoute,
    private userApi: SystemUserApi,
    private areaCenterApi: AreaCenterApi,
    private locationApi: LocationApi,
    private provinceApi: ProvinceApi,
    private cityApi: CityApi,
    private districtApi: DistrictApi,
    public msg: NzMessageService
  ) {
    this.mapRange$
      .switchMap(range => this.getAreaCenters$(...range))
      .startWith({ centers: [], level: 'district' })
      .pairwise()
      .switchMap(centers_pair => {
        let bClearOverlays: boolean
        if (centers_pair[0].level === centers_pair[1].level) {
          bClearOverlays = false
          if (centers_pair[1].level !== 'location') {
            const markers$ = _.differenceBy(centers_pair[1].centers, centers_pair[0].centers, 'id').map(center =>
              this.getMarker$(center, centers_pair[1].level)
            )
            return Observable.zip(...markers$, (...markers: Marker[]) => ({
              markers: markers.filter(marker => marker.count > 0),
              bClearOverlays,
            }))
          } else {
            const markers = centers_pair[1].centers.map(location => this.getLocationMarker(location))
            return Observable.of({ markers, bClearOverlays })
          }
        } else {
          bClearOverlays = true
          if (centers_pair[1].level !== 'location') {
            const markers$ = centers_pair[1].centers.map(center => this.getMarker$(center, centers_pair[1].level))
            return Observable.zip(...markers$, (...markers: Marker[]) => ({
              markers: markers.filter(marker => marker.count > 0),
              bClearOverlays,
            }))
          } else {
            const markers = centers_pair[1].centers.map(location => this.getLocationMarker(location))
            return Observable.of({ markers, bClearOverlays })
          }
        }
      })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(markers_obj => {
        if (markers_obj.bClearOverlays) {
          this.map.clearOverlays()
        }
        markers_obj.markers.forEach(marker => this.displayMarker(marker))
      })

    this.infoWindowData$.takeUntil(this.ngUnsubscribe).subscribe(infoWindowData => {
      const opts = {
        width: 250, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: infoWindowData.title, // 信息窗口标题
      }
      const infoWindow = new BMap.InfoWindow(infoWindowData.content, opts) // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, infoWindowData.point) // 打开信息窗口
    })
  }

  getLocationMarker(location: any) {
    const point = new BMap.Point(location.longitude, location.latitude)
    const title = location.address
    const number = location.hostsCount
    const content = '主机数有：' + number + '台'
    return { title, point, number, content }
  }

  getMarker$(center, level): Observable<Marker> {
    const point = new BMap.Point(center.longitude, center.latitude)
    return this.getAreaHostCount$(level, center.id).map(count => ({
      title: center.name,
      content: '主机数有：' + count + '台',
      count,
      point,
    }))
  }
  getAreaHostCount$(level, id) {
    if (this.areaHostCountCacheMap.has(level + ':' + id)) {
      return this.areaHostCountCacheMap.get(level + ':' + id)
    } else {
      const observable = this[level + 'Api']
        .countHosts(id)
        .map(result => result.count)
        .publishReplay(1)
        .refCount()
      this.areaHostCountCacheMap.set(level + ':' + id, observable)
      return observable
    }
    /*function hashCode(s) {
      return s.split('').reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)
    }

    return Observable.of(Math.abs(hashCode(level + areaId)) % 1000)*/
  }

  onReady(map: any) {
    this.map = map

    // 初始位置在武汉
    map.centerAndZoom('武汉', 13)
    map.setMaxZoom(18)
    map.enableScrollWheelZoom(true)
    this.status = '加载完成'

    // 添加监听事件
    map.addEventListener('tilesloaded', () => {
      this.status = '地图加载完毕'
    })
    map.addEventListener('dragend', () => {
      this.mapRange$.next(this.getMapRange())
    })
    map.addEventListener('zoomend', () => {
      this.mapRange$.next(this.getMapRange())
    })
    map.addEventListener('click', this._click.bind(this))
  }

  // 获取屏幕显示的经纬度范围
  getMapRange() {
    const bs = this.map.getBounds()
    const bssw = bs.getSouthWest()
    const bsne = bs.getNorthEast()
    return [bssw, bsne]
  }

  // 获取主机数
  getHosts(points) {
    const list = []
    const areas = []

    const json = {}
    for (let i = 0; i < points.length; i++) {
      if (!json[points[i].district]) {
        list.push(points[i].district)
        json[points[i].district] = 1
      }
    }
    for (let j = 0; j < list.length; j++) {
      areas[j] = { name: list[j], hostsNum: 0 }
    }
    for (let k = 0; k < points.length; k++) {
      for (let i = 0; i < list.length; i++) {
        if (points[k].district === areas[i].name) {
          areas[i].hostsNum += points[k].hosts.length
        }
      }
    }
  }
  // 获取地图中的行政中心点
  getAreaCenters$(...point) {
    const filter = {
      where: {
        longitude: { between: [point[0].lng, point[1].lng] },
        latitude: { between: [point[0].lat, point[1].lat] },
      },
    }
    return this.provinceApi.find(filter).flatMap(provinces => {
      if (provinces.length >= 5) {
        return Observable.of({ centers: provinces, level: 'province' })
      } else {
        return this.cityApi.find(filter).flatMap(cities => {
          if (cities.length >= 5) {
            return Observable.of({ centers: cities, level: 'city' })
          } else {
            return this.districtApi.find(filter).flatMap(districts => {
              if (districts.length >= 5) {
                return Observable.of({ centers: districts, level: 'district' })
              } else {
                return this.locationApi.getList('hosts', filter).map(locations => {
                  return { centers: locations, level: 'location' }
                })
              }
            })
          }
        })
      }
    })
  }

  _click(e: any) {
    this.status = `${e.point.lng}, ${e.point.lat}, ${+new Date()}`
  }
  displayMarker(marker) {
    const bMapMarker = new BMap.Marker(marker.point)
    bMapMarker.addEventListener('click', () => this.infoWindowData$.next(marker))

    this.map.addOverlay(bMapMarker)
  }

  ngOnInit() {}

  ngOndestory() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
