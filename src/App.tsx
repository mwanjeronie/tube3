import React from 'react';
// import './App.css';
import BottomNav from './components/bottomnav';
import Header from './components/headernav';

function App() {
  return (
    <div className="app-container">
      <Header user={null} onSignIn={() => {}} onSignOut={() => {}} />
      <div className="content">
        {/* <h1>Welcome to the App</h1>
        <p>This is the main content area.</p> */}
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
