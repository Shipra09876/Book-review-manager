from django.contrib import admin
from .models import *
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'published_date')
    search_fields = ('title', 'author')
    list_filter = ('published_date',)

admin.site.register(Book,BookAdmin)

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'book', 'reviewer_name', 'rating')
    search_fields = ('book__title', 'reviewer_name')
    list_filter = ('rating',)

admin.site.register(Review,ReviewAdmin)
