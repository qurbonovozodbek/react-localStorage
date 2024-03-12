import { Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Layout from './pages/layout'
import Savat from './pages/savat'
import Pagetwo from './pages/page/pagetwo'
import PageThree from './pages/page/pageThree'

function App() {

  return (
   <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/savat" element={<Savat />} />
          <Route path="/pagetwo" element={<Pagetwo />} />
          <Route path="/pageThree" element={<PageThree />} />
        </Route>
      </Routes>
   </>
  )
}

export default App
