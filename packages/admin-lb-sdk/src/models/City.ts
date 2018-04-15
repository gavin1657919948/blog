/* tslint:disable */
import {
  Host,
  Sensor,
  District,
  Location
} from '../index';

declare var Object: any;
export interface CityInterface {
  "id"?: number;
  "provinceId"?: number;
  "name"?: string;
  "longitude"?: number;
  "latitude"?: number;
  "created"?: Date;
  "modified"?: Date;
  hosts?: Host[];
  sensors?: Sensor[];
  districts?: District[];
  locations?: Location[];
}

export class City implements CityInterface {
  "id": number;
  "provinceId": number;
  "name": string;
  "longitude": number;
  "latitude": number;
  "created": Date;
  "modified": Date;
  hosts: Host[];
  sensors: Sensor[];
  districts: District[];
  locations: Location[];
  constructor(data?: CityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `City`.
   */
  public static getModelName() {
    return "City";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of City for dynamic purposes.
  **/
  public static factory(data: CityInterface): City{
    return new City(data);
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
      name: 'City',
      plural: 'Citys',
      path: 'Citys',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "provinceId": {
          name: 'provinceId',
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
        districts: {
          name: 'districts',
          type: 'District[]',
          model: 'District'
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
