/* tslint:disable */

declare var Object: any;
export interface AreaCenterInterface {
  "id"?: number;
  "areaId"?: string;
  "address"?: string;
  "level"?: string;
  "lng"?: number;
  "lat"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class AreaCenter implements AreaCenterInterface {
  "id": number;
  "areaId": string;
  "address": string;
  "level": string;
  "lng": number;
  "lat": number;
  "created": Date;
  "modified": Date;
  constructor(data?: AreaCenterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AreaCenter`.
   */
  public static getModelName() {
    return "AreaCenter";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AreaCenter for dynamic purposes.
  **/
  public static factory(data: AreaCenterInterface): AreaCenter{
    return new AreaCenter(data);
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
      name: 'AreaCenter',
      plural: 'AreaCenters',
      path: 'AreaCenters',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "areaId": {
          name: 'areaId',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "level": {
          name: 'level',
          type: 'string'
        },
        "lng": {
          name: 'lng',
          type: 'number'
        },
        "lat": {
          name: 'lat',
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
      }
    }
  }
}
