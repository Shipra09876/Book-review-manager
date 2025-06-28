import './App.css';
import AddBook from './Component/AddBook';
import NavBar from './Component/navBar';
import Inbox from './Component/Inbox';
import ListBook from './Component/ListBook';
import { Routes, Route } from 'react-router-dom';
import BookDetails from './Component/BookDetails';
import BookDetailsWrapper from './Component/BookDetailsWrapper';
import ReviewsByTitle from './Component/ReviewsByTitle';

function App() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='book-container'>
        <Routes>
          <Route path="/home" element={<Inbox />} />
          <Route path='/add-book' element={<AddBook />} />
          <Route path='/get-book' element={<ListBook />} />
          <Route path="/books/:id" element={<BookDetailsWrapper />} />
          <Route path="/books/reviews" element={<ReviewsByTitle />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;
