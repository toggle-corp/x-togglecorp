from django.contrib import admin
from career.models import (
    Vacancy,
    OverviewCategory,
    Section,
)


class OverviewCategoryInline(admin.TabularInline):
    model = OverviewCategory


class SectionInline(admin.StackedInline):
    model = Section


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    inlines = [OverviewCategoryInline, SectionInline]
