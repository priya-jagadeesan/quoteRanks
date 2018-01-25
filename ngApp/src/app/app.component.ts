// import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  quotes : any;
  // quote : any;
  newQuote : any;
  editQuote : any;
  // cancel : boolean = false;
  // ID : any;
  create = "create_on";
  errors ="";
  validQuote = false;
  // value = "";

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.newQuote = { content : "", author: "", rating : 0};
    this.getQuotesFromService();    
  }

  // component receives the data
  getQuotesFromService(){
    let observable = this._httpService.getQuotes();
    observable.subscribe(data => {  
      this.quotes = data['data'];
    });
  }
  
  onCreate() {
      this.errors="";
      let observable = this._httpService.addQuote(this.newQuote);
      observable.subscribe(data => { 
      if (data['message']){
        if (data['message'] == 'error'){
          if (data['data'].author){
            console.log("author",data['data'].author.message)
            this.errors += data['data'].author.message + " ";
          }
          if (data['data'].content){
            console.log("author",data['data'].content.message)
            this.errors += data['data'].content.message;
          }
        }
        else {
          this.getQuotesFromService();
          this.validQuote = false;
          this.newQuote = { content : "", author: "", rating : 0};
          this.errors="";
        }
      }
    });
  }


  vote(ID,value){
    let obs = this._httpService.getQuoteByID(ID);
    obs.subscribe(data => {
      this.editQuote = data['data'];
      if (value == 'up'){
        this.editQuote['rating'] += 1
      }
      else if (value=='down'){
        if (this.editQuote['rating'] > 0 ){
          this.editQuote['rating'] -= 1;
        }
      }
      let observable = this._httpService.updateQuote(ID,this.editQuote);
      observable.subscribe(successCode => { 
        this.getQuotesFromService();
      });
    });
  }

  onDelete(ID) {
    let observable = this._httpService.destroyQuote(ID);
    observable.subscribe(successCode => {
      this.getQuotesFromService();	
    });
  }
}