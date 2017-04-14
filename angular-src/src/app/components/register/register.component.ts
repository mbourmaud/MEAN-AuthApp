import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  password: String;
  email: String;

  // Services injections
  constructor(private validateService: ValidateService,
              private flashMessagesService: FlashMessagesService,
              private authService: AuthService,
              private router: Router
  ) { }

  // When the register form is submitted
  onRegisterSubmit() {
    const User = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    }

    // Required fields
    if (!this.validateService.validateRegister(User)) {
      this.flashMessagesService.show('Please fill in all the fields', { cssClass: 'alert alert-danger', timeout: 3000 });
    }
    else if (!this.validateService.validateEmail(User.email)) {
      this.flashMessagesService.show('Please use a valid email.', { cssClass: 'alert alert-danger', timeout: 3000 });
    }

    // Try to register the user into the db
    this.authService.registerUser(User).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessagesService.show('Something went wrong!', { cssClass: 'alert alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }


  ngOnInit() {
  }

}
