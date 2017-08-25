import { Component, OnInit } from '@angular/core';
import {StationService} from '../station.service';
import {stnTuple,stationbase,latlng,commoditybase,nearbybase,Live} from '../interfaces';
import { animateFactory } from 'ng2-animate';
import {MdSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {ViewChild} from '@angular/core';
import {ElementRef} from '@angular/core';
import { MdSidenav } from '@angular/material';
import {AppComponent} from '../app.component';
declare var google:any;

@Component({
  selector: 'app-virtualtour',
  templateUrl: './virtualtour.component.html',
  styleUrls: ['./virtualtour.component.css'],
  animations: [animateFactory(200, 100, 'ease-in')]
})
export class VirtualtourComponent implements OnInit {
@ViewChild('resultbar') sidenav: MdSidenav;

  constructor(private stnserv:StationService,public snackBar:MdSnackBar,private app:AppComponent ) {
     }
  Live:Live[];
  homecontent:boolean=true;
  rescomm:any;
  res:stnTuple[];
  curr_pf:number;
  commodityReply=new Array<commoditybase>();
  tour_avail:boolean;
  entry_keys:string[];
  entry_values:latlng[];
  exit_keys:string[];
  exit_values:latlng[];
  commodity_keys:string[];
  nearby_keys:string[];
  pf_number:number;
  is_stair:boolean;
  is_escl:boolean;
  is_slope:boolean;
  is_under:boolean;
  ticket_counter_keys:string[];
  ticket_counter_values:latlng[];
  reservation_charts:latlng[];
  is_waiting:boolean;
  waiting_room_keys:string[];
  waiting_room_values:latlng[];
  cloak_room:latlng[];
  rpf_office:latlng[];
  grp_office:latlng[];
  enquiry_office:latlng[];
  railway_engg:latlng[];
  station_master:latlng[];
  tte_office:latlng[];
  pf_stair_entries:latlng[][];
  pf_under_entries:latlng[][];
  pf_slope_entries:latlng[][];
  pf_escl_entries:latlng[][];
  nearby = new Array<nearbybase>();
  curr_coord:latlng;
  is_divyang:boolean;
  divyang_keys:string[];
  divyang_values:latlng[];
  is_other:boolean;
  other_keys:string[];
  other_values:latlng[];
  curr_pos:latlng;
  has_protected:boolean;
  commodities=new Array<Array<string>>();
  is_railwired:boolean;
  trainspf=new Array<Array<string>>();

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{this.curr_pos=new latlng(pos.coords.latitude,pos.coords.longitude);});
      }
  }
  navcity()
  {
    navigator.geolocation.getCurrentPosition((pos)=>{this.stnserv.getCity(String(pos.coords.latitude),String(pos.coords.longitude)).then(res=>
    {
      document.getElementById('ip').setAttribute("value",res['city']);
    })
    });
  }

  stnsearch(val:string)
  { if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition((pos)=>{this.curr_pos=new latlng(pos.coords.latitude,pos.coords.longitude);});
    this.stnserv.getmatching(val).then(res=>{
      this.res=res;
    });
  }
  checkbase(){
    this.stnserv.getStationBase().then(res=>{
      if(res.length==0)
        this.tour_avail=false;
      else
        this.setStation(res);
    });

  }
  plotme(val:string)
  {
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: this.curr_coord
        });
  for(let i of this.nearby)
  {
    if(i['n_type']==val)
    {
      this.setmarkers(this.returnCoord(i.latlng)[0],i.name,map);

    }
  }
  }
  setmarkers(ll:latlng,name:string,map:any)
  {
        var marker = new google.maps.Marker({
          position: ll,
          map: map,
          title: name
        });
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsService.route({
         origin: this.curr_coord,
         destination: ll,
         travelMode: 'WALKING'
       }, function(response, status) {
         if (status === 'OK') {
           directionsDisplay.setDirections(response);
         } else {
           window.alert('Directions request failed due to ' + status);
         }
       });

  }
  setmarkersstn(map:any,dstn:latlng)
  {
        var marker = new google.maps.Marker({
          position: this.curr_coord,
          map: map,
          title: name
        });
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsService.route({
         origin: this.curr_pos,
         destination: dstn,
         travelMode: 'WALKING'
       }, function(response, status) {
         if (status === 'OK') {
           directionsDisplay.setDirections(response);
         } else {
           window.alert('Directions request failed due to ' + status);
         }
       });
  }

  showdirection(map:any){

  }
  setStation(stationbase:stationbase[]){
    this.entry_keys=stationbase[0]['entry_keys'].split(',');
    this.entry_values=this.returnCoord(stationbase[0]['entry_values']);
    this.exit_keys=stationbase[0]['exit_keys'].split(',');
    this.exit_values=this.returnCoord(stationbase[0]['exit_values']);
    this.commodity_keys=stationbase[0]['commodity_keys'].split(',');
    this.nearby_keys=stationbase[0]['nearby_keys'].split(',');
    this.pf_number=+stationbase[0]['pf_number'];
    this.is_stair=stationbase[0]['pf_stair_entries'].length==0?false:true;
    this.is_escl=stationbase[0]['pf_escl_entries'].length==0?false:true;
    this.is_slope=stationbase[0]['pf_escl_entries'].length==0?false:true;
    this.is_under=stationbase[0]['pf_under_entries'].length==0?false:true;
    this.ticket_counter_keys=stationbase[0]['ticket_counter_keys'].split(',');
    this.ticket_counter_values=this.returnCoord(stationbase[0]['ticket_counter_values']);
    this.reservation_charts=this.returnCoord(stationbase[0]['reservation_charts']);
    this.is_waiting=stationbase[0]['waiting_room_keys'].length==0?false:true;
    this.waiting_room_keys=stationbase[0]['waiting_room_keys'].split(',');
    this.waiting_room_values=this.returnCoord(stationbase[0]['waiting_room_values']);
    this.cloak_room=this.returnCoord(stationbase[0]['cloak_room']);
    this.rpf_office=this.returnCoord(stationbase[0]['rpf_office']);
    this.grp_office=this.returnCoord(stationbase[0]['grp_office']);
    this.enquiry_office=this.returnCoord(stationbase[0]['enquiry_office']);
    this.railway_engg=this.returnCoord(stationbase[0]['railway_engg']);
    this.station_master=this.returnCoord(stationbase[0]['station_master']);
    this.tte_office=this.returnCoord(stationbase[0]['tte_office']);
    this.pf_stair_entries=this.returnPf(stationbase[0]['pf_stair_entries']);
    this.pf_under_entries=this.returnPf(stationbase[0]['pf_under_entries']);
    this.pf_slope_entries=this.returnPf(stationbase[0]['pf_slope_entries']);
    this.pf_escl_entries=this.returnPf(stationbase[0]['pf_escl_entries']);
    this.is_divyang=stationbase[0]['divyang_keys'].length==0?false:true;
    this.divyang_keys=stationbase[0]['divyang_keys'].split(',');
    this.divyang_values=this.returnCoord(stationbase[0]['divyang_values']);
    this.is_other=stationbase[0]['other_keys'].length==0?false:true;
    this.other_keys=stationbase[0]['other_keys'].split(',');
    this.other_values=this.returnCoord(stationbase[0]['other_values']);
    this.has_protected=stationbase[0]['has_protected']=="1"?true:false;
    this.is_railwired=stationbase[0]['is_railwired']=="1"?true:false;
    this.getNearby();
    this.setcommodities();
    this.settrnpf();
    console.log(this.divyang_values);
    console.log(this.divyang_keys);
    this.startTour(this.entry_values[0]);

  }
  getNearby()
  {for(let i of this.nearby_keys){
    this.stnserv.getNearby(i).then(res=>{
      for(let i of res)
      this.nearby.push(i)});
  }
  console.log(this.nearby);
  }

  settrnpf()
  {
    for(var i=0;i<this.pf_number;i++)
    {
      this.stnserv.gettrnpf(String(i+1)).then(res=>this.trainspf.push(res[0]['trains'].split(',')));
    }
    console.log(this.trainspf);
  }

  setcommodities()
  {this.commodities= new Array<Array<string>>();
    this.commodities.push(this.commodity_keys);
    this.commodities.push(this.nearby_keys);
    var new_arr=new Array<string>();
    if(this.is_stair)
    for(var i=0;i<+this.pf_number;i++)
      new_arr.push("Platform "+String(i+1)+" Stair");
    if(this.is_escl)
    for(var i=0;i<+this.pf_number;i++)
      new_arr.push("Platform "+String(i+1)+" Escalators");
    if(this.is_slope)
    for(var i=0;i<+this.pf_number;i++)
    new_arr.push("Platform "+String(i+1)+" Slope");
    if(this.is_under)
    for(var i=0;i<+this.pf_number;i++)
    new_arr.push("Platform "+String(i+1)+" Underpass");
    for (let i of this.entry_keys)
    new_arr.push("Entry " +i);
    for(let i of this.exit_keys)
    new_arr.push("Exit "+i);
    for(let i of this.ticket_counter_keys)
      new_arr.push("Ticket Counter "+i);
    for(let i of this.waiting_room_keys)
      new_arr.push(i);
    new_arr.push("Cloak Room");
    new_arr.push('Station Master');
    new_arr.push('GRP office');
    new_arr.push('Railway Police Force');
    new_arr.push('TTE ( Train Ticket Examiner )')
    new_arr.push('Railway Engineer');
    if(this.is_divyang)
    for(let i of this.divyang_keys)
      new_arr.push(i);
    if(this.is_other)
    for(let i of this.other_keys)
    new_arr.push(i);
    new_arr.push("Enquiry Office");
    this.commodities.push(new_arr);
    console.log(this.commodities);
  }

  returnCoord(str:string):latlng[]
  { if(str=="")
      return [];
    else if( str==undefined)
      return [];
    var retval=new Array<latlng>();
    for(let i of str.split('^')){
      if(i!="")
      retval.push(new latlng(+i.split(',')[0],+i.split(',')[1]));
    }
    return retval;
  }

  returnPf(pf:string):latlng[][]
  {
    if(pf=="")
    return [];
    else if(pf==undefined)
    return [];

    var retval=new Array<Array<latlng>>();
    for(let i of pf.split('@')){
      var temparr= new Array<latlng>();
      for (let j of i.split('^')){
        temparr.push(new latlng(+j.split(',')[0],+j.split(',')[1]));
      }
      retval.push(temparr);
    }
    return retval;
  }
  startTour(ll:latlng)
  {
      var lat = ll['lat'];
      var lng= ll['lng'];
      var latlon = {lat: lat, lng:lng};
      var map = new google.maps.Map(document.getElementById('map'), {
        center: latlon,
        zoom: 14
      });

      var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), {
            position: latlon,
            pov: {
              heading: 34,
              pitch: 10
            },
          motionTracking: true,
          motionTrackingControl: true
          });
          panorama.addListener('position_changed', ()=>{
            var currentpos= new latlng(Math.round(panorama.getPosition().lat()*10000000),Math.round(panorama.getPosition().lng()*10000000));
            var currentpos_hav = new latlng(panorama.getPosition().lat(),panorama.getPosition().lng());
            this.isWhereKeyed(currentpos,this.entry_values,this.entry_keys,"Entry");
            this.isWhereKeyed(currentpos,this.ticket_counter_values,this.ticket_counter_keys,"Ticket");
            this.isWhereKeyed(currentpos,this.exit_values,this.exit_keys,"Exit");
            this.isWhereKeyed(currentpos,this.divyang_values,this.divyang_keys,"");
            this.isWhereKeyed(currentpos,this.waiting_room_values,this.waiting_room_keys,"");
            this.isWhereKeyed(currentpos,this.other_values,this.other_keys,"");
            this.isWhereValued(currentpos,this.cloak_room,"Cloak Room");
            this.isWhereValued(currentpos,this.grp_office,"GRP Office");
            this.isWhereValued(currentpos,this.station_master,"Station Master");
            this.isWhereValued(currentpos,this.rpf_office,"RPF Office");
            this.isWhereValued(currentpos,this.railway_engg,"Railway Engineering Office");
            this.isWhereValued(currentpos,this.tte_office,"TTE Office");
            this.isWhereValued(currentpos,this.enquiry_office,"Enquiry Office");
            this.isWherePlatform(currentpos,this.pf_stair_entries,"Stair");
            this.isWherePlatform(currentpos,this.pf_slope_entries,"Slope");
            this.isWherePlatform(currentpos,this.pf_escl_entries,"Escalator");
            this.isWherePlatform(currentpos,this.pf_under_entries,"UnderGround");
            this.curr_coord=currentpos_hav;
            this.setmarkersstn(map,this.curr_coord);
          });
      map.setStreetView(panorama);
  }

  isWhereKeyed(current:latlng,param_val:latlng[],param_key:string[],param:string):void
  {try{console.log(param);
    for (let i of param_val){
      if(this.iscoordequal(current,i))
      {
        this.openSnackBar("You are at "+param_key[param_val.indexOf(i)]+" "+param, '', 2000);
      }
    }}
  catch(e){}
  }

  isWhereValued(current:latlng,param_val:latlng[],param_name:string)
  {try{console.log(param_name);
    for(let i of param_val)
    {
      if(this.iscoordequal(current,i))
      {if(param_name==("TTE Office" || "Railway Engineering Office" || "Station Master"))
        this.openSnackBar('You are at '+"TTE - Railway Engg and Station Master Office" , '', 2000);
      else
      this.openSnackBar('You are at '+param_name , '', 2000);
      }
    }
  }
  catch(e){}
  }

  isWherePlatform(current:latlng,pf_arr:latlng[][],type:string){
    try{console.log(type);
    for(let i of pf_arr)
    {
      for(let j of i )
      {
        if(this.iscoordequal(current,j))
        {console.log(pf_arr.indexOf(i)+1);
          if((pf_arr.indexOf(i)+1)==2 || pf_arr.indexOf(i)+1==1)
          {  this.openSnackBar('You are at '+ "1-2"+" Of Type " + type, 'Upcoming Trains', 5000);
          this.curr_pf=pf_arr.indexOf(i)+1;}

        else if((pf_arr.indexOf(i)+1)==6 || pf_arr.indexOf(i)+1==5)
          {  this.openSnackBar('You are at '+ "5-6"+" Of Type " + type, 'Upcoming Trains', 5000);
          this.curr_pf=pf_arr.indexOf(i)+1;}
        else
            {  this.openSnackBar('You are at '+String(pf_arr.indexOf(i)+1) +" Of Type " + type, 'Upcoming Trains', 5000);
            this.curr_pf=pf_arr.indexOf(i)+1;}
        }
      }
    }
  }
  catch(e){}
  }

  iscoordequal(first:latlng,second:latlng):boolean
  {
    var retval=false;
  if(Math.abs(first['lat']-Math.round(second['lat']*10000000))<600) //Dithering of 600 for approximation
  {
    if(Math.abs(first['lng']-Math.round(second['lng']*10000000))<700) //Dithering of 600 for approximation
      retval=true;
  }
  return retval;
  }

  openSnackBar(message: string, action: string,timeout:number) {
    this.snackBar.open(message, action, {
      duration: timeout,

    }
    );
    if(action == "Upcoming Trains"){
        console.log(this.showLivePlat());
    }
  }
showLivePlat()
{try{
  var arr=new Array<any>();
  this.stnserv.getLive().then((res)=>
  {
    for(let tup of res){
        if(this.trainspf[this.curr_pf-1].indexOf(tup.train_no)>0)
        {
            arr.push(tup);
        }
      }
    }
  );
  return arr;
}
catch(e){}
}


  showSidenav(val:any,type:string)
  { try{
    if(type=="Entry")
      this.startTour(this.entry_values[this.entry_keys.indexOf(val)]);
    else if (type =="Exit")
      this.startTour(this.exit_values[this.exit_keys.indexOf(val)]);
    else if (type =="Enquiry")
      this.startTour(this.enquiry_office[0]);
    else if (type =="Ticket")
      this.startTour(this.ticket_counter_values[this.ticket_counter_keys.indexOf(val)]);
    else if (type =="Station Master")
      this.startTour(this.station_master[0]);
    else if (type == "Railway Police Force")
      this.startTour(this.rpf_office[0]);
   else if (type == "TTE ( Train Ticket Examiner )")
    this.startTour(this.tte_office[0]);
    else if (type == "Railway Engineer")
      this.startTour(this.railway_engg[0]);
      else if (type == "GRP Office")
        this.startTour(this.grp_office[0]);
    else if (type == "stair")
      this.startTour(val);
    else if (type == "under")
      this.startTour(val);
    else if (type == "escl")
      this.startTour(val);
    else if (type == "slope")
      this.startTour(val);
    else if (type == "waiting")
      this.startTour(this.waiting_room_values[this.waiting_room_keys.indexOf(val)]);
    else if (type == "cloak")
      this.startTour(this.cloak_room[0]);
    else if (type == "divyang")
      this.startTour(this.divyang_values[this.divyang_keys.indexOf(val)]);
    else if (type == "other")
      this.startTour(this.other_values[this.other_keys.indexOf(val)]);
    }
    catch(e)
    {
      console.log("We regret that this basic facility is not available at this station");
    }
  }
  wipeBase()
  {
    this.stnserv.curr_stn=undefined;
    this.commodities=undefined;
    this.trainspf=undefined;

  }
searchcommodity(val:string)
{
  this.rescomm=[];
  if(val.length!=0){
  for(let i of this.commodities[0])
  {
    if(i.search(new RegExp("^"+val,"i"))>=0 && this.rescomm.length<5)
    {
      this.rescomm.push(i);
    }
  }
  if(this.rescomm.length<5){
    for(let i of this.commodities[2])
    {
      if(i.search(new RegExp("^"+val,"i"))>=0 && this.rescomm.length <5)
      {
        this.rescomm.push(i);
      }
    }
    for(let i of this.commodities[1])
    {
      if(i.search(new RegExp("^"+val,"i"))>=0 && this.rescomm.length <5)
      {
        this.rescomm.push(i);
      }
    }
  }
}
else
this.rescomm=null;
console.log(this.commodities);
}
dropdowncommodity(val:string)
{if(this.commodity_keys.indexOf(val)>=0)
  {
    this.commoditySearch(val);
    console.log(this.commodityReply);
  }
  var check_base=val.split(' ')[0];
  if(check_base=='Platform')
  {
    var pf_no=+val.split(' ')[1];
    var type=val.split(' ')[2];
    if(type=="Stair")
    this.startTour(this.pf_stair_entries[pf_no-1][0]);
    else if(type=="Escalators")
    this.startTour(this.pf_escl_entries[pf_no-1][0]);
    else if(type=="Underpass")
    this.startTour(this.pf_under_entries[pf_no-1][0]);
    else if(type=="Slope")
    this.startTour(this.pf_under_entries[pf_no-1][0]);
  }
  else if(check_base=="Exit")
  this.showSidenav(val.split(' ')[1],'Exit');
  else if(check_base=="Entry")
  this.showSidenav(val.split(' ')[1],'Entry');
  else if(check_base=="Ticket")
  this.showSidenav(val.split(' ')[2],'Ticket');
  else if(check_base=="Station")
  this.showSidenav(val,'');
  else if(check_base=="Railway" && val.split(' ')[1]=="Police")
  this.showSidenav('',val);
  else if(check_base=="TTE")
  this.showSidenav('',val);
  else if(check_base=="Railway" && val.split(' ')[1]=="Engineer")
  this.showSidenav('',val);
  else if(this.divyang_keys.indexOf(val)>=0)
  this.showSidenav(val,'divyang');
  else if (this.other_keys.indexOf(val)>=0)
  this.showSidenav(val,'other');
  else if(this.waiting_room_keys.indexOf(val)>=0)
  this.showSidenav(val,'waiting');
  else if (check_base=="Cloak")
  this.showSidenav("","cloak");
  else if (check_base=="Enquiry")
  this.showSidenav("","Enquiry");
  this.rescomm=null;
}
commoditySearch(comm:string)
{this.commodityReply=new Array<commoditybase>();
  console.log(comm);
  if(this.curr_pf==undefined)
  {
    this.stnserv.getCommodityBase("X",comm).then(res=>
      {console.log("Here",res);
        this.sortFeedByCoord(res,comm);//type given to nest
      }
    );
  }
  this.stnserv.getCommodityBase(String(this.curr_pf),comm).then(res=>
    {console.log(res);
      this.sortFeedByCoord(res,comm);//type given to nest
    }
  );
this.sidenav.open();
  console.log(this.commodityReply.filter(function(elem, pos) {return this.commodityReply.indexOf(elem) == pos;}));
  //Now Feed the values sorted by distance as distance from curr_pos to curr_pf_stair to commodity_stair to commodity_latlng
}
sortFeedByCoord(comms:commoditybase[],type:string)
{//returns commodities on same platform sorted by their distance from current panorama
  for ( let i of comms.sort((a, b) => this.Haversine(this.curr_coord,this.returnCoord(a['latlng'])[0]) - this.Haversine(this.curr_coord,this.returnCoord(b['latlng'])[0])))
  {
    this.commodityReply.push(i);
  }
  if(this.commodityReply.length<=5)
  {
    this.stnserv.getCommodityBase("X",type).then(res=>this.sortFeedByGetDistance(this.refineRes(res)));
  }
  //var comm = comms[0];
  //console.log(this.Haversine(this.curr_coord,this.pf_stair_entries[this.curr_pf-1][0]));
  //console.log(this.Haversine(this.pf_stair_entries[this.curr_pf-1][0],this.pf_stair_entries[+comm['pf']-1][0]));
  //console.log(this.Haversine(this.pf_stair_entries[+comm['pf']-1][0],this.returnCoord(comm['latlngpid'])[0]));
  //console.log(this.getCommodityDistance(comms[0]));
}
sortFeedByGetDistance(comms:commoditybase[])
{
  for (let i of comms.sort((a,b)=>this.getCommodityDistance(a)-this.getCommodityDistance(b)))
    this.commodityReply.push(i);
}
getCommodityDistance(comm:commoditybase)
{
  var retval;
  try{
  retval=this.Haversine(this.curr_coord,this.pf_stair_entries[this.curr_pf-1][0])+this.Haversine(this.pf_stair_entries[this.curr_pf-1][0],this.pf_stair_entries[+comm['pf']-1][0])+this.Haversine(this.pf_stair_entries[+comm['pf']-1][0],this.returnCoord(comm['latlng'])[0]);
  return retval;
}
catch(e){
return 0;
}
}
getCommodityDistanceRounded(comm:commoditybase)
{
  var retval;
  try{
  retval=Math.round(this.Haversine(this.curr_coord,this.pf_stair_entries[this.curr_pf-1][0])+this.Haversine(this.pf_stair_entries[this.curr_pf-1][0],this.pf_stair_entries[+comm['pf']-1][0])+this.Haversine(this.pf_stair_entries[+comm['pf']-1][0],this.returnCoord(comm['latlng'])[0]));
  return retval;
}
catch(e){
  return Math.round(this.HaversineComm(this.curr_coord,this.returnCoord(comm.latlng)[0]));
}
}
Haversine(first:latlng, second:latlng):number{

  var lat1= first['lat'];
  var lat2= second['lat'];
  var lng1 = first['lng'];
  var lng2= second['lng'];
  var p = 0.017453292519943295;
  var a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
          Math.cos(lat1 * p) * Math.cos(lat2 * p) *
          (1 - Math.cos((lng2 - lng1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)) *1000;
}
HaversineComm(first:latlng, second:latlng):number{
  var lat1= first['lat'];
  var lat2= second['lat'];
  var lng1 = first['lng'];
  var lng2= second['lng'];
  var p = 0.017453292519943295;
  var a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
          Math.cos(lat1 * p) * Math.cos(lat2 * p) *
          (1 - Math.cos((lng2 - lng1) * p))/2;
  return Math.round(12742 * Math.asin(Math.sqrt(a)) *1000);
}
refineRes(comms:commoditybase[])
{
  var retval=new Array<commoditybase>();
  for(let i of comms)
  {
    if(i['pf']==String(this.curr_pf)){}
    else
    retval.push(i);
  }
  return retval
}
showLive()
{
  this.stnserv.getLive().then(res=>this.Live=res);
  console.log(this.Live);
}
}
