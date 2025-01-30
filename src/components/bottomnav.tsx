// BottomNav.tsx
import React, { useState } from 'react';
import { FaWallet, FaPlus, FaUser } from 'react-icons/fa';
import WalletPage from '../pages/WalletPage';
import CreateCampaignPage from '../pages/CreateCampaignPage';
import UserProfilePage from '../pages/UserProfilePage';

const navStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: 'rgba(113, 61, 146, 1)',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px 0',
  zIndex: 1000,
};

const iconStyle: React.CSSProperties = {
  color: '#fbb251',
  fontSize: '24px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s, color 0.2s, box-shadow 0.2s',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  padding: '10px',
  borderRadius: '8px',
};

const iconHoverStyle: React.CSSProperties = {
  transform: 'scale(1.2)',
  color: '#ffffff',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  marginTop: '4px',
};

interface Pages {
  wallet: boolean;
  createCampaign: boolean;
  userProfile: boolean;
}

const BottomNav: React.FC = () => {
  const [pages, setPages] = useState<Pages>({
    wallet: false,
    createCampaign: false,
    userProfile: false,
  });

  const handleIconClick = (pageName: string) => {
    switch (pageName) {
      case 'wallet':
        setPages({
          wallet: true,
          createCampaign: false,
          userProfile: false,
        });
        break;
      case 'create-campaign':
        setPages({
          wallet: false,
          createCampaign: true,
          userProfile: false,
        });
        break;
      case 'user-profile':
        setPages({
          wallet: false,
          createCampaign: false,
          userProfile: true,
        });
        break;
    }
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={iconStyle} onClick={() => handleIconClick('wallet')}>
          <FaWallet />
          <span style={labelStyle}>Wallet</span>
        </div>
        <div style={iconStyle} onClick={() => handleIconClick('create-campaign')}>
          <FaPlus />
          <span style={labelStyle}>Create</span>
        </div>
        <div style={iconStyle} onClick={() => handleIconClick('user-profile')}>
          <FaUser />
          <span style={labelStyle}>Profile</span>
        </div>
      </nav>

      {pages.wallet && <WalletPage />}
      {pages.createCampaign && <CreateCampaignPage />}
      {pages.userProfile && <UserProfilePage />}
    </>
  );
};

export default BottomNav;