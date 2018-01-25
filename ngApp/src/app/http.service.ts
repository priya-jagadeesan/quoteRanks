import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { 
  }

  getQuotes(){
     return this._http.get('/quotes');
  }

  getQuoteByID(id){
    return this._http.get('/quotes/'+id);
  }

  addQuote(newQuote){
    return this._http.post('/quotes', newQuote);
  }

  updateQuote(id,newQuote){
    return this._http.put('/quotes/'+id,newQuote);
  }

  destroyQuote(id){
    return this._http.delete('/quotes/'+id);
   }
}
