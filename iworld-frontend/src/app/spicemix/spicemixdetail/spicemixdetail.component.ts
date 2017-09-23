import { Component, OnInit, Inject } from '@angular/core';
import {Message, SelectItem} from 'primeng/components/common/api';
import SpiceMix from "../../model/spicemix";

import {MY_LOGGING_TOKEN} from '../../shared/token';

import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Spice from "../../model/spice";

import {SpicelistService} from "../../spices/spicelist/services/spicelist.service";
import {SpicemixService} from "../services/spicemix.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-spicemixdetail',
  templateUrl: './spicemixdetail.component.html'
})
export class SpicemixdetailComponent implements OnInit {
  msgs: Message[] = [];
  isDebug: boolean = false;

  rubid: number;
  spicemixid: number;

  spiceMix: SpiceMix;

  spices: Spice[];

  gewuerze: SelectItem[];
  selectedGewuerz: any;

  editSpiceMix$: Subscription;
  addSpiceMix$: Subscription;
  delete$: Subscription;

  constructor(
    @Inject(MY_LOGGING_TOKEN) loggingToken : boolean,
    private location: Location,
    private spicelistService: SpicelistService,
    private spicemixService: SpicemixService,
    private route: ActivatedRoute) {
      this.isDebug = loggingToken;
  }

  ngOnInit() {
    this.rubid = this.route.snapshot.params['rubid'];
    this.spicemixid = this.route.snapshot.params['spicemixid'];

    this.spicelistService.getEmployees().subscribe(
      allSpices => {
        if(this.spices !== undefined) {
          console.log("gesamte Gewuerze: " + allSpices.length);
        }
        this.spices = allSpices;
        this.generateGewuerze(allSpices);
      },
      error => this.showError(error)
    );

    this.spicemixService.getSpicemix(this.rubid, this.spicemixid).subscribe(
      spicemix => {
        this.spiceMix = spicemix;

      },
      error => this.showSuccess(error)
    );
  }

  generateGewuerze(spicesArray: Spice[]) {
    let spiceList: any[] = [];
    for (let spice of spicesArray) {
      let spicArt = spice.art !== undefined && spice.art !== null ? spice.art : "";
      spiceList.push({
        label: spice.name + " " + spicArt,
        value: {
          id: spice.id,
          lockVersion: spice.lockVersion,
          creationDate: spice.creationDate,
          modificationDate: spice.modificationDate,
          createdUser: spice.createdUser,
          modificationUser: spice.modificationUser,
          name: spice.name,
          art: spice.art,
          beschreibung: spice.beschreibung,
          url: spice.url
        }
      });
    }
    this.gewuerze = spiceList;
  }


  onSelectFocus() {
    this.showSuccess(`onSelectFocus`);
  }

  onSelectBlur() {
    this.showSuccess(`onSelectBlur`);
  }

  onSelectChange() {
    this.showSuccess(`onSelectChange`);
  }

  deleteSpiceMix() {
    console.log("deleteSpiceMix start");
    this.removeSpiceMix();
    console.log("deleteSpiceMix end");
  }

  removeSpiceMix() {
    console.log('removeSpiceMix');

    if (this.spiceMix === null) {
      return;
    }

    if(confirm('Wollen Sie die Gewürzmischung wirklich löschen?')){

      this.delete$ = this.spicemixService.deleteSpiceMix(this.rubid, this.spicemixid)
        .finally(() => {
          this.spiceMix = null;
        })
        .subscribe(
          () => {
            this.location.back();
            this.showSuccess('Rub was successfully removed');
          },
          error => this.showError(error)
        );

      console.log("removed");
    }
  }

  saveSpiceMix() {
    console.log("saveSpiceMix");
    if (this.spiceMix.id && this.spiceMix.id > 0) {
      console.log("update");
      // update
      this.editSpiceMix$ = this.spicelistService.updateSpiceMix(this.spicemixid, this.spiceMix, null)
        .finally(() => {
          this.spiceMix = null;
        })
        .subscribe(
          () => {

            this.showSuccess('Spice was successfully updated');
          },
          error => this.showError(error)
        );
    } else {
      // create
      console.log("create");
      this.addSpiceMix$ = this.spicelistService.createSpiceMix(this.rubid, this.spiceMix)
        .finally(() => {
          this.spiceMix = null;
        })
        .subscribe(
          (spiceMix: SpiceMix) => {
            this.spiceMix = spiceMix;
            this.showSuccess('Spice was successfully created');
          },
          error => this.showError(error)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  private showError(errMsg: string) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Sorry, an error occurred', detail: errMsg});
  }

  private showSuccess(successMsg: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', detail: successMsg});
  }

}