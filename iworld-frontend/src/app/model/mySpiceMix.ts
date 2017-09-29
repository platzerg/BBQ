import SpiceMix from './spicemix';
import Spice from './spice';
import {MySpice} from './mySpice';

export class MySpiceMix implements SpiceMix {


  constructor(public id: number, public lockVersion: number,
              public creationDate: number, public modificationDate: number,
              public createdUser: string, public modificationUser: string,
              public menge: number, public mengeneinheit: string,
              public gewuerz: MySpice) {
  }
}
