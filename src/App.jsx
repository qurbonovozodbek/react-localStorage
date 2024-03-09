import { Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Layout from './pages/layout'
import Savat from './pages/savat'

function App() {

  return (
   <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/savat" element={<Savat />} />
        </Route>
      </Routes>
   </>
  )
}

export default App
