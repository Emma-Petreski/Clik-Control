import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {StorageMap} from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly ACCESS_TOKEN = 'access_token';

  constructor(private http: HttpClient, private storage: StorageMap) { }

  async reqOptionsToken() {
    return new Promise<any>((resolve => {
      this.storage.get(this.ACCESS_TOKEN)
        .subscribe((token: any) => {
          resolve({
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            params: {"access_token": token}
          });
        })
    }))
  }

  async getTravellersList() {
    return this.http.get(environment.apiUrl + '/profils_v2/v1/profil/booking-rules/travellers-list', await this.reqOptionsToken())
  }
}
