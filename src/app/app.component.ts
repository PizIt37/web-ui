import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smartagent';
  constructor(private auth: AuthService) {
    //this.auth.aaa();
    // this.auth.login({
    //   user_email: 'nyok@chevron.com',
    //   user_name: 'ted',
    //   user_password: 'teddy3018'
    // }).subscribe(val => {
    //   console.log('va;', val)
    // })
  }
}
