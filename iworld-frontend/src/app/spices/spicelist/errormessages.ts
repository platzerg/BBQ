export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const SpiceFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Ein Name muss angegeben werden'),
  new ErrorMessage('art', 'required', 'Es muss eine Art angegeben werden'),
  new ErrorMessage('beschreibung', 'required', 'Es muss eine Beschreibung angegeben werden'),
  new ErrorMessage('url', 'minlength', 'Url muss mindestens 2 Zeichen enthalten'),
  new ErrorMessage('url', 'maxlength', 'Eine url darf höchstens 100 Zeichen haben'),
];
