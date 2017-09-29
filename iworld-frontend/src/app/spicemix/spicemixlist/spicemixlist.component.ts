import { Component, OnInit } from '@angular/core';

import {SpicemixService} from '../services/spicemix.service';

@Component({
  selector: 'app-spicemixlist',
  templateUrl: './spicemixlist.component.html'
})
export class SpicemixlistComponent implements OnInit {

  constructor(
    private spicemixlistService: SpicemixService) {
    console.log('GPL SpicemixService');
  }

  ngOnInit() {
  }

}
