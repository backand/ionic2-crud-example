var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
require('rxjs/Rx');
var backandService_1 = require('../../services/backandService');
var Page1 = (function () {
    function Page1(backandService) {
        this.backandService = backandService;
        this.name = 'World';
        this.quoteOfTheDay = [];
        this.username = 'test@angular2.com';
        this.password = 'angular2';
        this.auth_type = "N/A";
        this.is_auth_error = "";
    }
    Page1.prototype.getAuthTokenSimple = function () {
        var _this = this;
        this.auth_type = 'Token';
        var $obs = this.backandService.getAuthTokenSimple(this.username, this.password);
        $obs.subscribe(function (data) {
            _this.auth_status = 'OK';
            _this.is_auth_error = false;
        }, function (err) {
            var errorMessage = _this.extractErrorMessage(err);
            _this.auth_status = "Error: " + errorMessage;
            _this.is_auth_error = true;
            _this.logError(err);
        }, function () { return console.log('Finish Auth'); });
    };
    Page1.prototype.useAnoymousAuth = function () {
        this.backandService.useAnoymousAuth();
        this.is_auth_error = false;
        this.auth_type = 'Anonymous';
    };
    Page1.prototype.postItem = function () {
        var _this = this;
        this.backandService.postItem(this.name).subscribe(function (data) {
            // add to begin of array
            _this.quoteOfTheDay.unshift(data.description);
            console.log(_this.quoteOfTheDay);
        }, function (err) { return _this.logError(err); }, function () { return console.log('OK'); });
        ;
    };
    Page1.prototype.getQuote = function () {
        var _this = this;
        this.backandService.getQuote()
            .subscribe(function (data) {
            console.log("subscribe", data);
            _this.quoteOfTheDay = data;
        }, function (err) { return _this.logError(err); }, function () { return console.log('OK'); });
    };
    Page1.prototype.logError = function (err) {
        console.error('Error: ' + err);
    };
    Page1 = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/page1/page1.html',
            providers: [backandService_1.BackandService]
        }), 
        __metadata('design:paramtypes', [backandService_1.BackandService])
    ], Page1);
    return Page1;
})();
exports.Page1 = Page1;
//bootstrap(HelloApp, [HTTP_BINDINGS]); 
