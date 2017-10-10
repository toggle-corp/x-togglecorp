from django.shortcuts import render
from django.views.generic import View

from .models import Vacancy


class CareerView(View):
    def get(self, request):
        context = {}
        context['vacancies'] = Vacancy.objects.filter(active=True)
        return render(request, 'career/careers.html', context)

class CareerDetailsView(View):
    def get(self, request, slug):
        context = {}
        context['vacancy'] = Vacancy.objects.get(slug=slug)
        return render(request, 'career/career-details.html', context)
