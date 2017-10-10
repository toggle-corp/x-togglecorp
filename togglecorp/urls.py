"""togglecorp URL Configuration
"""
from django.conf.urls import url, static
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from career.views import CareerView, CareerDetailsView


urlpatterns = [

    url(r'^$', TemplateView.as_view(template_name="index.html"), name="index"),
    url(r'^home/$', TemplateView.as_view(template_name="index.html")),

    url(r'^careers/$', CareerView.as_view(), name='career'),
    url(r'^careers/(?P<slug>[\w-]+)/$', CareerDetailsView.as_view(),
        name='career-details'),

    url(r'^products/mobile/$',
        TemplateView.as_view(template_name="mobile-apps.html"),
        name="mobile_apps"),
    url(r'^works/$', TemplateView.as_view(template_name="works.html"),
        name="works"),

    url(r'^admin/', admin.site.urls),
] + static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
