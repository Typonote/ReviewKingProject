import React from 'react';
import { Link } from 'react-router-dom';
// import BeemaLogo from '../../assets/logo/logo_croped.png';
import Button from '../button';
import Marginer from '../marginer';
import KingLogo from '../../assets/logo/reviewking.png';
import './index.scss';

export default function Navbar() {
  const scrollToServiceSection = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="NavbarContainer">
      <Link to="/" className="BrandContainer">
        <img src={KingLogo} alt="logo" />
        <span>리뷰왕</span>
      </Link>

      <div className="AccessibilityContainer">
        <Button onClick={scrollToServiceSection}>오늘 뭐먹지?</Button>
        <Marginer direction="horizontal" margin="8px" />
        <button type="button" className="LoginButton">
          로그인 (보류)
        </button>
      </div>
    </div>
  );
}
