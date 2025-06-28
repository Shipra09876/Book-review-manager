import React, { useEffect, useState } from "react";
import { getBooks, deleteBook, getReviewsByTitle, updateBook } from "../Api";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Box,
  TextField,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListBook = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    getBooks().then((res) => setBooks(res.data.books));
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  const handleDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const handleReviewSearch = async () => {
    try {
      const res = await getReviewsByTitle(title);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error(err);
      alert("Error fetching reviews");
    }
  };

  const handleOpenUpdate = (book) => {
    setSelectedBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateBook(selectedBook.id, {
        title: editTitle,
        author: editAuthor,
      });
      setOpen(false);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Failed to update book");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" spacing={2} mb={4}>
        <TextField
          label="Search Reviews by Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleReviewSearch}>
          Search
        </Button>
      </Stack>

      {reviews.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Reviews for "{title}":
          </Typography>
          <Stack spacing={2}>
            {reviews.map((r, i) => (
              <Paper key={i} sx={{ padding: 2 }}>
                <Typography>{r.comment}</Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      <Stack spacing={2}>
        {books.map((book) => (
          <Card key={book.id} sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {book.author}
              </Typography>

              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="contained" onClick={() => handleDetails(book.id)}>
                  Details
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(book.id)}>
                  Delete
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleOpenUpdate(book)}>
                  Update
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* ✅ Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Author"
            fullWidth
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListBook;
