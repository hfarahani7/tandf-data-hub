import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AthleteTable from './Components/AthleteTable.js';
import Landing from './Components/Landing.js';
import Header from './Components/Header.js';
import HeaderStatic from './Components/HeaderStatic.js';

function App() {
  return (
    <Router>
      <Header />
      <HeaderStatic />
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/athlete' element={<AthleteTable/>} />
      </Routes>
    </Router>
  )
}

export default App;
