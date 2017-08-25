export interface Passengers{
  no:string;
  booking_status:string;
  current_status:string;
}
export interface StnMeta{
  code:string;
  name:string;
}
export interface Train_Base{
  train_num:string;
  start_code:string;
  end_code:string;
  train_name:string;
}
export interface rt{
  day:string;
  stn_name:string;
  depart:string;
  time_or_st_end:string;
  index:string;
}
export interface Pnr{
  response_code:string;
  passengers:Passengers[];
  chart_prepared:string;
  error:string;
  train_name:string;
  train_num:string;
  pnr:string;
  doj:string;
  class1:string;
  total_passengers:number;
  from_station:StnMeta;
  to_station:StnMeta;
  boarding_point:StnMeta;
  reservation_upto:StnMeta;
}
export interface Availability{
  headings:any[];
  availability:any[];
}
export interface Route{
  train_base:Train_Base;
  route:rt[];
}
export interface Fare{
  headings:string[];
  fare:string[];
}
export interface Running{
response_code:string;
train_num:string;
train_name:string;
journey_station:string;
journey_date:string;
sch_arr:string;
ach_arr:string;
delay_arr:string;
sch_dep:string;
ach_dep:string;
delay_dep:string;
exp_platform_no:string;
last_location:string;
arr_flag:number;
dep_flag:number;
delay_arr_in_mins:string;
delay_dep_in_mins:string;
stnCode:string;
actArr:string;
actDep:string;
schArrTime:string;
schDepTime:string;
delayArr:string;
delayDep:string;
arr:boolean;
dep:boolean;
distance:number;
}
