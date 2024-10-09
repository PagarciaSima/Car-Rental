import { AuthService } from '../../services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy{

  isSpinning: boolean = false;
  signupForm!: FormGroup;
  private registerSubscription: Subscription = new Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate]],
    });
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean} => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  register() {
    console.log(this.signupForm.value);
    this.registerSubscription = this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          if( res.id != null) {
            this.message.success("Signup successful", { nzDuration:5000 });
            this.router.navigateByUrl("/login")
          } else {
            this.message.error("Something went wrong", { nzDuration:5000 })
          }
        }, error: (err) => {
          console.log("Error: ", err);
        }
      })
  }

}
