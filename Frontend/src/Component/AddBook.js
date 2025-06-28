import { useState } from "react";
import { addbook } from "../Api";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    height: '300px',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: theme.spacing(5),
    gap: theme.spacing(2),
    margin: '30',
    position: 'relative',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const AddbookContainer = styled(Stack)(({ theme }) => ({
    minHeight: '20vh',
    width: '100%',
    padding: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #f0f4ff, #ffffff)', // optional
    position: 'relative', // keep for background layering
    overflowY: 'auto',


    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));


function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbarOpen(true);
        try {
            await addbook({ title, author });
            alert("Book added!");
            setTitle("");
            setAuthor("");
        } catch (err) {
            console.error(err);
            alert('Failed to add book');
        }
    };
    
    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
        <AddbookContainer justifyContent={'center'} alignItems={'center'}>
            <CssBaseline />
            <Card component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Typography textAlign={'center'} fontWeight={'bold'} fontSize={'30px'}>
                        Add Book 
                    </Typography>
                    <TextField
                        label="Title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Author"
                        name="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Submit
                    </Button>

                </Stack>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Login successful!
                </Alert>
            </Snackbar>
        </AddbookContainer>
    );
};

export default AddBook;
