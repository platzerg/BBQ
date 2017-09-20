import { Component, OnInit, OnDestroy } from '@angular/core';
import {Rub} from '../../model/rub';
import SpiceMix from '../../model/spicemix';
import { MySpiceMix } from '../../model/mySpiceMix';
import {MySpice} from '../../model/mySpice';

import {RubService} from '../services/rub.service';

import {Message, SelectItem} from 'primeng/components/common/api';

import { Router } from '@angular/router';

import {Subscription} from 'rxjs';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-rublist',
  templateUrl: './rublist.component.html'
})
export class RublistComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  isDebug: boolean = false;


  rubs: Rub[];

  selectedRub: Rub;

  get$: Subscription;
  delete$: Subscription;

  cols: any[];

  columnOptions: SelectItem[];

  constructor(private rublistService: RubService,
              private router: Router) {  }

  ngOnInit() {
    this.get$ = this.rublistService.getRubs().subscribe(
      employees => {
        if(this.rubs !== undefined) {
          console.log("gesamte Rubs: " + this.rubs.length);
        }

        this.rubs = employees;
      },
      error => this.showError(error)
    );

    this.cols = [
      {field: 'name', header: 'Name (contains)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"},
      {field: 'herkunft', header: 'Herkunft (startsWith)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "equals", fPlaceholder: "Search"},
      {field: 'beschreibung', header: 'Beschreibung (Custom)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"},
      {field: 'url', header: 'URL (contains)', sortable: "true", filter: "true", editable: "true", filterMatchMode: "contains", fPlaceholder: "Search"}

    ];
    this.columnOptions = [];
    for (let col of this.cols) {
      this.columnOptions.push({label: col.header, value: col});
    }

  }

  ngOnDestroy() {
    this.get$.unsubscribe();
  }

  onRowDblClickCRUD(event: any) {
    var rub = event.data;
    console.log(rub);

    this.router.navigate(['/rubdetail', rub.id]);
  }

  onSort(event: any) {
    console.log("sort");
  }

  add() {
    console.log("add");
    this.router.navigate(['/rubdetail', 0]);
  }

  edit(){
    console.log("edit");
    console.log(this.selectedRub);

    this.router.navigate(['/rubdetail', this.selectedRub.id]);
  }

  remove() {
    if (this.selectedRub === null) {
      return;
    }

    if(confirm('Wollen Sie den Rub wirklich löschen?')){
      let index = this.findSelectedRubIndex();

      this.delete$ = this.rublistService.deleteRub(this.selectedRub.id)
        .finally(() => {
          this.selectedRub = null;
        })
        .subscribe(
          () => {
            this.rubs = this.rubs.filter(
              (element: Rub) => element.id !== this.selectedRub.id);
            this.showSuccess('Rub was successfully removed');
          },
          error => this.showSuccess(error)
        );

      console.log("remove");
    }

  }

  findSelectedRubIndex(): number {
    return this.rubs.indexOf(this.selectedRub);
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
