from django.shortcuts import render
from rest_framework import status
from .models import Book , Review
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .renders import UserRenderer
from rest_framework.permissions import AllowAny
from .serializers import BookSerializers , ReviewSerializers
from django.shortcuts import get_object_or_404
from django.core.cache import cache

# add and get all books
class AddBook(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[AllowAny]

    def post(self,request,format=None):
        serializer=BookSerializers(data=request.data)
        # print("list",serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class GetAllBook(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            books_data = cache.get("books_list")

            if books_data is None:
                books = Book.objects.all()
                serializer = BookSerializers(books, many=True)
                books_data = serializer.data

                cache.set("books_list", books_data, timeout=60)

                return Response({
                    "source": "database",
                    "books": books_data
                }, status=status.HTTP_200_OK)
            
            return Response({
                "source": "cache",
                "books": books_data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            books = Book.objects.all()
            serializer = BookSerializers(books, many=True)
            return Response({
                "source": "fallback_db_due_to_redis_error",
                "error": str(e),
                "books": serializer.data
            }, status=status.HTTP_200_OK)

# add , update , delete a book with id's

class UpdateBookDetailView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[AllowAny]
    def put(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializers(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
            "msg": "Data updated successfully",
            "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetailView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[AllowAny]

    def get(self,request,pk):
        book=get_object_or_404(Book,pk=pk)
        serializers=BookSerializers(book)
        return Response(serializers.data,status=status.HTTP_200_OK)

class DeleteBookView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[AllowAny]

    def delete(self,request,pk):
        book=get_object_or_404(Book,pk=pk)
        book.delete()
        return Response({'message':'deleted successfully'},status=status.HTTP_200_OK)


# add review of specific book

class AddReview(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def post(self, request, book_id, format=None):
        book = get_object_or_404(Book, pk=book_id)
        data = request.data.copy()

        serializer = ReviewSerializers(data=data)

        if serializer.is_valid():
            serializer.save(book=book)  
            
            # Invalidate cached reviews for this book
            cache_key = f"book_reviews:{book_id}"
            cache.delete(cache_key)

            return Response({
                "msg": "Review added successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class BookReviewListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def get(self, request, book_id):
        try:
            # Check if reviews for this book are in cache
            cache_key = f"book_reviews:{book_id}"
            cached_reviews = cache.get(cache_key)

            if cached_reviews:
                return Response({
                    "source": "cache",
                    "book_id": book_id,
                    "reviews": cached_reviews
                }, status=200)

            # If not in cache, get book + reviews from DB
            book = get_object_or_404(Book, pk=book_id)
            reviews = book.reviews.all()
            serializer = ReviewSerializers(reviews, many=True)

            # Store in cache for future
            cache.set(cache_key, serializer.data, timeout=60)

            return Response({
                "source": "database",
                "book_id": str(book.id),
                "book_title": book.title,
                "reviews": serializer.data
            }, status=200)

        except Exception as e:
            return Response({
                "error": str(e),
                "message": "Failed to retrieve book reviews"
            }, status=500)

class BookReviewsByTitle(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def get(self, request):
        title = request.query_params.get('title', None)
        reviews_data = []

        if title:
            cache_key = f"reviews_by_title:{title.lower().replace(' ', '_')}"
            cached_reviews = cache.get(cache_key)

            if cached_reviews:
                return Response({
                    "source": "cache",
                    "title": title,
                    "reviews": cached_reviews
                }, status=status.HTTP_200_OK)

            try:
                # Case-insensitive search for book title containing the provided title
                books = Book.objects.filter(title__icontains=title)
                
                # Fetch all reviews related to these books
                # Using select_related('book') for optimized database queries
                reviews = Review.objects.filter(book__in=books).select_related('book')
                
                serializer = ReviewSerializers(reviews, many=True)
                reviews_data = serializer.data

                # Cache the results
                cache.set(cache_key, reviews_data, timeout=60) # Cache for 60 seconds

                return Response({
                    "source": "database",
                    "title": title,
                    "reviews": reviews_data
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    "error": str(e),
                    "message": "Failed to retrieve reviews by title"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            "message": "Please provide a book title.",
            "reviews": [] # Return an empty list if no title is provided
        }, status=status.HTTP_400_BAD_REQUEST)
