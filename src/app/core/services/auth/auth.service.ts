import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { environment } from 'src/environments/environment';
import { map, Observable, of, tap, catchError  } from 'rxjs';
import { LoginModel } from 'src/app/shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl :string = ''
  constructor(
    private httpClient: HttpClient,
    private router: Router) { 
      this.baseUrl = environment.baseUrl;
    }
    aaa() {
      console.log('aaa')
      this.httpClient.get(`https://ajm5wp4c05.execute-api.ap-southeast-1.amazonaws.com/dev/hello`).subscribe(val => {

        console.log('val;', val)
      })
    }
    login(data: LoginModel): Observable<boolean> {
      return this.httpClient.post<any>(`${this.baseUrl}auth`, data).pipe(
        tap((tokens) => this.doLoginUser(data.user_email, tokens)),
        map((res) => {
          return true;
        }),
        catchError((error) => {
          alert(error.error);
          return of(false);
        })
      );
    }
    getHeaders() {
      return new HttpHeaders({
        'Access-Control-Allow-Headers': ["Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"],
        'Access-Control-Allow-Origin': ["*"],
        'Access-Control-Allow-Methods':["DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"],
        'Content-Type': ["application/json"]
      });
    }
    logout() {
      this.doLogoutUser();
    }
  
    isLoggedIn() {
      return !!this.getJwtToken();
    }
  
    refreshToken() {
      return this.httpClient
        .post<any>(`${this.baseUrl}auth/refresh/token`, {
          refreshToken: this.getRefreshToken(),
        })
        .pipe(
          tap((tokens) => {
            this.storeTokens(tokens);
          }),
          catchError((error) => {
            this.doLogoutUser();
            return of(false);
          })
        );
    }
  
    getJwtToken(): string {
      return localStorage.getItem(environment.jwtToken) as string;
    }
  
    private doLoginUser(username?: string, tokens?:any) {
      this.storeTokens(tokens);
    }
  
    private doLogoutUser() {
      this.removeTokens();
      this.router.navigate(["/"]);
    }
  
    private getRefreshToken() {
      return localStorage.getItem(environment.refreshToken);
    }
  
    private storeTokens(tokens:any) {
      console.log('tokens', tokens)
      localStorage.setItem(environment.jwtToken, tokens.access_token);
      localStorage.setItem(environment.refreshToken, tokens.refresh_token);
    }
  
    private removeTokens() {
      localStorage.removeItem(environment.jwtToken);
      localStorage.removeItem(environment.refreshToken);
    }
}
