/**
 * Created by backand on 3/23/16.
 */

import 'rxjs/Rx'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {Injectable} from 'angular2/core';

@Injectable()
export class BackandService {

    constructor(public http:Http) {

    }
    quoteOfTheDay:string[] = [];
    api_url:string = "https://api.backand.com";
    
    app_name:string = "angular2";
    auth_status:string = "";
    is_auth_error:boolean = false;
    auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};

    get tokenUrl() {
        return this.api_url + "/token";
    }

    public getAuthTokenSimple(username, password) {
        
        let creds = `username=${username}` +
            `&password=${password}` +
            `&appName=${this.app_name}` +
            `&grant_type=password`;
        console.log(creds);
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        
        var $obs = this.http.post(this.tokenUrl, creds, {
                headers: header
            })
            .map(res => this.getToken(res));


          $obs.subscribe(
                data => {
                    this.setTokenHeader(data)
                },
                err => {
                    
                },
                () => console.log('Finish Auth'));

          return $obs;
           
    }

    private extractErrorMessage(err) {
        return JSON.parse(err._body).error_description;
    }

    public useAnoymousAuth() {
       
        this.setAnonymousHeader();
    }

    private setTokenHeader(jwt) {
        if (jwt) {
            this.auth_token.header_name = "Authorization";
            this.auth_token.header_value = "Bearer " + jwt;
            //localStorage.setItem('jwt', jwt);
        }
    }

    public setAnonymousHeader() {
        this.auth_status = "OK";
        this.auth_token.header_name = "AnonymousToken";
        this.auth_token.header_value = "08fd510a-4b52-43fa-938f-f2c841bd3106";
    }

    private getToken(res) {
        console.log(res);
        return res.json().access_token;
    }

    private get authHeader() {
        var authHeader = new Headers();
        authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
        return authHeader;
    }

    public postItem(name) {
        let data = JSON.stringify({description: name});

        return this.http.post(this.api_url + '/1/objects/todo?returnObject=true', data,
            {
                headers: this.authHeader
            })
            .retry(3)
            .map(res => {
                console.log(res.json());
                return res.json();
            });


           
    }

    public getQuote() {

        return this.http.get(this.api_url + '/1/objects/todo?returnObject=true', {
                headers: this.authHeader
            })
            .retry(3)
            .map(res => res.json().data.map(r =>
                r.description
            ))

    }

    logError(err) {
        console.error('Error: ' + err);
    }
}


