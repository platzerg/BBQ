import { Component, OnInit, OnDestroy } from '@angular/core';
import {Rub} from '../../model/rub';

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
  rubs: Rub[];

  selectedRub: Rub;

  get$: Subscription;

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

  private showError(errMsg: string) {
    console.log("Error: " + errMsg);
  }

}
