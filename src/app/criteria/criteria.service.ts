import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriteriaDto } from '../entities/criteria.dto';
import { url } from 'environment/environment.dev';
import { Observable, catchError, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {

  constructor(private http:HttpClient) { }

  createCriterias(criterias:CriteriaDto[],decisionId:number):Observable<any[]>{
    const requests: Observable<any>[] = criterias.map(criteria => {
      return this.http.post(url + `/criteria?decisionId=${decisionId}`, criteria)
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
