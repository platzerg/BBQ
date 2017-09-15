/**
 * Created by platzerworld on 05.09.17.
 */
import Spice from './spice';

export class MySpice implements Spice {

  constructor(public id: number, public lockVersion: number,
              public creationDate: number, public modificationDate: number,
              public createdUser: string, public modificationUser: string,
              public name: string, public art: string,
              public beschreibung: string, public url: string) {}
}
