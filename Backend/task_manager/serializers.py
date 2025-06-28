from rest_framework import serializers
from .models import *

class BookSerializers(serializers.ModelSerializer):
    class Meta:
        model=Book
        fields=['id','title','author','published_date']

class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields = ['id','reviewer_name', 'review_text', 'rating']
