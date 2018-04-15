/* tslint:disable */
import {
  Host,
  SystemUser,
  Channel,
  ProductModel
} from '../index';

declare var Object: any;
export interface SensorInterface {
  "serial_no"?: string;
  "productModelId"?: number;
  "name"?: string;
  "id"?: number;
  "hostId"?: number;
  "systemDomainId"?: string;
  "created"?: Date;
  "modified"?: Date;
  "provinceId"?: number;
  "cityId"?: number;
  "districtId"?: number;
  "locationId"?: number;
  host?: Host;
  users?: SystemUser[];
  channels?: Channel[];
  productModel?: ProductModel;
}

export class Sensor implements SensorInterface {
  "serial_no": string;
  "productModelId": number;
  "name": string;
  "id": number;
  "hostId": number;
  "systemDomainId": string;
  "created": Date;
  "modified": Date;
  "provinceId": number;
  "cityId": number;
  "districtId": number;
  "locationId": number;
  host: Host;
  users: SystemUser[];
  channels: Channel[];
  productModel: ProductModel;
  constructor(data?: SensorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Sensor`.
   */
  public static getModelName() {
    return "Sensor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Sensor for dynamic purposes.
  **/
  public static factory(data: SensorInterface): Sensor{
    return new Sensor(data);
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
      name: 'Sensor',
      plural: 'Sensors',
      path: 'Sensors',
      properties: {
        "serial_no": {
          name: 'serial_no',
          type: 'string'
        },
        "productModelId": {
          name: 'productModelId',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "hostId": {
          name: 'hostId',
          type: 'number'
        },
        "systemDomainId": {
          name: 'systemDomainId',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
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
        "locationId": {
          name: 'locationId',
          type: 'number'
        },
      },
      relations: {
        host: {
          name: 'host',
          type: 'Host',
          model: 'Host'
        },
        users: {
          name: 'users',
          type: 'SystemUser[]',
          model: 'SystemUser'
        },
        channels: {
          name: 'channels',
          type: 'Channel[]',
          model: 'Channel'
        },
        productModel: {
          name: 'productModel',
          type: 'ProductModel',
          model: 'ProductModel'
        },
      }
    }
  }
}
