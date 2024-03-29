/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { Core } from '../../models/Core';
import { StorageContainer } from '../../models/StorageContainer';
import { System } from '../../models/System';
import { ContentEvent } from '../../models/ContentEvent';
import { ContentPage } from '../../models/ContentPage';
import { ContentProduct } from '../../models/ContentProduct';
import { ContentPost } from '../../models/ContentPost';
import { StorageFile } from '../../models/StorageFile';
import { SystemDomain } from '../../models/SystemDomain';
import { SystemSetting } from '../../models/SystemSetting';
import { SystemUser } from '../../models/SystemUser';
import { Host } from '../../models/Host';
import { Sensor } from '../../models/Sensor';
import { Province } from '../../models/Province';
import { City } from '../../models/City';
import { District } from '../../models/District';
import { Location } from '../../models/Location';
import { SensorLog } from '../../models/SensorLog';
import { ChannelLog } from '../../models/ChannelLog';
import { Channel } from '../../models/Channel';
import { AreaCenter } from '../../models/AreaCenter';
import { ProductModel } from '../../models/ProductModel';
import { Mdb } from '../../models/Mdb';
import { Ping } from '../../models/Ping';
import { Meta } from '../../models/Meta';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    Core: Core,
    StorageContainer: StorageContainer,
    System: System,
    ContentEvent: ContentEvent,
    ContentPage: ContentPage,
    ContentProduct: ContentProduct,
    ContentPost: ContentPost,
    StorageFile: StorageFile,
    SystemDomain: SystemDomain,
    SystemSetting: SystemSetting,
    SystemUser: SystemUser,
    Host: Host,
    Sensor: Sensor,
    Province: Province,
    City: City,
    District: District,
    Location: Location,
    SensorLog: SensorLog,
    ChannelLog: ChannelLog,
    Channel: Channel,
    AreaCenter: AreaCenter,
    ProductModel: ProductModel,
    Mdb: Mdb,
    Ping: Ping,
    Meta: Meta,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
