import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = 'http://localhost:8081/api/user/resource';
  private adminURL = 'http://localhost:8081/api/admin/resource';

  constructor(private http : HttpClient) { }


  getUserPublicContent() {
    return  this.http.request('post',this.userURL, {
      withCredentials: true,
      responseType : "text"
    })
  }

  getAdminPublicContent() {
    return  this.http.request('get',this.adminURL, {
      withCredentials: true,
      responseType : "text"
    })
  }
}
