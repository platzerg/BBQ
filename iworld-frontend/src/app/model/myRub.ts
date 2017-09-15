import SpiceMix from './spicemix';
import Spice from "./spice";
import Rub from "./rub";
import {MySpiceMix} from "./mySpiceMix";

export class MyRub implements Rub {


  constructor(public id: number, public lockVersion: number,
              public creationDate: number, public modificationDate: number,
              public createdUser: string, public modificationUser: string,
              public name: string, public beschreibung: string,
              public herkunft: string, public url: string,
              public gewuerzMischung: [MySpiceMix]) {
  }
}
