import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private base_URL :string = environment.URL;
  constructor(private http:HttpClient) { }

  public addCustomer(data:any){
    return this.http.post(`${this.base_URL}/customer`,data)
  }

  public addCardDetails(data:any){
    return this.http.post(`${this.base_URL}/add`,data)
  }
}
