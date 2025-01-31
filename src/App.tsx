import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BottomNav from './components/bottomnav';
import Header from './components/headernav';
import TabsNav from './components/tabsnav';
import Home from './pages/home';
import Following from './feedtabs/following';
import Explore from './pages/explore';

function App() {
  return (
    
      <div className="app-container">
        <Header />
        <div className="content">
          <Home />
        </div>
        <BottomNav />
      </div>
    
  );
}

export default App;
