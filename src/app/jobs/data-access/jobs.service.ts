import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http:HttpClient
  ) { }

  getJobs(){
    return this.http.get<any>('http://localhost:3000/jobs')
  }

  deleteJob(id:string) {
    return this.http.delete<any>('http://localhost:3000/jobs/'+id)
  }
}
