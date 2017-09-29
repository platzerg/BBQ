import { Rub } from './rub';
import {MySpiceMix} from './mySpiceMix';
import {MySpice} from './mySpice';
import SpiceMix from './spicemix';
import {MyRub} from './myRub';
import Spice from './spice';

export class BBQFactory {

  static emptyRub(): Rub {
    const myRub: Rub = new MyRub(0, 0, 0, 0, '', '', '',  '', '', '', '', [BBQFactory.emptySpiceMix()]);
    return myRub ;
  }

  static emptySpiceMix(): SpiceMix {
    return new MySpiceMix(0, 0, 0, 0, '', '', 0, '', BBQFactory.emptySpice());
  }

  static emptySpice(): Spice {
    return new MySpice(0,0,0,0,'','','','','','');
  }

  static rubFromObject(rawRub: any): Rub {
    return new MyRub(
      rawRub.id,
      rawRub.lockVersion,
      rawRub.creationDate,
      rawRub.modificationDate,
      rawRub.createdUser,
      rawRub.modificationUser,
      rawRub.name,
      rawRub.beschreibung,
      rawRub.rezept,
      rawRub.herkunft,
      rawRub.url,
      rawRub.gewuerzMischung
    );
  }

  static spiceMixFromObject(rawSpiceMix: any): SpiceMix {
    return new MySpiceMix(
      rawSpiceMix.id,
      rawSpiceMix.lockVersion,
      rawSpiceMix.creationDate,
      rawSpiceMix.modificationDate,
      rawSpiceMix.createdUser,
      rawSpiceMix.modificationUser,
      rawSpiceMix.menge,
      rawSpiceMix.mengeneinheit,
      BBQFactory.spiceFromObject(rawSpiceMix.gewuerz)
    );
  }

  static spiceFromObject(rawSpice: any): Spice {
    return new MySpice(
      rawSpice.id,
      rawSpice.lockVersion,
      rawSpice.creationDate,
      rawSpice.modificationDate,
      rawSpice.createdUser,
      rawSpice.modificationUser,
      rawSpice.name,
      rawSpice.art,
      rawSpice.beschreibung,
      rawSpice.url
    )
  }

  static spiceUpdateFromObject(rawSpice: any): Spice {
    return new MySpice(
      rawSpice.id,
      0,
      0,
      0,
      null,
      null,
      rawSpice.name,
      rawSpice.art,
      rawSpice.beschreibung,
      rawSpice.url
    )
  }
};
