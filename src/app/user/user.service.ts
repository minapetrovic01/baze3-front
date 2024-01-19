import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'environment/environment.dev';
import { Observable } from 'rxjs';
import { UserDto } from '../entities/user.dto';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store:Store<AppState>) { }


  signUp(
    userDto: UserDto
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/user',
      { ...userDto },
      { observe: 'response' }
    );
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {///sta ovde
    console.log('000000000000000000000000000000')
    console.log(email);
    console.log(password)
    return this.http.post(
      url + '/user/signIn',
      { email: email, password: password },
      { observe: 'response' }
    );
  }

  
  

  getUser(email: string): Observable<HttpResponse<any>> {
    //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/user/' + email, { observe: 'response' });
  }

  deleteUser(email: string): Observable<HttpResponse<any>> {
    return this.http.delete(url + '/user/' + email, { observe: 'response' });
  }

  getProfile(token:string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/user/profile', { headers:headers, observe: 'response' });
  }
}



