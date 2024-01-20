import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { url } from 'environment/environment.dev';
import { Observable, filter, map } from 'rxjs';
import { AppState } from '../app.state';
import { selectUserData } from '../store/user.selectors';
import { DecisionDto } from '../entities/decision.dto';
import { AlternativeDto } from '../entities/alternative.dto';
import { CriteriaDto } from '../entities/criteria.dto';
import { TagDto } from '../entities/tag.dto';
import { Decision } from '../entities/decision';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  userId: number = 0;
  userEmail: string = "";

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getMyDecisions(): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });

    return this.http.get(url + `/decision/owner/${this.userEmail}`, { observe: 'response' });//mail

  }

  getCachedDecisions(): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.get(url + `/decision/cached/${this.userEmail}`, { observe: 'response' });
  }

  deleteCachedDecisions(): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.delete(url + `/decision/cached/${this.userEmail}`, { observe: 'response' });
  }


  getSearchedDecisions(search: string): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.get(url + '/decision/tagName/' + search + `/${this.userEmail}`, { observe: 'response' });

  }

  createDecision(decision: DecisionDto, tags: TagDto[]): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.post(url + `/decision?userEmail=${this.userEmail}`, { decisionDto: decision, tags }, { observe: 'response' });
  }

  createDraft(decision: Decision): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.post(url + `/decision/unfinished/${this.userEmail}`, decision, { observe: 'response' });
  }
  getDraft(): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.get(url + `/decision/unfinished/${this.userEmail}`, { observe: 'response' });
  }
  deleteDraft(): Observable<HttpResponse<any>> {
    this.store.select(selectUserData).pipe(
      filter((userData) => !!userData),
      map((userData) => userData!.email)
    ).subscribe((email) => {
      this.userEmail = email;
    });
    return this.http.delete(url + `/decision/unfinished/${this.userEmail}`, { observe: 'response' });
  }

  deleteDecision(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(url + `/decision/${id}`, { observe: 'response' });
  }

}
