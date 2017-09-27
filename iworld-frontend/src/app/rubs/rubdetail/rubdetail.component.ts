import { Component, Input, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, Inject } from '@angular/core';

import {RubService} from '../services/rub.service';
import {Rub} from '../../model/rub';
import {Spice} from '../../model/spice';
import {SpiceMix} from '../../model/spicemix';
import {MySpiceMix} from '../../model/mySpiceMix';

import {Message, SelectItem} from 'primeng/components/common/api';

import { Router } from '@angular/router';

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
  msgs: Message[] = [];
  isDebug: boolean = false;

  private paramsIdSubscription$: Subscription;
  private pageSubscription$: Subscription;

  rub: Rub;

  spices: Spice[];

  gewuerzMischung: SpiceMix[];
  spiceMix: SpiceMix = new MySpiceMix(0, 0, 0, 0, "", "", 0, "", new MySpice(0,0,0,0,"","","","","",""));
  newspiceMix: boolean;

  arten: SelectItem[];

  selectedSpiceMix: SpiceMix;

  gewuerze: SelectItem[];
  selectedGewuerz: any;
  selectedGewuerze: string[] = [];

  cols: any[];
  columnOptions: SelectItem[];

  id: number;

  displayDialog: boolean;

  edit$: Subscription;
  delete$: Subscription;

  editSpiceMix$: Subscription;
  addSpiceMix$: Subscription;

  constructor(
    @Inject(MY_LOGGING_TOKEN) loggingToken : boolean,
    private rubService: RubService,
    private spicelistService: SpicelistService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.isDebug = loggingToken;
  }

  ngOnInit() {
    this.showSuccess("GPL Detail init");
    this.id = this.route.snapshot.params['id'];
    this.showSuccess(this.route.snapshot.params['id']);

    this.route.params.subscribe(params => {
      debugger;
      const paramId = params["id"];
    });

    var gpl = this.route.snapshot.data['rub'];

    this.paramsIdSubscription$ = this.route.params.subscribe(params => {
      console.log("GPL Param from subscription: " +params['id']); // (+) converts string 'id' to a number
    });
    debugger;

    this.pageSubscription$ = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        var myRub = params['rub'];
        console.log("GPL Param from subscription Rub Name: " + myRub);
      });

    this.arten = [];
    this.arten.push({label: 'gemahlen', value: 'gemahlen'});
    this.arten.push({label: 'getrocknet', value: 'getrocknet'});
    this.arten.push({label: 'geröstet', value: 'geröstet'});
    this.arten.push({label: 'ganz', value: 'ganz'});

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
        error => this.showSuccess(error)
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

  ngOnChanges(changes: SimpleChanges) {
    let changesMsgs: string[] = [];
    for (let propName in changes) {
      this.showSuccess(propName);
    }
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck() {
    this.showSuccess(`DoCheck`);
  }

  ngAfterContentInit() {
    this.showSuccess(`AfterContentInit`);
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked() {
    this.showSuccess(`AfterContentChecked`);
  }

  ngAfterViewInit() {
    this.showSuccess(`AfterViewInit`);
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked() {
    this.showSuccess(`AfterViewChecked`);
  }

  ngOnDestroy() {
    this.showSuccess(`OnDestroy`);
    this.paramsIdSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  onRowDblClickCRUD(event: any) {
    // create a clone of the selected employee
    this.newspiceMix = false;
    console.log("onRowSelectCRUD: " + JSON.stringify(event.data));
    //this.spiceMix = Object.assign({}, event.data);
    this.editSpiceMix();
    //this.displayDialog = true;
  }

  onSelectFocus() {
    this.showSuccess(`OnDestroy`);
  }

  onSelectBlur() {
    this.showSuccess(`OnDestroy`);
  }

  onSelectChange() {
    this.showSuccess(`OnDestroy`);
    this.spiceMix.gewuerz = this.selectedGewuerz;
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
            this.router.navigate(['/rublist']);
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
      this.editSpiceMix$ = this.spicelistService.updateSpiceMix(this.id, this.spiceMix, this.rub)
        .finally(() => {
          this.spiceMix = null;
          this.displayDialog = false;
        })
        .subscribe(
          () => {
            this.gewuerzMischung.some((element: SpiceMix, index: number) => {
              if (element.id === this.spiceMix.id) {
                this.gewuerzMischung[index] = Object.assign({}, this.spiceMix);
                this.gewuerzMischung = [...this.gewuerzMischung];
                this.selectedSpiceMix = this.gewuerzMischung[index];
                return true;
              }
            });
            this.showSuccess('Spice was successfully updated');
          },
          error => this.showError(error)
        );
    } else {
      // create
      console.log("create");
      this.addSpiceMix$ = this.spicelistService.createSpiceMix(this.id, this.spiceMix)
        .finally(() => {
          this.spiceMix = null;
          this.selectedSpiceMix = null;
          this.displayDialog = false;
        })
        .subscribe(
          (spiceMix: SpiceMix) => {
            this.gewuerzMischung = [...this.gewuerzMischung, spiceMix];
            this.showSuccess('Spice was successfully created');
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
    debugger;
    this.newspiceMix = true;
    new MySpiceMix(0, 0, 0, 0, "", "", 0, "", new MySpice(0,0,0,0,"","","","","",""));
    this.spiceMix = new MySpiceMix(0, 0, 0, 0, "", "", 0, "", new MySpice(0,0,0,0,"","","","","",""));
    this.router.navigate(['/rubdetail/' + this.rub.id +'/spicemixdetail/' + this.spiceMix.id]);
    //this.displayDialog = true;
    console.log("addSpiceMix end")
  }

  editSpiceMix() {
    debugger;
    console.log("editSpiceMix start");
    // create a clone of the selected employee
    this.spiceMix = Object.assign({}, this.selectedSpiceMix);
    this.router.navigate(['/rubdetail/' + this.rub.id +'/spicemixdetail/' + this.spiceMix.id]);


    //this.displayDialog = true;
    console.log("editSpiceMix end")
  }

  removeSpiceMix() {
    console.log('removeSpiceMix');

    if (this.selectedSpiceMix === null) {
      return;
    }

    if(confirm('Wollen Sie den Rub wirklich löschen?')){
      let index = this.findSelectedSpiceMixIndex();

      this.delete$ = this.rubService.deleteSpiceMix(this.rub.id, this.selectedSpiceMix.id)
        .finally(() => {
          this.selectedSpiceMix = null;
          this.spiceMix = null;
          this.displayDialog = false;

        })
        .subscribe(
          () => {
            this.gewuerzMischung = this.gewuerzMischung.filter(
              (element: SpiceMix) => element.id !== this.selectedSpiceMix.id);
            this.showSuccess('Rub was successfully removed');
          },
          error => this.showError(error)
        );

      console.log("removed");
    }
  }

  findSelectedSpiceMixIndex(): number {
    return this.gewuerzMischung.indexOf(this.selectedSpiceMix);
  }

  areFormsSaved(): boolean {
    console.log("areFormsSaved")
    return true;
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
