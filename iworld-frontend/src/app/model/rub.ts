import { SpiceMix } from './spicemix';

export interface Rub {
  id: number;
  lockVersion: number,
  creationDate: number,
  modificationDate: number,
  createdUser: string,
  modificationUser: string
  name: string;
  beschreibung: string;
  herkunft: string;
  url: string;

  gewuerzMischung: [SpiceMix];

}

export default Rub;
