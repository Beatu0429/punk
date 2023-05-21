import BeerList from './Components/BeerList'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BeerList />}/>
      </Routes>
    </Router>
  )
}

export default App
