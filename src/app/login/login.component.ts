import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthData } from "../models/authData";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly SITE_ID: string = 'Q46X';

  public formLogin: FormGroup;
  public errorMsg: string;
  public submitted: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.errorMsg = '';
    this.submitted = false;
    this.formLogin = {} as FormGroup;
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      id: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  get formControls() {
    return this.formLogin.controls;
  }

  setAuthData() {
    const authData: AuthData = {
      user_id: this.formLogin.value.id,
      site_id: this.SITE_ID,
      password: this.formLogin.value.password
    };

    return authData;
  }

  submit(): void {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
    }

    this.authService.login(this.setAuthData())
      .subscribe(
        () => {
          this.router.navigate(['/travellers']);
        },
        (error) => {
          this.errorMsg = error.error.message;
        }
      )
  }

}
