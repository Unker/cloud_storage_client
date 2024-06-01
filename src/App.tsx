import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Example from './components/Temp'

function App() {
 
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        {/* <Header />
        <AppRouter />
        <Footer /> */}
        <Example />
      </div>
      <ToastContainer pauseOnFocusLoss />
    </BrowserRouter>
  )
}

export default App
