import React from "react";
import { useParams } from "react-router-dom";
import BookDetails from "./BookDetails";

const BookDetailsWrapper = () => {
  const { id } = useParams();
  return <BookDetails bookId={id} />;
};

export default BookDetailsWrapper;
