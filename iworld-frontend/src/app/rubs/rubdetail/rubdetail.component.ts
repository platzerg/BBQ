import { Component, Input, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, Inject } from '@angular/core';

import {RubService} from '../services/rub.service';
import {Rub} from '../../model/rub';

import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {MY_LOGGING_TOKEN} from '../../shared/token';

@Component({
  selector: 'rubdetail',
  templateUrl: './rubdetail.component.html'
})
export class RubdetailComponent implements OnInit {
  rub: Rub;

  id: number;

  isLoggingEnabled: boolean;


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

    if(this.id){
      this.rubService.getRub(this.id).subscribe(
        rub => {
          this.rub = rub;
        },
        error => this.logIt(error)
      );
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
    console.log("save: ");
  }

  logIt(msg: string) {
    if(this.isLoggingEnabled) {
      console.log("--- GPL --- " + msg);
    }

  }

}
