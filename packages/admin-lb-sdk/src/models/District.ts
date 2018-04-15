/* tslint:disable */
import {
  Host,
  Sensor,
  Location
} from '../index';

declare var Object: any;
export interface DistrictInterface {
  "id"?: number;
  "cityId"?: number;
  "name"?: string;
  "longitude"?: number;
  "latitude"?: number;
  "created"?: Date;
  "modified"?: Date;
  hosts?: Host[];
  sensors?: Sensor[];
  locations?: Location[];
}

export class District implements DistrictInterface {
  "id": number;
  "cityId": number;
  "name": string;
  "longitude": number;
  "latitude": number;
  "created": Date;
  "modified": Date;
  hosts: Host[];
  sensors: Sensor[];
  locations: Location[];
  constructor(data?: DistrictInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `District`.
   */
  public static getModelName() {
    return "District";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of District for dynamic purposes.
  **/
  public static factory(data: DistrictInterface): District{
    return new District(data);
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
      name: 'District',
      plural: 'Districts',
      path: 'Districts',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "cityId": {
          name: 'cityId',
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
        locations: {
          name: 'locations',
          type: 'Location[]',
          model: 'Location'
        },
      }
    }
  }
}
