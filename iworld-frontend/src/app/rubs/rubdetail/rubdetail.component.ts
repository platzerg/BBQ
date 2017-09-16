import { Component, Input, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, Inject } from '@angular/core';

import {RubService} from '../services/rub.service';
import {Rub} from '../../model/rub';
import {Spice} from '../../model/spice';
import {SpiceMix} from '../../model/spicemix';
import {MySpiceMix} from '../../model/mySpiceMix';

import {Message, SelectItem} from 'primeng/components/common/api';


import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs';
import 'rxjs/add/operator/finally';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {MY_LOGGING_TOKEN} from '../../shared/token';
import {SpicelistService} from "../../spices/spicelist/services/spicelist.service";
import {MySpice} from "../../model/mySpice";

@Component({
  selector: 'rubdetail',
  templateUrl: './rubdetail.component.html'
})
export class RubdetailComponent implements OnInit {
  rub: Rub;

  spices: Spice[];

  gewuerzMischung: SpiceMix[];
  spiceMix: SpiceMix = new MySpiceMix(0, 0, 0, 0, "", "", 0, "", new MySpice(0,0,0,0,"","","","","",""));
  newspiceMix: boolean;

  arten: SelectItem[];

  selectedSpiceMix: SpiceMix;
  cols: any[];
  columnOptions: SelectItem[];

  id: number;

  isLoggingEnabled: boolean;


  displayDialog: boolean;

  edit$: Subscription;
  delete$: Subscription;

  editSpiceMix$: Subscription;
  addSpiceMix$: Subscription;

  constructor(
    @Inject(MY_LOGGING_TOKEN) loggingToken : boolean,
    private rubService: RubService,
    private spicelistService: SpicelistService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.isLoggingEnabled = loggingToken;
  }

  ngOnInit() {
    this.logIt("GPL Detail init");
    this.id = this.route.snapshot.params['id'];
    this.logIt(this.route.snapshot.params['id']);

    this.arten = [];
    this.arten.push({label: 'gemahlen', value: 'gemahlen'});
    this.arten.push({label: 'getrocknet', value: 'getrocknet'});
    this.arten.push({label: 'geröstet', value: 'geröstet'});
    this.arten.push({label: 'ganz', value: 'ganz'});

    this.spicelistService.getEmployees().subscribe(
      employees => {
        if(this.spices !== undefined) {
          console.log("gesamte Gewuerze: " + this.spices.length);
        }

        this.spices = employees;
      },
      error => this.showError(error)
    );

    if(this.id !== null && this.id > 0){
      this.rubService.getRub(this.id).subscribe(
        rub => {
          this.rub = rub;
          if(rub.gewuerzMischung === null || rub.gewuerzMischung === undefined ) {
            this.gewuerzMischung = [];
          } else {
            this.gewuerzMischung = rub.gewuerzMischung;
          }

        },
        error => this.logIt(error)
      );
    } else {
      this.rubService.getRubTemplate()
        .subscribe(
          (rubTemplate: Rub) => {
            this.rub = rubTemplate;
            this.id = rubTemplate.id;
            this.gewuerzMischung = rubTemplate.gewuerzMischung;
          },
          error => this.showError(error)
        );
    }

    this.cols = [
      {field: 'mengeneinheit', header: 'Mengeneinheit (contains)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"},
      {field: 'menge', header: 'Menge (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"},
      {field: 'gewuerz.name', header: 'Gewürz (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"},
      {field: 'gewuerz.art', header: 'Art (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"},
      {field: 'gewuerz.beschreibung', header: 'Beschreibung (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"},
      {field: 'gewuerz.url', header: 'URL (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"}

    ];
    this.columnOptions = [];
    for (let col of this.cols) {
      this.columnOptions.push({label: col.header, value: col});
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let changesMsgs: string[] = [];
    for (let propName in changes) {
      this.logIt(propName);
    }
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck() {
    this.logIt(`DoCheck`);
  }

  ngAfterContentInit() {
    this.logIt(`AfterContentInit`);
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked() {
    this.logIt(`AfterContentChecked`);
  }

  ngAfterViewInit() {
    this.logIt(`AfterViewInit`);
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked() {
    this.logIt(`AfterViewChecked`);
  }

  ngOnDestroy() {
    this.logIt(`OnDestroy`);
  }

  goBack(): void {
    this.location.back();
  }

  onRowDblClickCRUD(event: any) {
    // create a clone of the selected employee
    this.newspiceMix = false;
    console.log("onRowSelectCRUD: " + JSON.stringify(event.data));
    this.spiceMix = Object.assign({}, event.data);
    this.displayDialog = true;
  }

  save() {
    console.log("GPL Rub detail save: ");

    if(this.rub.id && this.rub.id > 0) {
      this.edit$ = this.rubService.updateRub(this.rub)
        .finally(() => {
        })
        .subscribe(
          (rub: Rub) => {
            this.rub = rub;
          },
          error => this.showError(error)
        );
    } else {
      this.rubService.createRub(this.rub)
        .finally(() => {
        })
        .subscribe(
          (rub: Rub) => {
            this.rub = rub;
          },
          error => this.showError(error)
        );
    }

  }

  saveSpiceMix() {
    console.log("saveSpiceMix");

    let gewuerzMischung = [...this.gewuerzMischung];
    if (this.newspiceMix) {
      gewuerzMischung.push(this.spiceMix);
    } else {
      gewuerzMischung[this.findSelectedSpiceMixIndex()] = this.spiceMix;
    }


    if (this.spiceMix.id && this.spiceMix.id > 0) {
      console.log("update");
      // update
      this.editSpiceMix$ = this.spicelistService.updateSpiceMix(this.id, this.spiceMix)
        .finally(() => {
          debugger;
          this.spiceMix = null;
          this.displayDialog = false;
        })
        .subscribe(
          () => {
            this.gewuerzMischung.some((element: SpiceMix, index: number) => {
              debugger;
              if (element.id === this.spiceMix.id) {
                this.gewuerzMischung[index] = Object.assign({}, this.spiceMix);
                this.gewuerzMischung = [...this.gewuerzMischung];
                this.selectedSpiceMix = this.gewuerzMischung[index];
                return true;
              }
            });
            this.logIt('Spice was successfully updated');
          },
          error => this.showError(error)
        );
    } else {
      // create
      console.log("create");
      this.addSpiceMix$ = this.spicelistService.createSpiceMix(this.id, this.spiceMix)
        .finally(() => {
          debugger;
          this.spiceMix = null;
          this.selectedSpiceMix = null;
          this.displayDialog = false;
        })
        .subscribe(
          (spiceMix: SpiceMix) => {
            debugger;
            this.gewuerzMischung = [...this.gewuerzMischung, spiceMix];
            this.logIt('Spice was successfully created');
          },
          error => this.showError(error)
        );
    }
  }

  deleteSpiceMix() {
    console.log("deleteSpiceMix start");
    this.removeSpiceMix();
    console.log("deleteSpiceMix end");
  }

  addSpiceMix() {
    console.log("addSpiceMix start")
    // create an empty employee
    this.newspiceMix = true;
    new MySpiceMix(0, 0, 0, 0, "", "", 0, "", new MySpice(0,0,0,0,"","","","","",""));
    this.spiceMix = new MySpiceMix(0, 0, 0, 0, "", "", 0, "", new MySpice(0,0,0,0,"","","","","",""));

    this.displayDialog = true;
    console.log("addSpiceMix end")
  }

  editSpiceMix() {
    console.log("editSpiceMix start");
    // create a clone of the selected employee
    this.spiceMix = Object.assign({}, this.selectedSpiceMix);

    this.displayDialog = true;
    console.log("editSpiceMix end")
  }

  removeSpiceMix() {
    console.log('removeSpiceMix');

    if (this.selectedSpiceMix === null) {
      return;
    }

    let index = this.findSelectedSpiceMixIndex();

    this.delete$ = this.rubService.deleteSpiceMix(this.rub.id, this.selectedSpiceMix.id)
      .finally(() => {
        this.selectedSpiceMix = null;
      })
      .subscribe(
        () => {
          this.gewuerzMischung = this.gewuerzMischung.filter(
            (element: SpiceMix) => element.id !== this.selectedSpiceMix.id);
          this.logIt('Rub was successfully removed');
        },
        error => this.showError(error)
      );

    console.log("removed");

  }

  findSelectedSpiceMixIndex(): number {
    return this.gewuerzMischung.indexOf(this.selectedSpiceMix);
  }

  logIt(msg: string) {
    if(this.isLoggingEnabled) {
      console.log("--- GPL --- " + msg);
    }
  }

  private showError(errMsg: string) {
    console.log("--- Error --- " + errMsg);
  }

}
