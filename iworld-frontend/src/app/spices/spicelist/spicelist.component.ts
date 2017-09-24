import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {SpicelistService} from './services/spicelist.service';
import {Spice} from '../../model/spice';
import {MySpice} from '../../model/mySpice';
import {Message, SelectItem} from 'primeng/components/common/api';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {Subscription} from 'rxjs';
import 'rxjs/add/operator/finally';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

import {MY_CONFIG_TOKEN, MY_LOGGING_TOKEN} from '../../shared/token';
import {SpiceFormErrorMessages} from "./errormessages";
import {BBQFactory} from "../../model/BBQFactory";

@Component({
  selector: 'app-spicelist',
  templateUrl: './spicelist.component.html'
})
export class SpicelistComponent implements OnInit, OnDestroy {

  title = 'app';
  spiceForm: FormGroup;
  errors: { [key: string]: string } = {};

  msgs: Message[] = [];
  isDebug = false;

  activeIndex: number = 0;

  spice: Spice = new MySpice(0, 0, 0, 0, "", "", "", "", "", "");

  basicSpice: Spice[];

  spices: Spice[];

  selectedSpice: Spice;

  selectedSpices: Spice[];

  displayDialog: boolean;

  stacked: boolean;

  newSpice: boolean;

  totalRecords: number = 100;

  engines: SelectItem[];

  grades: SelectItem[];

  expandedRows: any[];

  cols: any[];

  columnOptions: SelectItem[];

  get$: Subscription;
  add$: Subscription;
  edit$: Subscription;
  delete$: Subscription;

  constructor(@Inject(MY_CONFIG_TOKEN) token : string,
              @Inject(MY_LOGGING_TOKEN) loggingtoken : boolean,
    private spicelistService: SpicelistService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    console.log("GPL SpicelistService: " + token);
    console.log("-- IS LOGGING -- : " + loggingtoken);

    route.fragment.forEach((f:string) => {
      console.log("GPL Fragment: " +f);
    });

    router.events.subscribe(e => {
      console.log("router event", e);
    });
  }

  ngOnInit(): void {
    console.log("GPL");

     var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log("Auswertung Parameter " + params['page'] || 0);
      });

    this.route.url.subscribe(() => {
      var snap = this.route.snapshot; // any time url changes, this callback is fired
      console.log("route.snapshot: " + snap);
    });

    this.get$ = this.spicelistService.getEmployees().subscribe(
      employees => {
        if(this.spices !== undefined) {
          console.log("gesamte Gewuerze: " + this.spices.length);
        }

        this.spices = employees;
        this.totalRecords = this.spices.length;
      },
      error => this.showError(error)
    );

    this.spicelistService.getEmployees().subscribe((spices: any) => this.spices = spices);
    this.spicelistService.getEmployees().subscribe((spices: any) => this.basicSpice = spices.slice(0, 10));
    this.cols = [
      {field: 'name', header: 'Name (contains)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"},
      {field: 'art', header: 'Art (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"},
      {field: 'beschreibung', header: 'Beschreibung (Custom)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"},
      {field: 'url', header: 'URL (contains)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"}

    ];
    this.columnOptions = [];
    for (let col of this.cols) {
      this.columnOptions.push({label: col.header, value: col});
    }

    this.engines = [];
    this.engines.push({label: 'All engines', value: null});
    this.engines.push({label: 'Trident', value: 'Trident'});
    this.engines.push({label: 'Gecko', value: 'Gecko'});
    this.engines.push({label: 'Webkit', value: 'Webkit'});

    this.grades = [];
    this.grades.push({label: 'A', value: 'A'});
    this.grades.push({label: 'B', value: 'B'});
    this.grades.push({label: 'C', value: 'C'});

    this.initSpiceList();


  }

  initSpiceList() {
    this.spiceForm = this.fb.group({
      id: [this.spice.id],
      name: [this.spice.name, Validators.required],
      art: [this.spice.art, Validators.required],
      beschreibung: [this.spice.beschreibung, Validators.required],
      url: [this.spice.url, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]]

    });
    this.spiceForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  ngOnDestroy() {
    //this.get$.unsubscribe();
    //this.add$.unsubscribe();
    //this.edit$.unsubscribe();
    //this.delete$.unsubscribe();
  }

  private showError(errMsg: string) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Sorry, an error occurred', detail: errMsg});
  }

  private showSuccess(successMsg: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', detail: successMsg});
  }

  onRowClick(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Browser clicked', detail: event.data});
  }

  onRowDblClick(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Browser double clicked', detail: event.data});
  }

  onRowSelect(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Type of selection:', detail: event.type});
    this.msgs.push({severity: 'info', summary: 'Browser Selected', detail: event.data});
  }

  onRowUnselect(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Type of selection:', detail: event.type});
    this.msgs.push({severity: 'info', summary: 'Browser Unselected', detail: event.data});
  }

  onHeaderCheckboxToggle(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Header checkbox toggled:', detail: event.checked});
  }

  onContextMenuSelect(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Selected data', detail: event.data});
  }

  onColResize(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Resized column header' + event.element,
      detail: 'Change of column width' +  event.delta + 'px'});
  }

  onColReorder(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Index of dragged column', detail: event.dragIndex});
    this.msgs.push({severity: 'info', summary: 'Index of dropped column', detail: event.dropIndex});
    this.msgs.push({severity: 'info', summary: 'Columns array after reorder', detail: event.columns});
  }

  onEditInit(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Column is ', detail: event.column});
    this.msgs.push({severity: 'info', summary: 'Row data', detail: event.data});
  }

  onEdit(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Row index', detail: event.index});
    this.msgs.push({severity: 'info', summary: 'Column is ', detail: event.column});
    this.msgs.push({severity: 'info', summary: 'Row data', detail: event.data});
  }
  onEditComplete(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Row index', detail: event.index});
    this.msgs.push({severity: 'info', summary: 'Column is ', detail: event.column});
    this.msgs.push({severity: 'info', summary: 'Row data', detail: event.data});
  }

  onEditCancel(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Row index', detail: event.index});
    this.msgs.push({severity: 'info', summary: 'Column is ', detail: event.column});
    this.msgs.push({severity: 'info', summary: 'Row data', detail: event.data});
  }

  onPage(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Index of first record:', detail: JSON.stringify(event.first)});
    this.msgs.push({severity: 'info', summary: 'Number of rows: ', detail: JSON.stringify(event.rows)});
  }

  onSort(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Sort field:', detail: JSON.stringify(event.field)});
    this.msgs.push({severity: 'info', summary: 'Sort order: ', detail: JSON.stringify(event.order)});
    if (event.multisortmeta) {
      this.msgs.push({severity: 'info', summary: 'Multisort Meta data:', detail: event.multisortmeta});
    }
  }

  onFilter(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Filter object(field,value and matchmode):', detail: JSON.stringify(event.filters)});
  }

  onRowExpand(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Expanded row:', detail: event.data});
  }
  onRowCollapse(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Collapsed row:', detail: event.data});
  }

  onRowGroupExpand(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Row group expanded:', detail: event.group});
  }

  onRowGroupCollapse(event: any) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Row group collapsed:', detail: event.group});
  }

  loadBrowsersLazy(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    this.spicelistService.getEmployees().subscribe((spices: any) =>
      this.spices = spices.slice(event.first, (event.first + event.rows)));
  }


  onRowSelectCRUD(event: any) {
    // create a clone of the selected employee
    this.newSpice = false;
    console.log("onRowSelectCRUD: " + JSON.stringify(event.data));
    this.spice = Object.assign({}, event.data);
    this.initSpiceList();
    this.displayDialog = true;
  }

  onRowDblClickCRUD(event: any) {
    // create a clone of the selected employee
    this.newSpice = false;
    console.log("onRowSelectCRUD: " + JSON.stringify(event.data));
    this.spice = Object.assign({}, event.data);
    this.initSpiceList();
    this.displayDialog = true;
  }

  findSelectedSpiceIndex(): number {
    return this.spices.indexOf(this.selectedSpice);
  }

  selectSpice(spice: Spice) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Browser selected', detail: 'Browser: ' + spice});
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  onChangeStep(label: string) {
    this.msgs.length = 0;
    this.msgs.push({severity: 'info', summary: label});
  }

  addSpice() {
    this.newSpice = true;
    this.spice = new MySpice(0, 0, 0, 0, "", "", "", "", "", "");
    this.initSpiceList();
    this.displayDialog = true;
  }

  add() {
    // create an empty employee
    this.spice = {
      id: 0,
      lockVersion: 0,
      creationDate: 0,
      modificationDate: 0,
      createdUser: "",
      modificationUser: "",
      name: "",
      art: "",
      beschreibung: "",
      url: "",
    };

    this.initSpiceList();
    this.displayDialog = true;
    this.showSuccess('added');
  }

  edit() {

    // create a clone of the selected employee
    this.spice = Object.assign({}, this.selectedSpice);
    this.initSpiceList();

    this.displayDialog = true;
    this.showSuccess('edited');
  }

  remove() {
    if (this.selectedSpice === null) {
      return;
    }

    if(confirm('Wollen Sie das Gewürz wirklich löschen?')){
      let index = this.findSelectedSpiceIndex();

      this.delete$ = this.spicelistService.deleteSpice(this.selectedSpice.id)
        .finally(() => {
          this.spice = null;
          this.selectedSpice = null;
          this.displayDialog = false;
        })
        .subscribe(
          () => {
            this.spices = this.spices.filter(
              (element: Spice) => element.id !== this.selectedSpice.id);
            this.showSuccess('Spice was successfully removed');
          },
          error => this.showError(error)
        );

      console.log("remove");
    }
  }

  reset() {
    this.spiceForm.reset(new MySpice(0, 0, 0, 0, "", "", "", "", "", ""));
  }

  delete() {
    this.remove();
  }

  save() {
    debugger;
    console.log("save: id: " +this.spice.id);
    let spices = [...this.spices];
    if (this.newSpice) {
      spices.push(this.spice);
    } else {
      spices[this.findSelectedSpiceIndex()] = this.spice;
    }

    this.spice = BBQFactory.spiceUpdateFromObject(this.spiceForm.value);
    debugger;

    if (this.spice.id && this.spice.id > 0) {
      console.log("update");
      // update
      this.edit$ = this.spicelistService.updateSpice(this.spice)
        .finally(() => {
          this.spice = null;
          this.displayDialog = false;
        })
        .subscribe(
          () => {
            this.spices.some((element: Spice, index: number) => {
              if (element.id === this.spice.id) {
                this.spices[index] = Object.assign({}, this.spice);
                this.spices = [...this.spices];
                this.selectedSpice = this.spices[index];
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
      this.add$ = this.spicelistService.createSpice(this.spice)
        .finally(() => {
          this.spice = null;
          this.selectedSpice = null;
          this.displayDialog = false;
        })
        .subscribe(
          (spice: Spice) => {
            this.spices = [...this.spices, spice];
            this.showSuccess('Spice was successfully created');
          },
          error => this.showError(error)
        );
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of SpiceFormErrorMessages) {
      const control = this.spiceForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
