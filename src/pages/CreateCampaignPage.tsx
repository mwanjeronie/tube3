// CreateCampaignPage.tsx
import React from 'react';
import { CSSProperties } from 'react';
import './css/createpage.css';
// import { TextField, Button } from '@mui/material';
import Clipboard from './Clipboard';

const FormStyle: CSSProperties = {
  // display: 'flex',
  // flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px',
  margin: '20px auto',
  // width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  marginBottom: '30px',
};

const CreateCampaignPage: React.FC = () => {
  return (
    <div>
      <h3 className="create-campaign-title">Create Campaign</h3>
      <form style={FormStyle}>
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="videoUrl" className="form-label">YouTube Video URL:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              className="form-input"
              required
              placeholder="Paste your URL here"
              style={{
                paddingRight: '50px',
                width: '100%',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc', 
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}
            />
            <button
              type="button"
              style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '5px',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              border: 'none',
              }}
              onClick={() => {
              navigator.clipboard.readText().then((text) => {
                (document.getElementById('videoUrl') as HTMLInputElement).value = text;
              });
              }}
            >
              <Clipboard size={18} color="#000000" />
            </button>
          </div>
        </div>
        <div className="form-group" style={{ position: 'relative', marginTop: '20px' }}>
          <label htmlFor="views" className="form-label" style={{ marginBottom: '10px', fontSize: '1.2em' }}>Number of Views:</label>
          <div className="radio-group" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <label style={{ margin: '5px', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
              <input type="radio" name="views" value="100" required />
              100
            </label>
            <label style={{ margin: '5px', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
              <input type="radio" name="views" value="500" required />
              500
            </label>
            <label style={{ margin: '5px', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
              <input type="radio" name="views" value="1000" required />
              1000
            </label>
            <label style={{ margin: '5px', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
              <input type="radio" name="views" value="2000" required />
              2000
            </label>
            <label style={{ margin: '5px', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
              <input type="radio" name="views" value="5000" required />
              5000
            </label>
            <label style={{ margin: '5px', fontSize: '1em', display: 'flex', alignItems: 'center' }}>
              <input type="radio" name="views" value="10000" required />
              10000
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='submit-button'
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1.2em',
            color: 'rgba(113, 61, 146, 1)',
            backgroundColor: '#fbb251',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0a800')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fbb251')}
        >
          Create Campaign
        </button>
      </form>   
    </div>  
);
};

export default CreateCampaignPage;