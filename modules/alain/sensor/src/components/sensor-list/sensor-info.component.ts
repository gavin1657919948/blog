import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'
import { SensorApi } from '@uranplus/admin-lb-sdk'
import { BehaviorSubject, Subscription, Observable } from 'rxjs/Rx'
import * as moment from 'moment'
import { SensorsService } from '../../sensors.service'

@Component({
  selector: 'app-sensor-info',
  templateUrl: './sensor-info.component.html',
  styleUrls: ['./sensor-info.component.scss'],
})
export class SensorInfoComponent implements OnInit, OnDestroy {
  public item: any = {}
  items: any = []

  constructor(private service: SensorsService, private sensorApi: SensorApi) {}

  subscriptionList: Subscription[] = []

  ngOnInit() {
    this.item = this.service.selectedSensor
    this.sensorApi
      .findById(this.item.id, {
        include: 'channels',
      })
      .subscribe((sensor: any) => {
        const channels = sensor.channels.map(channel => {
          channel.modified = moment(channel.created).format('MM/DD hh:mm:ss')
          return channel
        })
        this.items.push(...channels)
      })
  }

  ngOnDestroy() {
    this.subscriptionList.forEach(item => item.unsubscribe())
  }
}
