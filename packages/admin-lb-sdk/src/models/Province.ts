/* tslint:disable */
import {
  Host,
  Sensor,
  City,
  Location
} from '../index';

declare var Object: any;
export interface ProvinceInterface {
  "id"?: number;
  "name"?: string;
  "longitude"?: number;
  "latitude"?: number;
  "created"?: Date;
  "modified"?: Date;
  hosts?: Host[];
  sensors?: Sensor[];
  citys?: City[];
  locations?: Location[];
}

export class Province implements ProvinceInterface {
  "id": number;
  "name": string;
  "longitude": number;
  "latitude": number;
  "created": Date;
  "modified": Date;
  hosts: Host[];
  sensors: Sensor[];
  citys: City[];
  locations: Location[];
  constructor(data?: ProvinceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Province`.
   */
  public static getModelName() {
    return "Province";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Province for dynamic purposes.
  **/
  public static factory(data: ProvinceInterface): Province{
    return new Province(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Province',
      plural: 'Provinces',
      path: 'Provinces',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'number'
        },
        "latitude": {
          name: 'latitude',
          type: 'number'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
        hosts: {
          name: 'hosts',
          type: 'Host[]',
          model: 'Host'
        },
        sensors: {
          name: 'sensors',
          type: 'Sensor[]',
          model: 'Sensor'
        },
        citys: {
          name: 'citys',
          type: 'City[]',
          model: 'City'
        },
        locations: {
          name: 'locations',
          type: 'Location[]',
          model: 'Location'
        },
      }
    }
  }
}
