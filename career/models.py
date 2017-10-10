from django.db import models
from django.template.defaultfilters import slugify
from tinymce.models import HTMLField


class Vacancy(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    header_image = models.FileField(upload_to='vacancy-header-images',
                                    null=True, blank=True, default=None)
    active = models.BooleanField(default=True)
    slug = models.SlugField(default=None, null=True, blank=True,
                            max_length=320,
                            editable=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Vacancy, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Vacancies'


class OverviewCategory(models.Model):
    vacancy = models.ForeignKey(Vacancy)
    title = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Section(models.Model):
    vacancy = models.ForeignKey(Vacancy)
    title = models.CharField(max_length=255)
    description = HTMLField()

    def __str__(self):
        return self.title
