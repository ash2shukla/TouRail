from django.shortcuts import render
from requests import get,post
from django.http import HttpResponse
from bs4 import BeautifulSoup
from json import dumps
from calendar import month_abbr
from geocoder import osm

def getlive(request):
    code=request.GET.get('code')
    url = "http://www.irctclive.in/StationStatus/"
    url +=code
    try:
        soup = BeautifulSoup(get(url).text)
        retval=[]
        for i in soup.findAll('tr')[1:]:
                x = [j.string for j in i.findAll('td')]
                temp ={
                'train_no':x[0],
                'train_name':x[1],
                'sch_arrival':x[2],
                'sch_depart':x[3],
                'act_arr_depart':x[4],
                'delay':x[5],
                }
                retval.append(temp)
        return HttpResponse(dumps(retval),content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")

def getpnr(request):
    pnr = request.GET.get('pnr')
    url ="https://www.api.railrider.in/ajax_pnr_check.php"
    payload={
    'pnr_post':pnr,
    'phone_post':''
    }
    try:
	if(post(url=url,data=payload).text==''):
		return HttpResponse(dumps([]),content_type="application/json")
	else:
        	return HttpResponse(post(url=url,data=payload).text,content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")

def getroute(request):
    train_no = request.GET.get('train_no')
    url ="https://www.railrider.in/Train-Schedule-"
    url+=train_no
    try:
        retval={}
        soup=BeautifulSoup(get(url).text)
        x=[i.string for i in soup.findAll('table',{'class':'table'})[0].findAll('td')]
        retval['train_base']={
        'train_no':x[0],
	    'start_code':x[2],
	    'end_code':x[3],
	    'train_name':x[1]
            }
        retval['route']=[]
        for i in soup.findAll('table',{'class':'table'})[1].findAll('tr')[1:]:
            x= [j.contents[0].strip('\n\t\r') for j in i.findAll('td')]
            temp = {
            'index':x[0],
            'code':x[1],
            'reach':x[3],
            'depart':x[2],
            'day':x[4]
            }
            retval['route'].append(temp)
        return HttpResponse(dumps(retval),content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")


def getavailability(request):
    try:
        url="http://www.etrains.in/seat-availability/"+request.GET.get('train_no')+"/"+request.GET.get('from_code')+"/"+request.GET.get('to_code')+"/"+request.GET.get('date')+"/"+request.GET.get('quota')+'/'+request.GET.get('cls')
        soup=BeautifulSoup(get(url).text)
        retval={}
        retval['headings']=[i.string for i in soup.findAll('table')[0].findAll('th')]
        retval['availability']=[]
        for i in soup.findAll('table')[0].findAll('tr'):
            retval['availability'].append([j.string for j in i.findAll('td')])
	retval['availability']=retval['availability'][1:]
        return HttpResponse(dumps(retval),content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")

def getfare(request):
    try:
        url="https://pnrstatuslive.com/wp-content/themes/default/get_results.php"
        payload={"train_num":request.GET.get('train_no'),
    	"from_train_station":request.GET.get('from_code'),
    	"to_train_station":request.GET.get('to_code'),
    	"travel_quota":request.GET.get('quota'),
    	"age_group":request.GET.get('age_code'),
    	"result_type":"fare_enquiry"}
        soup = BeautifulSoup(post(url=url,data=payload,headers={'X-Requested-With':"XMLHttpRequest"}).text)
        retval={}
        retval['headings']=[]
        retval['fare']=[]
        for i in soup.findAll('tr')[3:]:
            retval['headings'].append(i.findAll('td')[1].string)
            retval['fare'].append(i.findAll('td')[2].string)
        return HttpResponse(dumps(retval),content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")

def getrunning(request):
    try:
        date=request.GET.get('date').split('-')[::-1]
        date[1]=month_abbr[int(date[1])]
        date='-'.join(date)
        url ="https://api.railrider.in/api_rr_v3_test.php?page_type=live_train_status&train_num="+request.GET.get('train_no')+"&journey_station="+request.GET.get('code')+"&journey_date="+date
        print url
        return HttpResponse(post(url).text,content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")

def getcity(request):
    try:
        return HttpResponse(dumps({"city":osm([request.GET.get('lat'),request.GET.get('lng')],method="reverse").json['city']}),content_type="application/json")
    except:
        return HttpResponse(dumps([]),content_type="application/json")
    return HttpResponse(dumps([]),content_type="application/json")
