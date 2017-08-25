export class stnTuple{
  code:string;
  name:string;
}

export class trnpf{
  code:string;
  pf:string;
  trains:string;
}

export class stationbase{
  code:string;
  name:string;
  entry_keys :string;
  entry_values :string;
  exit_keys :string;
  exit_values :string;
  commodity_keys:string;
  nearby_keys:string;
  pf_number:string;
  pf_types:string;
  ticket_counter_keys:string;
  ticket_counter_values:string;
  reservation_charts:string;
  waiting_room_keys:string;
  waiting_room_values:string;
  cloak_room:string;
  rpf_office:string;
  grp_office:string;
  enquiry_office:string;
  railway_engg:string;
  station_master:string;
  tte_office:string;
  pf_stair_entries :string;
  pf_under_entries:string;
  pf_slope_entries:string;
  pf_escl_entries:string;
  divyang_keys :string;
  divyang_values:string;
  other_keys :string;
  other_values :string;
  has_protected :string;
  is_railwired:string;
}

export class commoditybase{
  code:string;
  pf:string;
  c_type:string;
  name:string;
  latlng:string;
  other_keys:string;
  other_values:string;
}

export class nearbybase{
  code:string;
  n_type:string;
  name:string;
  latlng:string;
  other_keys:string;
  other_values:string;
}

export class latlng{
  constructor(a:number,b:number){
    this.lat=a;
    this.lng=b;
  }
  lat:number;
  lng:number;
}

export class Live{
  sch_arrival: string;
  train_no: string;
  delay: string;
  sch_depart: string;
  act_arr_depart:string;
  train_name:string;
}
