📘 Book Review App
A full-stack Book Review Management System built using Django Rest Framework and ReactJS (Material UI). Users can browse books and leave reviews (including name, comment, and rating).

🚀 Live Demo
📽️ Walkthrough Video: [Insert your video link here]

🧠 Features
📚 Add book 

📚 View all book details (title, author, date) and also update and delete 

📝 Submit reviews (name, text, rating).

🌟 See all reviews for a book. searching a book by title 

💾 Backend caching with Redis for faster access.

✅ RESTful API integration with clean UI.

🔧 Tech Stack
Frontend	ReactJS, Material UI, Axios
Backend	Django, Django Rest Framework
Database	Sqlite3
Caching	Redis
Deployment	(Optional) Heroku, Vercel
API Testing	Postman / curl

🗂️ Project Structure

📦 book-review-app/
├── 📁 backend/
│   ├── 📄 models.py
│   ├── 📄 serializers.py
│   ├── 📄 views.py
│   ├── 📄 urls.py
│   └── 📄 settings.py
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📄 App.js
│   │   ├── 📄 Api.js
│   │   └── 📁 components/
│   │       ├── 📄 BookDetails.js
│   │       └── 📄 AddReview.js
└── 📄 README.md


⚙️ Setup Instructions
🔹 1. Clone the Project
git clone https://github.com/your-username/book-review-app.git
cd book-review-app

🔹 2. Backend Setup (Django)
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

🔹 3. pip install -r requirements.txt
Django>=5.0,<6.0
djangorestframework>=3.14.0
psycopg2>=2.9.9
django-cors-headers>=4.3.1
django-redis>=5.4.0
python-dotenv>=1.0.1

🔹 4. Migrations
python manage.py makemigrations
python manage.py migrate

🔹 5 Run Server
python manage.py runserver
🌐 Running at: http://127.0.0.1:8000/

🔹 6. Frontend Setup (React)
cd frontend
npm install
npm start
🌐 Running at: http://localhost:3000/

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/task/listbook/	Get all books
POST	/api/task/addbook/	Add a new book
GET	/api/task/book_detail/<uuid:book_id>/	Get details of a single book
PUT	/api/task/update_book/<uuid:book_id>/	Update book details
DELETE	/api/task/delete_book/<uuid:book_id>/	Delete a book
POST	/api/task/add-review/<uuid:book_id>/	Add a review for a book
GET	/api/task/get_review/<uuid:book_id>/	Get all reviews for a book
GET /api/task/book-reviews-by-title/  search book by its title

🧪 Testing
You can test endpoints using:
✅ Example: Add a Book (POST)
POST /api/task/addbook/
Content-Type: application/json

{
  "title": "Jai Ram",
  "author": "Mahi"
}

✅ Example: Add a Review (POST)
POST /api/task/add-review/<book_id>/
Content-Type: application/json

{
  "reviewer_name": "Shipra",
  "review_text": "Very informative!",
  "rating": 5
}

✅ Example: Get Reviews (GET)
GET /api/task/get_review/<book_id>/

💾 Redis Caching
To use Redis for caching:
# Install Redis on your system and start it
redis-server
Update Django settings.py:

python
Copy
Edit
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
    }
}

💡 .env Variables (Optional)
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/dbname

👩‍💻 Author
Shipra Gupta
📧 shipra@example.com
🔗 GitHub: @Shipra09876

