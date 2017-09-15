import { Spice } from './spice';

export interface SpiceMix {
  id: number;
  lockVersion: number,
  creationDate: number,
  modificationDate: number,
  createdUser: string,
  modificationUser: string
  menge: number;
  mengeneinheit: string;

  gewuerz: Spice;
}

export default SpiceMix;
