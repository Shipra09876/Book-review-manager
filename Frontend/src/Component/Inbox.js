import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
    width: "90%",
    maxWidth: "500px",
    margin: "auto",
    marginTop: theme.spacing(10),
    padding: theme.spacing(5),
    gap: theme.spacing(3),
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles?.("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const Inbox = () => {
    const navigate = useNavigate();
    const handleAddBook = () => {
        navigate("/add-book");
    };
    const handleGetBook = () => {
        navigate("/get-book");
    };


    return (
        <>
            <CssBaseline />
            <Card>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    Welcome to Book Manager
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAddBook}
                >
                    Add Book
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGetBook}
                >
                    Books
                </Button>
            </Card>
        </>
    );
};

export default Inbox;

