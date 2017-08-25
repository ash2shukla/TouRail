export interface Stationbase{
  code:string;
  name:string;
  entry_keys:string;
  entry_values:string;
  exit_keys:string;
  exit_values:string;
  commodity_keys:string;
  nearby_keys:string;
  pf_number:string;
  pf_type:string;
  ticket_counter_keys:string;
  ticket_counter_values:string;
  rservation_chart:string;
  waiting_room_keys:string;
  waiting_room_values:string;
  cloak_room:string;
  rpf_office:string;
  grp_office:string;
  enquiry_office:string;
  railway_engg:string;
  station_master:string;
  tte_office:string;
  pf_stair_entries:string;
  pf_under_entries:string;
  pf_slop_entries:string;
  pf_escl_entries:string;
  divyang_keys:string;
  divyang_values:string;
  other_keys:string;
  other_values:string;
  has_protected:string;
  is_railwired:string;
}

export interface Commoditybase{
  code:string;
  pf:string;
  c_type:string;
  name:string;
  latlng:string;
  other_keys:string;
  other_values:string;
}

export interface NearbyBase{
  code:string;
  n_type:string;
  name:string;
  latlng:string;
  other_keys:string;
  other_values:string;
}
