import { Injectable } from '@angular/core';
import {stns } from './stations';
import { stnTuple,Live,stationbase,commoditybase,nearbybase,trnpf } from './interfaces';
import {Http } from '@angular/http';
import "rxjs/add/operator/toPromise";
@Injectable()
export class StationService {

  constructor(private http:Http) { }
  curr_stn:string;
  curr_pf:string;
  //url_base = "https://tourail.herokuapp.com";
  //url_base = "http://localhost:8000";
  url_base="http://localhost:8000";
  //url_live = "https://livestn.herokuapp.com"
  //url_live = "http://localhost:8001";
  url_live="http://localhost:8001";

getCity(lat:string,lng:string):Promise<any>
{
  return this.http.get(this.url_live+'/getcity/?lat='+lat+"&lng="+lng).toPromise().then(res=>res.json()).catch(this.handleError);
}
  getmatching(part:string):Promise<stnTuple[]>
{var res=new Array<stnTuple>();
    if( part.length <=1){
      return Promise.resolve([]);
    }
    else{
        res=[];
        for(let y of stns)
        {
          if(y.code==part.toUpperCase())
          {
          res.push(y);
        }
      }
        for(let x of stns){
          if((x.code.search(new RegExp("^"+part,"i"))>=0 || x.name.search(new RegExp("^"+part,"i"))>=0 ) && res.length<5)
          {if(part!=x.code)
            res.push(x);
          }
        }
      return Promise.resolve(res);
    }

}
  curr_stnfeed(val:string,name:string)
  {console.log(val);
    this.curr_stn=val;
  }

  getStationBase():Promise<stationbase[]>
  {
      return this.http.get(this.url_base+"/stationbase/?code="+this.curr_stn).toPromise().then(res => res.json() as stationbase[]).catch(this.handleError);
  }
  getNearby(comm:string):Promise<nearbybase[]>
  {
      return this.http.get(this.url_base+"/nearbybase/?code="+this.curr_stn+"&name="+comm).toPromise().then(res => res.json() as nearbybase).catch(this.handleError);
  }

  getCommodityBase(pf:string,name:string):Promise<commoditybase[]>
  {
    return this.http.get(this.url_base+"/commoditybase/?code="+this.curr_stn+"&name="+name+"&pf="+pf).toPromise().then(res=>res.json() as commoditybase[]).catch(this.handleError);
  }
  getLive():Promise<Live[]>
  {
    return this.http.get(this.url_live+"/getlive/?code="+this.curr_stn).toPromise().then(res=>res.json() as Live[]).catch(this.handleError);
  }
  gettrnpf(pf:any):Promise<trnpf>
{
  return this.http.get(this.url_base+"/trnpf/?code="+this.curr_stn+"&pf="+pf).toPromise().then(res=>res.json() as trnpf).catch(this.handleError);
}

  handleError()
  {
  console.log("Something went wrong");
  }
}
