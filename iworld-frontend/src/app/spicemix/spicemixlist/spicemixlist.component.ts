import { Component, OnInit } from '@angular/core';

import {SpicemixlistService} from './services/spicemixlist.service';

@Component({
  selector: 'app-spicemixlist',
  templateUrl: './spicemixlist.component.html'
})
export class SpicemixlistComponent implements OnInit {

  constructor(
    private spicemixlistService: SpicemixlistService) {
    console.log("GPL SpicemixlistService");
  }

  ngOnInit() {
  }

}
