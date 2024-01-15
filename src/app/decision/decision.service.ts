import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { url } from 'environment/environment.dev';
import { Observable, filter, map } from 'rxjs';
import { AppState } from '../app.state';
import { selectUserData } from '../store/user.selectors';
import { DecisionDto } from '../entities/decision.dto';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {
  
  userId:number=0;


  constructor(private http: HttpClient, private store:Store<AppState>) { }

  getMyDecisions():Observable<HttpResponse<any>>{
    this.store.select(selectUserData).pipe(
      filter((userData)=>!!userData),
      map((userData)=>userData!.id)
    ).subscribe((userId)=>{
      this.userId=userId;
    });
;
    return this.http.get(url+`/decision/owner/${this.userId}`,{observe:'response'});
    
  }
  getSearchedDecisions(search:string):Observable<HttpResponse<any>>{
    return this.http.get(url+'/decision/alternativeName/'+search,{observe:'response'});
    
  }

  createDecision(decision:DecisionDto):Observable<HttpResponse<any>>{
    this.store.select(selectUserData).pipe(
      filter((userData)=>!!userData),
      map((userData)=>userData!.id)
    ).subscribe((userId)=>{
      this.userId=userId;
    });
    return this.http.post(url+`/decision?userId=${this.userId}`,decision,{observe:'response'});
  }
}
