import React, { useEffect, useState } from "react";
import { getBookDetails, getBookReviews } from "../Api";
import AddReview from "./AddReview";

import {
    Typography,
    Card,
    CardContent,
    Divider,
    Box,
    Stack,
    CircularProgress,
    Paper,
} from "@mui/material";

const BookDetails = ({ bookId }) => {
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookAndReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch book details
            const bookRes = await getBookDetails(bookId);
            setBook(bookRes.data);

            // Fetch reviews
            const reviewsRes = await getBookReviews(bookId);
            setReviews(reviewsRes.data.reviews);
        } catch (err) {
            console.error("Failed to fetch book details or reviews:", err);
            setError("Failed to load book details or reviews.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookAndReviews();
    }, [bookId]);

    const refreshReviews = () => {
        fetchBookAndReviews(); // Re-fetch both if review is added to ensure consistency
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!book) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography>Book not found.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Card sx={{ maxWidth: 600, margin: "0 auto", boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Author: {book.author}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h5" gutterBottom>
                        Reviews
                    </Typography>

                    {reviews.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No reviews yet.
                        </Typography>
                    ) : (
                        <Stack spacing={1}>
                            {reviews.map((r) => ( // Use r.id or a unique property for key if available, otherwise index is fallback
                                <Paper key={r.id || r.review_text} sx={{ p: 2 }} elevation={2}>
                                    <Typography variant="subtitle2" color="text.primary">
                                        {r.reviewer_name} &nbsp;⭐ {r.rating}/5
                                    </Typography>
                                    <Typography variant="body1">{r.review_text}</Typography>
                                </Paper>
                            ))}
                        </Stack>
                    )}


                    <Divider sx={{ my: 3 }} />

                    <AddReview bookId={bookId} refresh={refreshReviews} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default BookDetails;