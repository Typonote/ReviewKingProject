import React from 'react';
// import BeemaLogo from '../../assets/logo/logo_croped.png';
import { Link } from 'react-router-dom';

import KingLogo from '../../assets/logo/reviewking.png';
import './index.scss';

export default function Logo() {
  const scrollToServiceSection = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
      <div className="LogoContainer">
        <img src={KingLogo} alt="logo" />
        <Link to='/' onClick={scrollToServiceSection}>
          <div className="LogoText">리뷰왕</div>
        </Link>    
      </div>
  );
}
