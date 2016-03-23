import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import 'rxjs/Rx'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {BackandService} from '../../services/backandService'

@Page({
    templateUrl: 'build/pages/page1/page1.html',
    providers: [BackandService]
})
export class Page1 {
    name:string = 'World';
    quoteOfTheDay:string[] = [];
    username:string = 'test@angular2.com';
    password:string = 'angular2';
    auth_type:string = "N/A";
    is_auth_error:string = "";

    constructor(public backandService:BackandService) {   
    }


    public getAuthTokenSimple() {
        this.auth_type = 'Token';
        var $obs = this.backandService.getAuthTokenSimple(this.username, this.password);
        $obs.subscribe(
                data => {
                    this.auth_status = 'OK';
                    this.is_auth_error = false;
                    
                },
                err => {
                    var errorMessage = this.extractErrorMessage(err);

                    this.auth_status = `Error: ${errorMessage}`;
                    this.is_auth_error = true;
                    this.logError(err)
                },
                () => console.log('Finish Auth'));
    }

    private useAnoymousAuth() {
        this.backandService.useAnoymousAuth();
        this.is_auth_error = false;
        this.auth_type = 'Anonymous';
    }

    public postItem() {
        this.backandService.postItem(this.name).subscribe(
                data => {
                    // add to begin of array
                    this.quoteOfTheDay.unshift(data.description);
                    console.log(this.quoteOfTheDay);
                },
                err => this.logError(err),
                () => console.log('OK')
            );;
    }

    public getQuote() {
       this.backandService.getQuote()
            .subscribe(
                data => {
                    console.log("subscribe", data);
                    this.quoteOfTheDay = data;
                },
                err => this.logError(err),
                () => console.log('OK')
            );
    }

    logError(err) {
        console.error('Error: ' + err);
    }
}

//bootstrap(HelloApp, [HTTP_BINDINGS]);