import { Component, OnInit, OnDestroy } from '@angular/core';
import {Rub} from '../../model/rub';
import SpiceMix from '../../model/spicemix';
import { MySpiceMix } from '../../model/mySpiceMix';
import {MySpice} from '../../model/mySpice';

import {RubService} from '../services/rub.service';

import {Message, SelectItem} from 'primeng/components/common/api';

import { Router } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { IAppState } from '../../app.state';
import { ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { RubActions } from '../../actions/rubs';

export function allRubs(state: IAppState) {
  debugger;
  return state.rubs.all;
}

@Component({
  selector: 'app-rublist',
  templateUrl: './rublist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RublistComponent implements OnInit, OnDestroy {

  @select(allRubs) myRubs$: Observable<Rub[]>;

  msgs: Message[] = [];
  isDebug = false;


  rubs: Rub[];

  selectedRub: Rub;

  delete$: Subscription;

  cols: any[];

  columnOptions: SelectItem[];

  constructor(private rublistService: RubService,
              private router: Router,
              private rubsAction: RubActions
  ) {  }


  ngOnInit() {
    this.rubsAction.getAllRubs();
    this.myRubs$.subscribe(
      rubs => {
        this.rubs = rubs;
      },
        error => this.showError(error)
    );

    this.cols = [
      {field: 'name', header: 'Name (contains)', sortable: 'true',
        filter: 'true', editable: 'true', filterMatchMode: 'contains', fPlaceholder: 'Search'},
      {field: 'herkunft', header: 'Herkunft (startsWith)', sortable: 'true',
        filter: 'true', editable: 'true', filterMatchMode: 'equals', fPlaceholder: 'Search'},
      {field: 'beschreibung', header: 'Beschreibung (Custom)', sortable: 'true',
        filter: 'true', editable: 'true', filterMatchMode: 'contains', fPlaceholder: 'Search'},
      {field: 'url', header: 'URL (contains)', sortable: 'true',
        filter: 'true', editable: 'true', filterMatchMode: 'contains', fPlaceholder: 'Search'}

    ];
    this.columnOptions = [];
    for (const col of this.cols) {
      this.columnOptions.push({label: col.header, value: col});
    }

  }

  ngOnDestroy() {
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
  }

  onRowDblClickCRUD(event: any) {
    const rub = event.data;
    console.log(rub);
    this.router.navigate(['/rubdetail', rub.id], { queryParams: { rub: 'GPL' } });
  }

  onSort(event: any) {
    console.log('sort');
  }

  add() {
    console.log('add');
    this.router.navigate(['/rubdetail', 0]);
  }

  edit() {
    console.log('edit');
    console.log(this.selectedRub);

    this.router.navigate(['/rubdetail', this.selectedRub.id]);
  }

  remove() {
    if (this.selectedRub === null) {
      return;
    }

    if (confirm('Wollen Sie den Rub wirklich löschen?')) {
      this.rubsAction.removeRub(this.selectedRub);
      console.log('remove');
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
