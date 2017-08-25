from django.contrib import admin
from .models import stationbase,commoditybase,nearbybase,trnpf

class stationbaseAdmin(admin.ModelAdmin):
    list_display=['code']

class commoditybaseAdmin(admin.ModelAdmin):
    list_display=['code','pf','c_type']

class nearbybaseAdmin(admin.ModelAdmin):
    list_display=['code','n_type']

class trnpfAdmin(admin.ModelAdmin):
    list_display=['code','pf']
admin.site.register(stationbase,stationbaseAdmin)
admin.site.register(nearbybase,nearbybaseAdmin)
admin.site.register(commoditybase,commoditybaseAdmin)
admin.site.register(trnpf,trnpfAdmin)
