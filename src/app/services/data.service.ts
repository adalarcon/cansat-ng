import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment }  from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(
    private http:HttpClient,
  ){ }

  find(collection: String){
    return this.http.get<any>(environment.serverBaseURL + environment.api + collection+ "/");
  }

  findByParams(collection: String, params: String){
    return this.http.get<any>(environment.serverBaseURL + environment.api + collection + "?"+ params);
  }

  findBy(collection: String, query: String){
    return this.http.get<any>(environment.serverBaseURL + environment.api + collection + "/" + query);
  }

  findById(collection: String, id: String){
    return this.http.get<any>(environment.serverBaseURL + environment.api + collection + "/" + id);
  }

  insertOne(collection, obj){
    return this.http.post(environment.serverBaseURL + environment.api + collection + "/", obj);
  }

  updateOne(collection, obj){
    return this.http.put(environment.serverBaseURL + environment.api + collection + "/",  obj);
  }

  deleteOne(collection, id){
    return this.http.delete(environment.serverBaseURL + environment.api + collection + "/" + id);
  }
}
