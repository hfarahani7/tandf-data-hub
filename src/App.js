import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AthleteTable from './Components/AthleteTable.js';
import TeamTable from './Components/TeamTable.js';
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
        <Route exact path='/team' element={<TeamTable/>} />
      </Routes>
    </Router>
  )
}

export default App;
