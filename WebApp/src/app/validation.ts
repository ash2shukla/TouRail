export class Validation{
  sco:string='';
  pno:string='';
  tno:string='';

  pnrNumberValid(pnrNo:any){
    this.pno=pnrNo;
    console.log("from validation with PNR function:"+pnrNo);
    var len = this.pno.length;
    console.log(len);
    if((len<10)||(len>10)){console.log("pnr no is invalid."); return 0;}
    else if (this.pno.match(/[a-zA-Z!@#$%^&*]/)) {
    //else if (this.pno.match(/[a-zA-Z!@#$%^&*]/)) {
        console.log("pnr no is invalid."); return 0;
    }
    else {return 1;}
  }

  trainNumberValid(tnno:any){
    this.tno=tnno;
    var len = this.tno.length;
    console.log(len);
    if((len<5)||(len>5)){console.log("train number is invalid."); return 0;}
    else if (this.pno.match(/[a-zA-Z!@#$%^&*]/)) {
        console.log("train no is invalid."); return 0;
    }
    else{return 1;}
  }

  stationCodeValid(stnco:any){
    this.sco=stnco;
    var len = this.sco.length;
    if((len<2)||(len>5)){console.log("station code is invalid."); return 0;}
    else if(this.sco.match(/[`0-9~!@#$%^&*(){}_+-=<>?/.,:"';'"]/)){console.log("station code is invalid."); return 0;}
    else {return 1;}
  }
}
