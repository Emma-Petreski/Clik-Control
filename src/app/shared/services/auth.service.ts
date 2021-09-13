import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {map} from "rxjs/operators";
import {StorageMap} from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'access_token';

  constructor(private http: HttpClient, private storage: StorageMap) { }

  reqOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
  }

  login(loginValue: {}) {
    return this.http.post(environment.apiUrl + '/auth/v1/click', loginValue, this.reqOptions())
      .pipe(map((res: any) => {
        this.storage.set(this.ACCESS_TOKEN, res.token).subscribe(() => {});
        return res;
      }));
  }

  logout() {
    this.storage.delete(this.ACCESS_TOKEN).subscribe(() => {})
  }
}
