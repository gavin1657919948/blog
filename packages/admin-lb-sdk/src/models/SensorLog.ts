/* tslint:disable */

declare var Object: any;
export interface SensorLogInterface {
  "mac"?: string;
  "message"?: string;
  "pack_time"?: Date;
  "sensors"?: any;
  "id"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class SensorLog implements SensorLogInterface {
  "mac": string;
  "message": string;
  "pack_time": Date;
  "sensors": any;
  "id": number;
  "created": Date;
  "modified": Date;
  constructor(data?: SensorLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SensorLog`.
   */
  public static getModelName() {
    return "SensorLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SensorLog for dynamic purposes.
  **/
  public static factory(data: SensorLogInterface): SensorLog{
    return new SensorLog(data);
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
      name: 'SensorLog',
      plural: 'SensorLogs',
      path: 'SensorLogs',
      properties: {
        "mac": {
          name: 'mac',
          type: 'string'
        },
        "message": {
          name: 'message',
          type: 'string'
        },
        "pack_time": {
          name: 'pack_time',
          type: 'Date'
        },
        "sensors": {
          name: 'sensors',
          type: 'any'
        },
        "id": {
          name: 'id',
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
