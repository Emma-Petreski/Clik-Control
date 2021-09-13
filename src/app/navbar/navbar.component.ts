import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StorageMap} from "@ngx-pwa/local-storage";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;
  public isNavbarCollapsed: boolean;

  constructor(private authService: AuthService, private router: Router, private storage: StorageMap) {
    this.isLoggedIn = false;
    this.isNavbarCollapsed = true;

    this.storage.watch('access_token').subscribe((value: any) => {
      this.isLoggedIn = value;
    })
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
