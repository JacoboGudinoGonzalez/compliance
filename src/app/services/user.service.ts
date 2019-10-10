import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private urlEndPoint:string = 'http://localhost:8080/api/users'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private isNotAllowed(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  login(user: User): Observable<any> {
    const credentials = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-from-urlencoded',
      'Authorization': 'Basic ' + credentials
    });
    let params  = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('taxId', user.taxId);
    params.set('password', user.password );
    console.log(params.toString());
    return this.http.post('url', params.toString(), { headers: httpHeaders })
  }

  getUsers(): Observable<User[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as User[])
    );
  }
}
