# Book Review Management System 

Book Review App A full-stack Book Review Management System built using Django Rest Framework and ReactJS (Material UI). Users can browse books and leave reviews (including name, comment, and rating)

## Demo

https://drive.google.com/file/d/1mfqKPzeZfvyKXlD1DqqrKRcPi4Li9NqG/view?usp=drive_link

## Installation  

### Enviornment setup 
```bash
    python3 -m venv env_name
```

### Backend project setup 
```bash
    django-admin startproject project_name .
    cd project_name
    python manage.py startapp app_name
    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver
```
### Backend Installation 
```bash
    pip install django djangorestframework   
    pip install psycopg2-binary
    pip install django-cors-headers
    pip install python-decouple drf-yasg

```

### Frontend project setup 
```bash
    npx create-react-app book-review-frontend
    cd book-review-frontend
    

```
### Backend Installation 
```bash
    npm install axios
    npm install react-router-dom
    npm install @mui/material @emotion/react    
    @emotion/styled
    npm install @mui/icons-material
    npm install uuid

```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Django settings
```bash
SECRET_KEY='django-insecure-e(gp!4s9d0-qt+q4juxhwy2$8x#g$r8*i14*f83lj2hcdfsw&y'
DEBUG=True
```

### Database (PostgreSQL)
```bash
DB_USER=sqlite3
```

### CORS
``` bash
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Cache (optional)
```bash
REDIS_URL=redis://127.0.0.1:6379
```
## Features

📚 Add book

📚 View all book details (title, author, date) and also update and delete

📝 Submit reviews (name, text, rating).

🌟 See all reviews for a book. searching a book by title

💾 Backend caching with Redis for faster access.

✅ RESTful API integration with clean UI.


## API Reference

#### Add Book

```http://localhost:8000/
  GET api/task/addbook/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**  |
| `author` | `string` | **Required**  |


#### Get all books

```http
  GET /api/task/listbook/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | uuid | **Required**. Id of item to fetch |


#### delete book

```http
  DELETE /api/task/delete_book/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | uuid | **Required**. Id of item to fetch |

#### UPDATE book

```http
  UPDATE /api/task/update_book/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| title    | 'string' | **Required** |
| author    | 'string' | **Required** |

#### To get the specific book detail

```http
  GET /api/task/book_detail/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id    | uuid | **Required** |


#### Add a review

```http
  POST /api/task/add-review/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| reviewer_name | string | **Required** |
| reviewer_text | string | **Required** |
| rating | int | **Required** |


#### Get a review

```http
  GET /api/task/get-review/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id | string | **Required** |


#### Get a review of a book 

```http
  GET /api/task/get-review/{id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id | string | **Required** |



#### Swagger api 

```http
  http://localhost:8000/swagger/
```


## Tech Stack 
- Backend	: Django, Django REST Framework (DRF), UUID, Django Caching
- Frontend	: React.js, Axios, Material UI (MUI)
- Database	: SQLite 
- API Docs	: drf-yasg (Swagger)
- Caching	: Redis
- UUIDs	    : For unique Book and Review IDs 


## How it works
- User adds book from frontend → saved in DB

- User clicks details → sees book & review list

- User submits review → updates via API

- User updates or deletes books

- Everything UUID-based

- Caching used for optimizing review fetching

- Clean design via React + MUI


# Hi, I'm Shipra Gupta! 👋


## 🚀 About Me
I'm a full stack developer...


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shipra-guptaa/)


