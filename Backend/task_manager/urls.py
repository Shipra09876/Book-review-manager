from django.urls import path,include
from .views import *
from django.contrib import admin


urlpatterns=[
    path('addbook/',AddBook.as_view(),name='add-book'),
    path('listbook/',GetAllBook.as_view(),name='get-all-books'),
    path('update_book/<uuid:pk>/',UpdateBookDetailView.as_view(),name='update-book'),
    path('book_detail/<uuid:pk>/',BookDetailView.as_view(),name='detail-book'),
    path('delete_book/<uuid:pk>/',DeleteBookView.as_view(),name='delete-book'),
    path('add-review/<uuid:book_id>/',AddReview.as_view(),name='add-review'),
    path('get_review/<uuid:book_id>/',BookReviewListView.as_view(),name='list-review'),
    path('book-reviews-by-title/',BookReviewsByTitle.as_view(),name='book-reviews-by-title')
]