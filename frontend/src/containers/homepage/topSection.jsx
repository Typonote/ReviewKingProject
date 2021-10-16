import React from 'react';
import './topSection.scss';

import { Link } from 'react-router-dom';
import Button from '../../components/button';
import DownArrow from '../../components/downArrow';
import Logo from '../../components/logo';

export default function TopSection() {
  const scrollToServiceSection = () => {
    window.scrollTo({
      to: '/reviews',
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div name="topSection">
      <div className="TopContainer">
        <div className="Background">
          <div className="CenterContainer">
            <Logo />
            <div className="IntroduceText">선릉역 주변 음식점의</div>
            <div className="IntroduceText">플랫폼별 리뷰를 분석합니다</div>
            <Link to="/reviews" onClick={scrollToServiceSection}>
              <Button>리뷰 비교하기</Button>
            </Link>
          </div>

          <div className="DownArrowContainer" onClick={scrollToServiceSection}>
            <DownArrow />
          </div>
        </div>
      </div>
    </div>
  );
}
