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
      url + '/auth/signup',
      { ...userDto },
      { observe: 'response' }
    );
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      url + '/auth/signin',
      { email: email, password: password },
      { observe: 'response' }
    );
  }

  auth(token: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/auth/guardtest', {
      headers: headers,
      observe: 'response',
    });
  }

  getUser(id: number,token:string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/user/' + id, { headers:headers, observe: 'response' });
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(url + '/user/' + id, { observe: 'response' });
  }

  getProfile(token:string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + '/user/profile', { headers:headers, observe: 'response' });
  }

  checkIfSubscribed(
    subscriberId: number,
    subscribesToId: number
  ): Observable<HttpResponse<any>> {
    return this.http.get(
      url + `/user/checkIfSubscribed/${subscriberId}/${subscribesToId}`,
      { observe: 'response' }
    );
  }

  subscribeTo(subscriberId: number, subscribesToId: number) {
    return this.http.post(
      url + `/user/subscribe/${subscriberId}/${subscribesToId}`,
      {},
      { observe: 'response' }
    );
  }

  unsubscribeFrom(subscriberId: number, subscribesToId: number) {
    return this.http.delete(
      url + `/user/unsubscribe/${subscriberId}/${subscribesToId}`,
      { observe: 'response' }
    );
  }

  getSubscribeesBooks(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribees/${id}/books`, {
      observe: 'response',
    });
  }

  getSubscribeesPapers(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribees/${id}/papers`, {
      observe: 'response',
    });
  }

  getSubscribeesProjects(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribees/${id}/projects`, {
      observe: 'response',
    });
  }

  getAllSubscribers(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + `/user/subscribers/${id}`, {
      observe: 'response',
    });
  }
}



