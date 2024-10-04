import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { User } from '../../models/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response)=> {
        if(response.userId != null) {
          const user: User = {
            id: response.userId,
            role: response.userRole
          }
          StorageService.saveUser(user);
          StorageService.saveToken(response.jwt);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl("/customer/dashboard");
          } else {
            this.message.error("Bad credentials", {nzDuration: 5000})
          }
        }
      },
      error: (error) => {
        this.message.error("An error occurred while processing your request. Please try again or contact support.", {nzDuration: 5000});
        console.log(error);
      }
    })
  }
}
