/* tslint:disable */
import {
  SystemUser,
  Sensor,
  Location,
  ProductModel
} from '../index';

declare var Object: any;
export interface HostInterface {
  "productModelId"?: number;
  "mac"?: string;
  "name"?: string;
  "project"?: string;
  "id"?: number;
  "installerId"?: string;
  "maintainerId"?: string;
  "systemDomainId"?: string;
  "created"?: Date;
  "modified"?: Date;
  "provinceId"?: number;
  "cityId"?: number;
  "districtId"?: number;
  "locationId"?: number;
  installer?: SystemUser;
  maintainer?: SystemUser;
  users?: SystemUser[];
  sensors?: Sensor[];
  location?: Location;
  productModel?: ProductModel;
}

export class Host implements HostInterface {
  "productModelId": number;
  "mac": string;
  "name": string;
  "project": string;
  "id": number;
  "installerId": string;
  "maintainerId": string;
  "systemDomainId": string;
  "created": Date;
  "modified": Date;
  "provinceId": number;
  "cityId": number;
  "districtId": number;
  "locationId": number;
  installer: SystemUser;
  maintainer: SystemUser;
  users: SystemUser[];
  sensors: Sensor[];
  location: Location;
  productModel: ProductModel;
  constructor(data?: HostInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Host`.
   */
  public static getModelName() {
    return "Host";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Host for dynamic purposes.
  **/
  public static factory(data: HostInterface): Host{
    return new Host(data);
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
      name: 'Host',
      plural: 'Hosts',
      path: 'Hosts',
      properties: {
        "productModelId": {
          name: 'productModelId',
          type: 'number'
        },
        "mac": {
          name: 'mac',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "project": {
          name: 'project',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "installerId": {
          name: 'installerId',
          type: 'string'
        },
        "maintainerId": {
          name: 'maintainerId',
          type: 'string'
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
        installer: {
          name: 'installer',
          type: 'SystemUser',
          model: 'SystemUser'
        },
        maintainer: {
          name: 'maintainer',
          type: 'SystemUser',
          model: 'SystemUser'
        },
        users: {
          name: 'users',
          type: 'SystemUser[]',
          model: 'SystemUser'
        },
        sensors: {
          name: 'sensors',
          type: 'Sensor[]',
          model: 'Sensor'
        },
        location: {
          name: 'location',
          type: 'Location',
          model: 'Location'
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
