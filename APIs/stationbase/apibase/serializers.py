from rest_framework import serializers
from .models import stationbase,commoditybase,trnpf,nearbybase

class stationbaseSerializer(serializers.ModelSerializer):
    class Meta:
        model=stationbase
        fields=('code', 'name', 'entry_keys', 'entry_values', 'exit_keys', 'exit_values', 'commodity_keys', 'nearby_keys', 'pf_number', 'pf_types', 'ticket_counter_keys', 'ticket_counter_values', 'reservation_charts', 'waiting_room_keys', 'waiting_room_values', 'cloak_room', 'rpf_office', 'grp_office', 'enquiry_office', 'railway_engg', 'station_master', 'tte_office', 'pf_stair_entries', 'pf_under_entries', 'pf_slope_entries', 'pf_escl_entries', 'divyang_keys', 'divyang_values', 'other_keys', 'other_values', 'has_protected', 'is_railwired')

class nearbybaseSerializer(serializers.ModelSerializer):
    class Meta:
        model=nearbybase
        fields=('code', 'n_type', 'name', 'latlng', 'other_keys', 'other_values')

class commoditybaseSerializer(serializers.ModelSerializer):
    class Meta:
        model=commoditybase
        fields=('code','pf', 'c_type', 'name', 'latlng', 'other_keys', 'other_values')

class trnpfSerializer(serializers.ModelSerializer):
    class Meta:
        model = trnpf
        fields = ('code','pf','trains')
