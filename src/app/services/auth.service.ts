import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private _user: User;
    private _token: string;
    //URL enpoint

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    public get user():User{
        if(this._user!=null){
            return this._user;
        }else if(this._user==null && sessionStorage.getItem('user')!=null){
            this._user=JSON.parse(sessionStorage.getItem('user')) as User;
            return this._user;
        }
        return new User();
    }

    public get token():string{
        if(this._token!=null){
            return this._token;
        }else if(this._token==null && sessionStorage.getItem('token')!=null){
            this._token=sessionStorage.getItem('token');
            return this._token;
        }
        return null;
    }

    login(user: User): Observable<any> {
        const credentials = btoa('angularapp' + ':' + '12345');
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-from-urlencoded',
            'Authorization': 'Basic ' + credentials
        });
        let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('taxId', user.taxId);
        params.set('password', user.password);
        console.log(params.toString());
        //return this.http.post('url', params.toString(), { headers: httpHeaders })
        user.email = 'jacobog_g@outlook.es';
        user.idUser = 1000;
        user.patSurame = 'Gudiño';
        user.matSurame = 'Gonzalez';
        user.type = 1;
        user.tel = '5530146948';
        user.name = 'Jacobo';
        return of(user);
    }

    saveUser(accessToken: string): void {
        let payload = this.getToken(accessToken)
        this._user = new User();
        //payload.email...
        this._user.email = 'jacobog_g@outlook.es';
        this._user.idUser = 1000;
        this._user.patSurame = 'Gudiño';
        this._user.matSurame = 'Gonzalez';
        this._user.type = 1;
        this._user.tel = '5530146948';
        this._user.name = 'Jacobo';
        //this._user.roles = payload.authorities;
        sessionStorage.setItem('user', JSON.stringify(this._user));
    }

    saveToken(accessToken: string): void {
        this._token = accessToken;
        sessionStorage.setItem('token', accessToken);
    }

    getToken(accessToken: string): any {
        if (accessToken != null) {
            return JSON.parse(atob(accessToken.split(".")[1]));
        }
        return null;
    }
}
