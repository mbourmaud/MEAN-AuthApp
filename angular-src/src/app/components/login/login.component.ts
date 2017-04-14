import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private flashMessagesService: FlashMessagesService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const User = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(User).subscribe(data => {

      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show("You are now logged in.", {
          cssClass: "alert alert-success",
          timeout: 5000
        });

        this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessagesService.show(data.msg, {
          cssClass: "alert alert-danger",
          timeout: 5000
        });

        this.router.navigate(['login']);
      }
    });
  }

}
