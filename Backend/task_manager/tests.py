from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Book

class BookAPITests(APITestCase):
    def test_add_book(self):
        url = reverse('add-book') 
        data = {
            "title": "Rich Dad",
            "author": "Robert Kiyosaki"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 1)
        self.assertEqual(Book.objects.get().title, "Rich Dad")


    def test_get_all_books(self):
        Book.objects.create(title="Book 1", author="Author A")
        Book.objects.create(title="Book 2", author="Author B")

        url = reverse('get-all-books')  
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["books"]), 2)
        self.assertEqual(response.data["source"], "database")  # first time it should be DB

from django.core.cache import cache
from .models import Review

class BookReviewCacheTests(APITestCase):
    
    def setUp(self):
        self.book = Book.objects.create(title="Rich Dad", author="Robert Kiyosaki")
        Review.objects.create(book=self.book, reviewer_name="Shipra", review_text="Awesome book", rating=5)

    def test_review_by_title_cache_miss(self):
        cache_key = f"book_reviews_by_title:{self.book.title}"
        cache.delete(cache_key)  # force cache miss

        url = reverse('book-reviews-by-title') + f'?title={self.book.title}'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["source"], "database")

        # Redis should now have the data
        cached_data = cache.get(cache_key)
        self.assertIsNotNone(cached_data)
        self.assertEqual(len(cached_data), 1)
