/* tslint:disable */

declare var Object: any;
export interface ProductModelInterface {
  "id"?: number;
  "name"?: string;
  "type"?: string;
  "url"?: string;
  "created"?: Date;
  "modified"?: Date;
}

export class ProductModel implements ProductModelInterface {
  "id": number;
  "name": string;
  "type": string;
  "url": string;
  "created": Date;
  "modified": Date;
  constructor(data?: ProductModelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProductModel`.
   */
  public static getModelName() {
    return "ProductModel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProductModel for dynamic purposes.
  **/
  public static factory(data: ProductModelInterface): ProductModel{
    return new ProductModel(data);
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
      name: 'ProductModel',
      plural: 'ProductModels',
      path: 'ProductModels',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "url": {
          name: 'url',
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
      },
      relations: {
      }
    }
  }
}
