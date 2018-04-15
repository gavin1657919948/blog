/* tslint:disable */

declare var Object: any;
export interface MdbInterface {
  "id"?: number;
}

export class Mdb implements MdbInterface {
  "id": number;
  constructor(data?: MdbInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Mdb`.
   */
  public static getModelName() {
    return "Mdb";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Mdb for dynamic purposes.
  **/
  public static factory(data: MdbInterface): Mdb{
    return new Mdb(data);
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
      name: 'Mdb',
      plural: 'Mdbs',
      path: 'Mdbs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
