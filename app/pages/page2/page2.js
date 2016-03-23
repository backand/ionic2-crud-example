var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
require('rxjs/Rx');
var backandService_1 = require('../../services/backandService');
var Page2 = (function () {
    function Page2(backandService) {
        this.backandService = backandService;
        this.items = [];
        this.fromServerData = [];
        this.searchQuery = '';
        this.items = [];
        this.getItems('');
    }
    Page2.prototype.getItems = function (searchbar) {
        var _this = this;
        this.backandService.useAnoymousAuth();
        this.backandService.getQuote().subscribe(function (data) {
            console.log("here");
            _this.items = data;
            // set q to the value of the searchbar
            var q = searchbar.value;
            // if the value is an empty string don't filter the items
            if (!q || q.trim() == '') {
                return;
            }
            _this.items = _this.items.filter(function (v) {
                if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            });
        });
    };
    Page2 = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/page2/page2.html',
            providers: [backandService_1.BackandService]
        }), 
        __metadata('design:paramtypes', [backandService_1.BackandService])
    ], Page2);
    return Page2;
})();
exports.Page2 = Page2;
