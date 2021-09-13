import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageMap} from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor( private router: Router, public storage: StorageMap) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.storage.has('access_token').subscribe((value) =>{
      if (!value){
        window.alert('Access Denied, Login is Required to Access This Page!')
        this.router.navigate(['/home'])
      }
    })
    return true;
  }
}
