import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ResetPassword from './components/ResetPassword'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
