import { Component, OnInit } from '@angular/core';
import { animateFactory } from 'ng2-animate';
import { Validation } from './validation';
import { Services } from './services';
import { Pnr, Availability, Route, Fare, Running} from './ntesInterfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [animateFactory(500, 200, 'ease-in')]
})
export class AppComponent{
  wait:boolean;
  wentw:boolean;
  res2:boolean;
  pno:any='';
  tno:any='';
  sco:any='';
  qt:any;
  cls:any;
  acod:any;

  quota:any[]=[
    {'quota':'General','code':'GN'},
    {'quota':'Tatkal','code':'CK'},
    {'quota':'Premium Tatkal','code':'PT'}
  ];
  class:any[]=[
    {'class':'SL'},
    {'class':'CC'},
    {'class':'2S'},
    {'class':'3A'},
    {'class':'2A'},
    {'class':'1A'},
    {'class':'EC'}
  ];
  age_code:any[]=[
    {'for':'Child','code':'8'},
    {'for':'Adult','code':'20'},
    {'for':'Senior Man','code':'60'},
    {'for':'Senior Women','code':'61'}
  ]

  setVpnrF:boolean;
  pnrFt:boolean;
  pnrFf:boolean;
  pnrOp:any;

  setVavlF:boolean;
  avlFf:boolean;
  avlFt:boolean;
  avlOp:any;

  setVrtF:boolean;
  rtFf:boolean;
  rtFt:boolean;
  rtOp:Route;

  setVtrfF:boolean;
  trfFf:boolean;
  trfFt:boolean;
  trfOp:Fare;

  setVtrrsF:boolean;
  trsFf:boolean;
  trsFt:boolean;
  runningOp:Running;

  constructor(private vd:Validation, private stnServ:Services){console.log(stnServ.getPnrData("2129410477"));}

  setV(x:number){
    switch(x){
      case 1:this.setVpnrF=!this.setVpnrF;break;
      case 2:this.setVavlF=!this.setVavlF;break;
      case 3:this.setVrtF=!this.setVrtF;break;
      case 4:this.setVtrfF=!this.setVtrfF;break;
      case 5:this.setVtrrsF=!this.setVtrrsF;break;
    }
  }

  close(){
    this.setVrtF=this.setVavlF=this.setVpnrF=this.setVtrfF=this.setVtrrsF=false;
    this.wait=this.wentw=this.res2=false;
    this.pnrFf=this.pnrFt=false;
  }

  pnrData(pn:any){
    this.pnrOp=null;
    this.pnrFf=this.pnrFt=this.wait=this.wentw=this.res2=false;
    var p=pn.target.value;
    console.log(pn+"and"+p);
    var x=this.vd.pnrNumberValid(p);
    if(x==0){this.pnrFf=!this.pnrFf;}
    else{
      this.pnrFt=!this.pnrFt;
      this.wait=!this.wait;
      this.stnServ.getPnrData(p).then(o => this.callPnr(o));
    }
  }
  callPnr(op:any){
    this.pnrOp=op;
    try{
      if(op.length == 0){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if(this.pnrOp.response_code == "500"){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if(this.pnrOp.response_code == "200"){this.wait=!this.wait;this.res2=!this.res2;}
    }
    catch(e){this.wait=!this.wait;this.wentw=!this.wentw;}
  }

  availabilityData(tno:any,fcod:any,tcod:any,dt:any){
    this.avlOp=null;
    this.avlFf=this.avlFt=this.wait=this.wentw=this.res2=false;
    console.log(tno.value,fcod.value,tcod.value,dt.value,this.qt,this.cls);
    var x=this.vd.trainNumberValid(tno.value);
    var y=this.vd.stationCodeValid(fcod.value);
    var z=this.vd.stationCodeValid(tcod.value);
    if((x==0)||(y==0)||(z==0)){this.avlFf=!this.avlFf;}
    else{
      this.avlFt=!this.avlFt;
      this.wait=!this.wait;
      this.stnServ.getAvailabilityData(tno.value,fcod.value,tcod.value,dt.value,this.qt,this.cls).then(o => this.callAvl(o));
    }
  }
  callAvl(op:any){
    this.avlOp=op;
    console.log(this.avlOp);
    try{
      if(op.length == 0){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if((this.avlOp == null)||(this.avlOp == undefined)){this.wait=!this.wait;this.wentw=!this.wentw;}
      else { this.wait=!this.wait;this.res2=!this.res2;}
    }
    catch(e){this.wait=!this.wait;this.wentw=!this.wentw;}
  }

  routeData(tno:any){
    this.rtOp=null;
    this.rtFf=this.rtFt=this.wait=this.wentw=this.res2=false;
    var tn=tno.target.value;
    console.log(tn);
    var x=this.vd.trainNumberValid(tn);
    if(x==0){this.rtFf=!this.rtFf;}
    else{
      this.rtFt=!this.rtFt;
      this.wait=!this.wait;
      this.stnServ.getRouteData(tn).then(o => this.callRoute(o));
    }
  }
  callRoute(op:any){
    this.rtOp=op;
    console.log(this.rtOp);
    try{
      if(op.length==0){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if(op.length != 0){this.wait=!this.wait;this.res2=!this.res2;}
    }
    catch(e){this.wait=!this.wait;this.wentw=!this.wentw;}
  }

  fareData(tno:any,fc:any,tc:any){
    this.trfOp=null;
    this.trfFf=this.trfFt=this.wait=this.wentw=this.res2=false;
    console.log(tno.value,fc.value,tc.value,this.acod,this.qt);
    var x=this.vd.trainNumberValid(tno.value);
    var y=this.vd.stationCodeValid(fc.value);
    var z=this.vd.stationCodeValid(tc.value);
    if((x==0)||(y==0)||(z==0)){this.trfFf=!this.trfFf;}
    else {
      this.trfFt=!this.trfFt;
      this.wait=!this.wait;
      this.stnServ.getFare(tno.value,fc.value,tc.value,this.qt,this.acod).then(o => this.callFare(o));
    }
  }
  callFare(op:any){
    this.trfOp=op;
    console.log(this.trfOp);
    try{
      if(op.headings.length==0){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if(op.headings.length!=0){this.wait=!this.wait;this.res2=!this.res2;}
    }
    catch(e){this.wait=!this.wait;this.wentw=!this.wentw;}
  }

  runningData(tno:any,code:any,dt:any){
    this.runningOp=null;
    this.trsFf=this.trsFt=this.wait=this.wentw=this.res2=false;
    console.log(tno.value,code.value,dt.value);
    var x=this.vd.trainNumberValid(tno.value);
    var y=this.vd.stationCodeValid(code.value);
    if((x==0)||(y==0)){this.trsFf=!this.trsFf;}
    else{
      this.trsFt=!this.trsFt;
      this.wait=!this.wait;
      this.stnServ.getRunning(tno.value,code.value,dt.value).then(o => this.callRunning(o));
    }
  }
  callRunning(op:any){
    this.runningOp=op;
    console.log(this.runningOp);
    try{
      if(op.length==0){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if(op.response_code=="500"){this.wait=!this.wait;this.wentw=!this.wentw;}
      else if(op.response_code=="200"){this.wait=!this.wait;this.res2=!this.res2;
      this.runningOp['journey_station']=this.runningOp['journey_station'].split('&nbsp;').join(' ');
    }
    }
    catch(e){this.wait=!this.wait;this.wentw=!this.wentw;}
  }

  test(tes:any){
    console.log("from test function .value"+tes.value);
    var t=tes.value;
    console.log(t);
    var x=this.vd.stationCodeValid(tes.value);
    console.log("1 or 0 : "+x)
  }
}
