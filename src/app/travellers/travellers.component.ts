import { Component, OnInit } from '@angular/core';
import { Travellers } from "../models/travellers";
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.scss']
})
export class TravellersComponent implements OnInit {

  public label: string;
  public travellers: Travellers[];
  public errorMsg: string;

  constructor(private dataService: DataService) {
    this.label = '';
    this.travellers = [];
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.getTravellersList().then(() => {});
  }

  async getTravellersList() {
    (await this.dataService.getTravellersList())
      .subscribe(
        (response: any) => {
          this.label = response.result.label;
          this.travellers = response.result.travellers;

          this.travellers.push({
            first_name: 'Emma',
            last_name: 'Petreski',
            mail: 'emmapetreski@gmail.com',
            birthday: new Date('1993-05-23T09:00:00Z'),
            site_id: 'Q46X',
            user_id: '123456789',
          })
        },
        (error: any) => {
          this.errorMsg = error.error.message;
        }
      )
  }

}
