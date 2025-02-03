import React, { useState, CSSProperties } from 'react';
import { FaWallet, FaPlus, FaUser, FaHome, FaCompass } from 'react-icons/fa';
import WalletPage from '../pages/WalletPage';
import CreateCampaignPage from '../pages/CreateCampaignPage';
import UserProfilePage from '../pages/UserProfilePage';
import Home from '../pages/home';
import Explore from '../pages/explore';

interface Pages {
  wallet: boolean;
  createCampaign: boolean;
  userProfile: boolean;
  home: boolean;
  explore: boolean;
}

const navStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: 'rgba(113, 61, 146, 1)',
  padding: '10px 0',
  boxShadow: '0 2px 5px rgb#fbb251',
};

const iconStyle: CSSProperties = {
  border: '0.01px solid white',
  borderRadius: '10px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#fbb251', // Changed to white
  transition: 'color 0.3s ease',
  flexDirection: 'column',
};

// const iconContainerStyle: CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// };

// const iconHoverStyle: CSSProperties = {
//   color: 'yellow',
// };

const labelStyle: CSSProperties = {
  fontSize: '12px',
  marginTop: '4px',
};

const BottomNav: React.FC = () => {
  const [pages, setPages] = useState<Pages>({
    wallet: false,
    createCampaign: false,
    userProfile: false,
    home: true, // Home is the default page
    explore: false,
  });

  const handleIconClick = (pageName: string) => {
    switch (pageName) {
      case 'wallet':
        setPages({ wallet: true, createCampaign: false, userProfile: false, home: false, explore: false });
        break;
      case 'create-campaign':
        setPages({ wallet: false, createCampaign: true, userProfile: false, home: false, explore: false });
        break;
      case 'user-profile':
        setPages({ wallet: false, createCampaign: false, userProfile: true, home: false, explore: false });
        break;
      case 'home':
        setPages({ wallet: false, createCampaign: false, userProfile: false, home: true, explore: false });
        break;
      case 'explore':
        setPages({ wallet: false, createCampaign: false, userProfile: false, home: false, explore: true });
        break;
    }
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={iconStyle} onClick={() => handleIconClick('home')}>
          <FaHome />
          <span style={labelStyle}>Home</span>
        </div>
        <div style={iconStyle} onClick={() => handleIconClick('explore')}>
          <FaCompass />
          <span style={labelStyle}>Explore</span>
        </div>
        <div style={iconStyle} onClick={() => handleIconClick('create-campaign')}>
          <FaPlus />
          <span style={labelStyle}>Create</span>
        </div>
        <div style={iconStyle} onClick={() => handleIconClick('wallet')}>
          <FaWallet />
          <span style={labelStyle}>Wallet</span>
        </div>
        <div style={iconStyle} onClick={() => handleIconClick('user-profile')}>
          <FaUser />
          <span style={labelStyle}>Profile</span>
        </div>
      </nav>

      {pages.wallet && <WalletPage />}
      {pages.createCampaign && <CreateCampaignPage />}
      {pages.userProfile && <UserProfilePage />}
      {pages.home && <Home />}
      {pages.explore && <Explore />}
    </>
  );
};

export default BottomNav;