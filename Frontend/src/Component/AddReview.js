// import React, { useState } from "react";
// import { addReview } from "../Api";
// import {
//     TextField,
//     Button,
//     Stack,
// } from "@mui/material";

// const AddReview = ({ bookId, refresh }) => {
//     const [comment, setComment] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await addReview(bookId, { review_text: comment });
//             console.log("Review added:", res.data);
//             setComment("");
//             refresh();
//         } catch (err) {
//             console.error("Add review error:", err.response?.data || err.message);
//             alert("Failed to add review");
//         }

//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <Stack direction="row" spacing={2} alignItems="center">
//                 <TextField
//                     label="Write a review..."
//                     variant="outlined"
//                     fullWidth
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     required
//                 />
//                 <Button variant="contained" color="primary" type="submit">
//                     Submit
//                 </Button>
//             </Stack>
//         </form>
//     );
// };

// export default AddReview;

import React, { useState } from "react";
import { addReview } from "../Api";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";

const AddReview = ({ bookId, refresh }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addReview(bookId, {
        reviewer_name: reviewerName,
        review_text: comment,
        rating: Number(rating),
      });
      console.log("Review added:", res.data);
      setReviewerName("");
      setComment("");
      setRating("");
      refresh();
    } catch (err) {
      console.error("Add review error:", err.response?.data || err.message);
      alert("Failed to add review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Your Name"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
        />
        <TextField
          label="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <TextField
          select
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default AddReview;
