/* tslint:disable */
import {
  Sensor,
  ChannelLog
} from '../index';

declare var Object: any;
export interface ChannelInterface {
  "id"?: number;
  "no"?: number;
  "name"?: string;
  "unit"?: string;
  "threshold"?: string;
  "elecLocation"?: string;
  "elecDevice"?: string;
  "sensorId"?: number;
  "created"?: Date;
  "modified"?: Date;
  sensor?: Sensor;
  channelLogs?: ChannelLog[];
}

export class Channel implements ChannelInterface {
  "id": number;
  "no": number;
  "name": string;
  "unit": string;
  "threshold": string;
  "elecLocation": string;
  "elecDevice": string;
  "sensorId": number;
  "created": Date;
  "modified": Date;
  sensor: Sensor;
  channelLogs: ChannelLog[];
  constructor(data?: ChannelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Channel`.
   */
  public static getModelName() {
    return "Channel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Channel for dynamic purposes.
  **/
  public static factory(data: ChannelInterface): Channel{
    return new Channel(data);
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
      name: 'Channel',
      plural: 'Channels',
      path: 'Channels',
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
        "unit": {
          name: 'unit',
          type: 'string'
        },
        "threshold": {
          name: 'threshold',
          type: 'string'
        },
        "elecLocation": {
          name: 'elecLocation',
          type: 'string'
        },
        "elecDevice": {
          name: 'elecDevice',
          type: 'string'
        },
        "sensorId": {
          name: 'sensorId',
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
        sensor: {
          name: 'sensor',
          type: 'Sensor',
          model: 'Sensor'
        },
        channelLogs: {
          name: 'channelLogs',
          type: 'ChannelLog[]',
          model: 'ChannelLog'
        },
      }
    }
  }
}
