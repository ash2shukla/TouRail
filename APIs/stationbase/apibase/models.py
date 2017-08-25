from __future__ import unicode_literals

from django.db import models

class stationbase(models.Model):
    code=models.CharField(max_length=5,null=False)
    name=models.CharField(max_length=100,null=False)
    entry_keys=models.CharField(max_length=1000,null=False)
    entry_values=models.CharField(max_length=1000,null=False)
    exit_keys=models.CharField(max_length=1000,null=False)
    exit_values=models.CharField(max_length=1000,null=False)
    commodity_keys=models.CharField(max_length=1000,null=True)
    nearby_keys=models.CharField(max_length=1000,null=True)
    pf_number=models.CharField(max_length=2,null=False)
    pf_types=models.CharField(max_length=4,null=False)
    ticket_counter_keys=models.CharField(max_length=1000,null=True)
    ticket_counter_values=models.CharField(max_length=1000,null=True)
    reservation_charts=models.CharField(max_length=1000,null=True)
    waiting_room_keys=models.CharField(max_length=1000,null=True)
    waiting_room_values=models.CharField(max_length=1000,null=True)
    cloak_room=models.CharField(max_length=1000,null=True)
    rpf_office=models.CharField(max_length=1000,null=True)
    grp_office=models.CharField(max_length=1000,null=True)
    enquiry_office=models.CharField(max_length=1000,null=True)
    railway_engg=models.CharField(max_length=1000,null=True)
    station_master=models.CharField(max_length=1000,null=True)
    tte_office=models.CharField(max_length=1000,null=True)
    pf_stair_entries=models.CharField(max_length=1000,null=True)
    pf_under_entries=models.CharField(max_length=1000,null=True)
    pf_slope_entries=models.CharField(max_length=1000,null=True)
    pf_escl_entries=models.CharField(max_length=1000,null=True)
    divyang_keys=models.CharField(max_length=1000,null=True)
    divyang_values=models.CharField(max_length=1000,null=True)
    other_keys=models.CharField(max_length=1000,null=True)
    other_values=models.CharField(max_length=1000,null=True)
    has_protected=models.CharField(max_length=1,null=False)
    is_railwired=models.CharField(max_length=1,null=False)


class commoditybase(models.Model):
    code=models.CharField(max_length=5,null=False)
    pf=models.CharField(max_length=2,null=False)
    c_type=models.CharField(max_length=100,null=False)
    name=models.CharField(max_length=1000,null=True)
    latlng=models.CharField(max_length=1000,null=False)
    other_keys=models.CharField(max_length=1000,null=True)
    other_values=models.CharField(max_length=1000,null=True)

class nearbybase(models.Model):
    code=models.CharField(max_length=5,null=False)
    n_type=models.CharField(max_length=100,null=False)
    name=models.CharField(max_length=1000,null=True)
    latlng=models.CharField(max_length=1000,null=False)
    other_keys=models.CharField(max_length=1000,null=True)
    other_values=models.CharField(max_length=1000,null=True)

class trnpf(models.Model):
    code=models.CharField(max_length=5,null=False)
    pf=models.CharField(max_length=2,null=False)
    trains=models.CharField(max_length=1000,null=False)
