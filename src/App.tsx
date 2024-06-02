import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRouter from './components/AppRouter'

function App() {
 
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        {/* <Header /> */}
        <AppRouter />
        {/* <Footer /> */}
      </div>
      <ToastContainer pauseOnFocusLoss />
    </BrowserRouter>
  )
}

export default App
