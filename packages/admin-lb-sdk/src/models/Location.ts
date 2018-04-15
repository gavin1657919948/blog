/* tslint:disable */
import {
  Host,
  Sensor
} from '../index';

declare var Object: any;
export interface LocationInterface {
  "id"?: number;
  "province"?: string;
  "city"?: string;
  "district"?: string;
  "address"?: string;
  "longitude"?: number;
  "latitude"?: number;
  "provinceId"?: number;
  "cityId"?: number;
  "districtId"?: number;
  "created"?: Date;
  "modified"?: Date;
  hosts?: Host[];
  sensors?: Sensor[];
}

export class Location implements LocationInterface {
  "id": number;
  "province": string;
  "city": string;
  "district": string;
  "address": string;
  "longitude": number;
  "latitude": number;
  "provinceId": number;
  "cityId": number;
  "districtId": number;
  "created": Date;
  "modified": Date;
  hosts: Host[];
  sensors: Sensor[];
  constructor(data?: LocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Location`.
   */
  public static getModelName() {
    return "Location";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Location for dynamic purposes.
  **/
  public static factory(data: LocationInterface): Location{
    return new Location(data);
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
      name: 'Location',
      plural: 'Locations',
      path: 'Locations',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "province": {
          name: 'province',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "district": {
          name: 'district',
          type: 'string'
        },
        "address": {
          name: 'address',
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
        "provinceId": {
          name: 'provinceId',
          type: 'number'
        },
        "cityId": {
          name: 'cityId',
          type: 'number'
        },
        "districtId": {
          name: 'districtId',
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
      }
    }
  }
}
