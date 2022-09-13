import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginModel } from 'src/app/shared/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:LoginModel = new LoginModel();
  constructor(
    private auth: AuthService,
    private route: Router
    ) { }

  ngOnInit(): void {
  }
  doLogin() {
    this.auth.login(this.model).subscribe(val => {
      if(!val) return;
       this.route.navigate(['home']);
    });
  }

}
