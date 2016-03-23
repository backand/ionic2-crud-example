import {Page} from 'ionic-angular';
import 'rxjs/Rx'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {BackandService} from '../../services/backandService'

@Page({
  templateUrl: 'build/pages/page2/page2.html',
  providers: [BackandService]

})
export class Page2 {

  psearchQuery:string;
  items:string[] = [];
  fromServerData:string[] = [];

  constructor(public backandService:BackandService) {
    this.searchQuery = '';
    
    this.items =  [];
    this.getItems('');
  }


  private getItems(searchbar) {
     this.backandService.useAnoymousAuth();

    
      this.backandService.getQuote().subscribe((data) => {
        console.log("here");
        this.items = data;

        // set q to the value of the searchbar
        var q = searchbar.value;

        // if the value is an empty string don't filter the items
        if (!q || q.trim() == '') {
          return;
        }

        this.items = this.items.filter((v) => {
          if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        })
    })
    
  }
}