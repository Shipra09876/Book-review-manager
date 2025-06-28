import React, { useState } from "react";
import { getReviewsByTitle } from "../Api"; // Assuming this path is correct
import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Paper,
} from "@mui/material";

const ReviewsByTitle = () => {
  const [title, setTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false); // New state to track if a search has been performed

  const handleSearch = async () => {
    if (!title.trim()) {
      alert("Please enter a book title.");
      return;
    }
    setSearchAttempted(true);
    try {
      const res = await getReviewsByTitle(title.trim());
      console.log("API response:", res.data);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Error:", err);
      alert(`Error fetching reviews: ${err.response?.data?.message || err.message}`);
      setReviews([]);
    }
  };


  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Search Reviews by Title
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="Enter book title" // More descriptive label
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      {/* Conditional rendering for reviews or no reviews message */}
      {searchAttempted && reviews.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Reviews for "{title}":
          </Typography>
          <Stack spacing={2}>
            {reviews.map((r) => {
              return (
                <Paper key={r.id || `${r.reviewer_name}-${r.review_text}`} sx={{ padding: 2 }} elevation={2}>
                  <Typography variant="subtitle2" color="text.primary">
                    {r.reviewer_name || "Anonymous"} &nbsp;⭐ {r.rating ?? "N/A"}/5
                  </Typography>
                  <Typography variant="body1">{r.review_text || "No review provided."}</Typography>
                </Paper>
              );
            })}

          </Stack>
        </>
      ) : (searchAttempted && reviews.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No reviews found for "{title}".
        </Typography>
      ))}
    </Box>
  );
};

export default ReviewsByTitle;