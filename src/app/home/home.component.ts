import { Component, OnInit } from '@angular/core';
import {StorageMap} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   public isLoggedIn: any;

  constructor(private storage: StorageMap) {
    this.storage.watch('access_token').subscribe((value) => {
      this.isLoggedIn = value;
    })
  }

  ngOnInit(): void {}

}
