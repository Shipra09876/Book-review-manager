from django.db import models
import uuid

class Book(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200,)
    author = models.CharField(max_length=100)
    published_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    reviewer_name = models.CharField(max_length=100)
    review_text = models.TextField()
    rating = models.IntegerField(default=1)

    class Meta:
        indexes = [
            models.Index(fields=['book_id'], name='review_book_idx'),
        ]

    def __str__(self):
        return f'Review of {self.book.title} by {self.reviewer_name}'
    
    