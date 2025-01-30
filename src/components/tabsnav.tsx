import React, { useState, CSSProperties } from 'react';
import Home from '../feedtabs/home';
import Following from '../feedtabs/following';
import Explore from '../feedtabs/explore';

interface Pages {
  home: boolean;
  following: boolean;
  explore: boolean;
}

const headerStyle: CSSProperties = {
  padding: 8,
  backgroundColor: 'transparent',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  position: 'fixed',
  top: 50,
  left: 0,
  zIndex: 1000,
};

export default function TabsNav() {
  const [pages, setPages] = useState<Pages>({
    home: true,
    following: false,
    explore: false,
  });

  const handleItemClick = (pageName: string) => {
    switch (pageName) {
      case 'home':
        setPages({ home: true, following: false, explore: false });
        break;
      case 'following':
        setPages({ home: false, following: true, explore: false });
        break;
      case 'explore':
        setPages({ home: false, following: false, explore: true });
        break;
    }
  };

  return (
    <div style={headerStyle}>
      <ul
        style={{
          listStyleType: 'none',
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          margin: 0,
          width: '100%',
        }}
      >
        <li
          style={{
        margin: '0 10px',
        color: 'white',
        textShadow: '0 0 5px black',
        cursor: 'pointer',
          }}
          onClick={() => handleItemClick('home')}
        >
          Home
        </li>
        <li
          style={{
        margin: '0 10px',
        color: 'white',
        textShadow: '0 0 5px black',
        cursor: 'pointer',
          }}
          onClick={() => handleItemClick('following')}
        >
          Following
        </li>
        <li
          style={{
        margin: '0 10px',
        color: 'white',
        textShadow: '0 0 5px black',
        cursor: 'pointer',
          }}
          onClick={() => handleItemClick('explore')}
        >
          Explore
        </li>
      </ul>

      {pages.home && <Home />}
      {pages.following && <Following />}
      {pages.explore && <Explore />}
    </div>
  );
}
