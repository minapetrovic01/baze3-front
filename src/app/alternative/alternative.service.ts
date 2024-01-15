import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlternativeDto } from '../entities/alternative.dto';
import { url } from 'environment/environment.dev';
import { Observable, catchError, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlternativeService {

  constructor(private http: HttpClient) { }

 ;

  createAlternatives(alternatives:AlternativeDto[],decisionId:number):Observable<any[]>{
    

    const requests: Observable<any>[] = alternatives.map(alternative => {
      return this.http.post(url + `/alternative?decisionId=${decisionId}`, alternative)
        .pipe(
          catchError(error => {
            // Handle errors if needed
            return [];
          })
        );
    });
  
    return forkJoin(requests);
  
  }

}
