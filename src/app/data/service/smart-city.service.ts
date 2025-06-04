import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartCityService {
  apiUrl = 'https://smart-city-server-39536acd884b.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  getDashboardOverview(): Observable<any>{
    return this.http.get(`${this.apiUrl}/dashboard/overview`)
  }

  sendSensor(payload: any){
    console.log(payload);
    return this.http.post(`${this.apiUrl}/sensors`, payload)
  }
}
