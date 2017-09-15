import { Component, Input, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, Inject } from '@angular/core';

import {RubService} from '../services/rub.service';
import {Rub} from '../../model/rub';
import {SpiceMix} from '../../model/spicemix';

import {Message, SelectItem} from 'primeng/components/common/api';


import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs';
import 'rxjs/add/operator/finally';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {MY_LOGGING_TOKEN} from '../../shared/token';

@Component({
  selector: 'rubdetail',
  templateUrl: './rubdetail.component.html'
})
export class RubdetailComponent implements OnInit {
  rub: Rub;

  gewuerzMischung: SpiceMix[];

  selectedSpiceMix: SpiceMix;
  cols: any[];
  columnOptions: SelectItem[];

  id: number;

  isLoggingEnabled: boolean;

  edit$: Subscription;

  constructor(
    @Inject(MY_LOGGING_TOKEN) loggingToken : boolean,
    private rubService: RubService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.isLoggingEnabled = loggingToken;
  }

  ngOnInit() {
    this.logIt("GPL Detail init");
    this.id = this.route.snapshot.params['id'];
    this.logIt(this.route.snapshot.params['id']);

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

  logIt(msg: string) {
    if(this.isLoggingEnabled) {
      console.log("--- GPL --- " + msg);
    }
  }

  private showError(errMsg: string) {
    console.log("--- Error --- " + errMsg);
  }

}
