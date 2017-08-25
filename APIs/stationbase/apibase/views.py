from django.shortcuts import render
from django import forms
from django.http import HttpResponse
from xlrd import open_workbook
from .serializers import stationbaseSerializer,commoditybaseSerializer,nearbybaseSerializer,trnpfSerializer
from .models import stationbase,commoditybase,nearbybase,trnpf
from rest_framework import viewsets

class UploadFileForm(forms.Form):
    file= forms.FileField()

def splitadd(ref,index,sym):
    return sym.join([ref.cell_value(index,i) for i in range(0,ref.ncols) if ref.cell_value(index,i)!=""])

def feedmebase(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST,request.FILES)

        if form.is_valid():
            print form
            x = open_workbook(file_contents=request.FILES['file'].read()).sheet_by_index(0)
            if(x.nrows>32):
                return HttpResponse("More tuples than expected!")
            else:
                try:
                    for i in range(0,x.nrows):
                        if(i==0):
                            codei=x.cell_value(i,0)
                        elif(i==1):
                            namei=x.cell_value(i,0)
                        elif(i==2):
                            entry_keysi=splitadd(x,i,',')
                        elif(i==3):
                            entry_valuesi=splitadd(x,i,'^')
                        elif(i==4):
                            exit_keysi=splitadd(x,i,',')
                        elif(i==5):
                            exit_valuesi=splitadd(x,i,'^')
                        elif(i==6):
                            commodity_keysi=splitadd(x,i,',')
                        elif(i==7):
                            nearby_keysi=splitadd(x,i,',')
                        elif(i==8):
                            pf_numberi=x.cell_value(i,0)
                        elif(i==9):
                            pf_typesi=x.cell_value(i,0)
                        elif(i==10):
                            ticket_counter_keysi=splitadd(x,i,',')
                        elif(i==11):
                            ticket_counter_valuesi=splitadd(x,i,'^')
                        elif(i==12):
                            reservation_chartsi=splitadd(x,i,'^')
                        elif(i==13):
                            waiting_room_keysi=splitadd(x,i,',')
                        elif(i==14):
                            waiting_room_valuesi=splitadd(x,i,'^')
                        elif(i==15):
                            cloak_roomi=x.cell_value(i,0)
                        elif(i==16):
                            rpf_officei=x.cell_value(i,0)
                        elif(i==17):
                            grp_officei=x.cell_value(i,0)
                        elif(i==18):
                            enquiry_officei=x.cell_value(i,0)
                        elif(i==19):
                            railway_enggi=x.cell_value(i,0)
                        elif(i==20):
                            station_masteri=x.cell_value(i,0)
                        elif(i==21):
                            tte_officei=x.cell_value(i,0)
                        elif(i==22):
                            pf_stair_entriesi=splitadd(x,i,'@')
                        elif(i==23):
                            pf_under_entriesi=splitadd(x,i,'@')
                        elif(i==24):
                            pf_slope_entriesi=splitadd(x,i,'@')
                        elif(i==25):
                            pf_escl_entriesi=splitadd(x,i,'@')
                        elif(i==26):
                            divyang_keysi=splitadd(x,i,',')
                        elif(i==27):
                            divyang_valuesi=splitadd(x,i,'^')
                        elif(i==28):
                            other_keysi=splitadd(x,i,',')
                        elif(i==29):
                            other_valuesi=splitadd(x,i,'^')
                        elif(i==30):
                            has_protectedi=x.cell_value(i,0)
                        elif(i==31):
                            is_railwiredi=x.cell_value(i,0)
                    stationbase(
                    code=codei,
                    name=namei,
                    entry_keys=entry_keysi,
                    entry_values=entry_valuesi,
                    exit_keys=exit_keysi,
                    exit_values=exit_valuesi,
                    commodity_keys=commodity_keysi,
                    nearby_keys=nearby_keysi,
                    pf_number=pf_numberi,
                    pf_types=pf_typesi,
                    ticket_counter_keys=ticket_counter_keysi,
                    ticket_counter_values=ticket_counter_valuesi,
                    reservation_charts=reservation_chartsi,
                    waiting_room_keys=waiting_room_keysi,
                    waiting_room_values=waiting_room_valuesi,
                    cloak_room=cloak_roomi,
                    rpf_office=rpf_officei,
                    grp_office=grp_officei,
                    enquiry_office=enquiry_officei,
                    railway_engg=railway_enggi,
                    station_master=station_masteri,
                    tte_office=tte_officei,
                    pf_stair_entries=pf_stair_entriesi,
                    pf_under_entries=pf_under_entriesi,
                    pf_slope_entries=pf_slope_entriesi,
                    pf_escl_entries=pf_escl_entriesi,
                    divyang_keys=divyang_keysi,
                    divyang_values=divyang_valuesi,
                    other_keys=other_keysi,
                    other_values=other_valuesi,
                    has_protected=has_protectedi,
                    is_railwired=is_railwiredi
                    ).save()
                except:
                    return HttpResponse("Some Error Occured Due to improperly formatted file")
        else:
            print request.FILES['file'].read()
            return HttpResponse("File Form was invalid")
    else:
        return render(request,"upload.html",{'form':UploadFileForm()})
    return render(request,"upload.html",{'form':UploadFileForm()})


class stationbaseViewSet(viewsets.ModelViewSet):
    serializer_class=stationbaseSerializer
    http_method_names=['get']
    def get_queryset(self):
        codei=self.request.query_params.get('code',None)
        if codei is not None:
            return stationbase.objects.filter(code__iexact=codei)
        else:
            return {}

def feedmecommodity(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST,request.FILES)
        if form.is_valid():
            x = open_workbook(file_contents=request.FILES['file'].read()).sheet_by_index(0)
            if(x.ncols>7):
                return HttpResponse("More tuples than expected!")
            elif(x.ncols==7):
                try:
                    for i in range(0,x.nrows):
                        commoditybase(
                        code=x.cell_value(i,0),
                        pf=x.cell_value(i,1),
                        c_type=x.cell_value(i,2),
                        name=x.cell_value(i,3),
                        latlng=x.cell_value(i,4),
                        other_keys=x.cell_value(i,5),
                        other_values=x.cell_value(i,6)
                        ).save()
                except:
                    return HttpResponse("Some Error Occured Due to improperly formatted file")
            elif(x.ncols==5):
                try:
                    for i in range(0,x.nrows):
                        commoditybase(
                        code=x.cell_value(i,0),
                        pf=x.cell_value(i,1),
                        c_type=x.cell_value(i,2),
                        name=x.cell_value(i,3),
                        latlng=x.cell_value(i,4)
                        ).save()
                except:
                    return HttpResponse("Some Error Occured Due to improperly formatted file")
        else:
            return HttpResponse("File Form was invalid")
    else:
        return render(request,"upload.html",{'form':UploadFileForm()})
    return render(request,"upload.html",{'form':UploadFileForm()})

class commoditybaseViewSet(viewsets.ModelViewSet):
    serializer_class=commoditybaseSerializer
    http_method_names=['get']
    def get_queryset(self):
        codei=self.request.query_params.get('code',None)
        pfi=self.request.query_params.get('pf',None)
        namei=self.request.query_params.get('name',None)
        if codei is not None:
            if namei is not None:
                if pfi is not None:
                    if(pfi.lower()=="x"):
                        return commoditybase.objects.filter(code__iexact=codei).filter(c_type__iexact=namei)
                    else:
                        return commoditybase.objects.filter(code__iexact=codei).filter(c_type__iexact=namei).filter(pf__iexact=pfi)
                else:
                    return {}
            else:
                return {}

        else:
            return {}

def feedmenearby(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST,request.FILES)
        if form.is_valid():
            x = open_workbook(file_contents=request.FILES['file'].read()).sheet_by_index(0)
            if(x.ncols>6):
                return HttpResponse("More tuples than expected!")
            elif(x.ncols==6):
                try:
                    for i in range(0,x.nrows):
                        nearbybase(
                        code=x.cell_value(i,0),
                        n_type=x.cell_value(i,1),
                        name=x.cell_value(i,2),
                        latlng=x.cell_value(i,3),
                        other_keys=x.cell_value(i,4),
                        other_values=x.cell_value(i,5)
                        ).save()
                except:
                    return HttpResponse("Some Error Occured Due to improperly formatted file")
            elif(x.ncols==4):
                try:
                    for i in range(0,x.nrows):
                        nearbybase(
                        code=x.cell_value(i,0),
                        n_type=x.cell_value(i,1),
                        name=x.cell_value(i,2),
                        latlng=x.cell_value(i,3)
                        ).save()
                except:
                    return HttpResponse("Some Error Occured Due to improperly formatted file")
        else:
            return HttpResponse("File Form was invalid")
    else:
        return render(request,"upload.html",{'form':UploadFileForm()})
    return render(request,"upload.html",{'form':UploadFileForm()})

class nearbybaseViewSet(viewsets.ModelViewSet):
    serializer_class=nearbybaseSerializer
    http_method_names=['get']
    def get_queryset(self):
        codei=self.request.query_params.get('code',None)
        namei=self.request.query_params.get('name',None)
        if codei is not None:
            if namei is not None:
                return nearbybase.objects.filter(code__iexact=codei).filter(n_type__iexact=namei)
            else:
                return {}
        else:
            return {}

def feedmetrnpf(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST,request.FILES)
        if form.is_valid():
            x = open_workbook(file_contents=request.FILES['file'].read()).sheet_by_index(0)
            try:
                for i in range(0,x.nrows):
                    trnpf(
                    code=x.cell_value(i,0),
                    pf=x.cell_value(i,1),
                    trains=x.cell_value(i,2)
                    ).save()
            except:
                HttpResponse("Some Error Occured")
        else:
            return HttpResponse("File Form was invalid")
    else:
        return render(request,"upload.html",{'form':UploadFileForm()})
    return render(request,"upload.html",{'form':UploadFileForm()})

class trnpfViewSet(viewsets.ModelViewSet):
    serializer_class=trnpfSerializer
    http_method_names=['get']
    def get_queryset(self):
        codei=self.request.query_params.get('code',None)
        pfi=self.request.query_params.get('pf',None)
        if codei is not None:
            if pfi is not None:
                return trnpf.objects.filter(code__iexact=codei).filter(pf__iexact=pfi)
            else:
                return {}
        else:
            return {}
