import './error.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Marginer from '../../components/marginer';
import errorpageImage from '../../assets/pictures/pagenotfound.jpg';

export default function Error() {
  return (
    <div className="ErrorContainer">
      <Marginer direction="vertical" margin="5rem" />
      <div className="errorText">404</div>

      <Marginer direction="vertical" margin="1rem" />
      <div className="errorText">페이지를 찾을 수 없습니다.</div>

      <Link className="button-home" to="/reviews">
        <div className="goTohome" type="button">
          홈으로
        </div>
      </Link>

      <img src={errorpageImage} className="errorImage" alt="not found" />
      <Marginer direction="vertical" margin="5rem" />
    </div>
  );
}
