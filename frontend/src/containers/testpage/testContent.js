/* eslint-disable jsx-a11y/alt-text */
import './testContent.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Marginer from '../../components/marginer';

export default function TestContent() {
  return (
    <div className="TestContainer">
      <Marginer direction="vertical" margin="3rem" />
      <h2 className="TitleText"> 오늘 뭐먹지?</h2>
      <Marginer direction="vertical" margin="2rem" />

      <h3 className="bodyText">
        오늘 뭐먹지?는 사용자가 선택한 내용을 바탕으로 음식을 추천해주는
        테스트입니다.
      </h3>

      <Marginer direction="vertical" margin="2rem" />
      <object
        type="image/svg+xml"
        data="/static/media/-naver.2e6b221b.svg"
        className="svg"
        style={{ width: '70%' }}
      />
      <Marginer direction="vertical" margin="2rem" />

      <Link to="/what-to-eat/category/">
        <button type="button" className="button-start">
          테스트 시작
        </button>
      </Link>
      <Marginer direction="vertical" margin="2rem" />
    </div>
  );
}
