import axios from "axios";
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        'Content-Type': 'application/json',
    },
});


export const addbook = async (data) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/task/addbook/`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        console.log("Successfully added");
        return response.data;
    } catch (error) {
        console.error("Failed to add");
        return null;
    }
};

export const getBooks = () => axios.get(`http://127.0.0.1:8000/api/task/listbook/`);

export const updateBook = (id, data) => axios.put(`http://127.0.0.1:8000/api/task/update_book/${id}/`, data);

export const deleteBook = (id) => axios.delete(`http://127.0.0.1:8000/api/task/delete_book/${id}/`);

export const getBookDetails = (id) => axios.get(`http://127.0.0.1:8000/api/task/book_detail/${id}/`);

export const getBookReviews = (bookId) => axios.get(`http://127.0.0.1:8000/api/task/get_review/${bookId}/`);

export const addReview = (bookId, data) => axios.post(`http://127.0.0.1:8000/api/task/add-review/${bookId}/`, data);

export const getReviewsByTitle = (title) =>
  axios.get(`http://127.0.0.1:8000/api/task/book-reviews-by-title/?title=${encodeURIComponent(title)}`);
