import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import { Pnr, Availability, Route, Fare, Running} from './ntesInterfaces';

@Injectable()

export class Services{
  urlstn:string="http://localhost:8000/";
  urllive:string='http://localhost:8001/';

  constructor(private http_S:Http){}



  getPnrData(pno:string):Promise<Pnr>{
    return this.http_S.get(this.urllive+"getpnr/?pnr="+pno).toPromise().then(res => res.json() as Pnr);
  }

  getAvailabilityData(tno:string,fcod:string,tcod:string,dt:string,qt:string,cls:string):Promise<Availability>{
    return this.http_S.get(this.urllive+"getavailability/?train_no="+tno+"&from_code="+fcod+"&to_code="+tcod+"&date="+dt+"&quota="+qt+"&cls="+cls).toPromise().then(res => res.json() as Availability).catch(this.catchErr);
  }
  getRouteData(tno:string):Promise<Route>{
    return this.http_S.get(this.urllive+"getroute/?train_no="+tno).toPromise().then(res => res.json() as Route).catch(this.catchErr);
  }
  getFare(tno:string,fcod:string,tcod:string,qt:string,acod:string):Promise<Fare>{
    return this.http_S.get(this.urllive+"getfare/?train_no="+tno+"&from_code="+fcod+"&to_code="+tcod+"&quota="+qt+"&age_code="+acod).toPromise().then(res => res.json() as Fare).catch(this.catchErr);
  }
  getRunning(tno:string,cd:string,dt:string):Promise<Running>{
    return this.http_S.get(this.urllive+"getrunning/?train_no="+tno+"&code="+cd+"&date="+dt).toPromise().then(res => res.json() as Running).catch(this.catchErr);
  }

  catchErr(){
    console.log("Request Faild.");
  }
}
