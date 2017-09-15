/**
 * Created by platzerworld on 02.09.17.
 */


export interface Spice {
  id: number;
  lockVersion: number,
  creationDate: number,
  modificationDate: number,
  createdUser: string,
  modificationUser: string
  name: string;
  art: string;
  beschreibung: string;
  url: string;
}

export default Spice;
