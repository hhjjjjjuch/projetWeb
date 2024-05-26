import React from 'react';
import LogoImage from './blog12.png'; // Adjust the path to your logo image

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src={LogoImage} alt="Logo" style={{ width: width }} />
    </div>
  );
}

export default Logo;
