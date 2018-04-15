/* tslint:disable */

declare var Object: any;
export interface ChannelLogInterface {
  "id"?: number;
  "no"?: number;
  "name"?: string;
  "funcDefine"?: number;
  "value"?: number;
  "alarm"?: number;
  "fault"?: number;
  "status"?: number;
  "fixLeakCurrent"?: number;
  "transferRatio"?: number;
  "threshold"?: number;
  "pack_time"?: Date;
  "created"?: Date;
  "modified"?: Date;
  "channelId"?: number;
}

export class ChannelLog implements ChannelLogInterface {
  "id": number;
  "no": number;
  "name": string;
  "funcDefine": number;
  "value": number;
  "alarm": number;
  "fault": number;
  "status": number;
  "fixLeakCurrent": number;
  "transferRatio": number;
  "threshold": number;
  "pack_time": Date;
  "created": Date;
  "modified": Date;
  "channelId": number;
  constructor(data?: ChannelLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ChannelLog`.
   */
  public static getModelName() {
    return "ChannelLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ChannelLog for dynamic purposes.
  **/
  public static factory(data: ChannelLogInterface): ChannelLog{
    return new ChannelLog(data);
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
      name: 'ChannelLog',
      plural: 'ChannelLogs',
      path: 'ChannelLogs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "no": {
          name: 'no',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "funcDefine": {
          name: 'funcDefine',
          type: 'number'
        },
        "value": {
          name: 'value',
          type: 'number'
        },
        "alarm": {
          name: 'alarm',
          type: 'number'
        },
        "fault": {
          name: 'fault',
          type: 'number'
        },
        "status": {
          name: 'status',
          type: 'number'
        },
        "fixLeakCurrent": {
          name: 'fixLeakCurrent',
          type: 'number'
        },
        "transferRatio": {
          name: 'transferRatio',
          type: 'number'
        },
        "threshold": {
          name: 'threshold',
          type: 'number'
        },
        "pack_time": {
          name: 'pack_time',
          type: 'Date'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
        "channelId": {
          name: 'channelId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
