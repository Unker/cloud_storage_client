import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRouter from './components/AppRouter'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCsrfToken } from './store/slices/authSlice';
import { AppDispatch } from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCsrfToken());
  }, [dispatch]);
 
  return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRouter />
        {/* <Footer /> */}
      </div>
      <ToastContainer pauseOnFocusLoss />
    </BrowserRouter>
  )
}

export default App;
