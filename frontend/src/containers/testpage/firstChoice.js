import './firstChoice.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Marginer from '../../components/marginer';
// import TastesCategory from '../../const/tastesCategory';

export default function FirstChoice() {
  const [firstChoice, setFirstChoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollToServiceSection = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  // API로 부터 서브 카테고리 받아옴
  const GetSubcategoryAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setFirstChoice(null);
    setLoading(true);
    const CategoryResponse = await axios
      .get(`http://3.139.100.234:5000/what-to-eat`)
      .then(response => {
        setFirstChoice(response.data.subcategory);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return CategoryResponse;
  };

  console.log('firstchoice', firstChoice);

  useEffect(() => {
    GetSubcategoryAPI();
  }, []);

  if (loading)
    return (
      <div className="notice-container">
        <div className="loader" />
        <Marginer direction="vertical" margin="2rem" />
        <div className="notice">잠시만 기다려 주세요!</div>
      </div>
    );
  if (error) return <div className="notice-error">에러가 발생했습니다</div>;
  if (!firstChoice) return null;

  return (
    <div className="CategoryContainer">
      <Marginer direction="vertical" margin="3rem" />
      <h2 className="TitleText"> 오늘 뭐 먹지?</h2>
      <Marginer direction="vertical" margin="3rem" />

      <h2>오늘 어떤 음식이 먹고 싶으신가요?</h2>
      <Marginer direction="vertical" margin="1rem" />
      <div className="orderText">
        &nbsp;먹고 싶은 메뉴 하나를 선택해 주세요!
      </div>
      <Marginer direction="vertical" margin="4rem" />

      <div className="choiceContainer">
        {firstChoice.map(subctr => (
          <Link
            to={`/what-to-eat/category/${subctr}`}
            onClick={scrollToServiceSection}
          >
            <button type="button" className="menuCategory">
              {subctr}
            </button>
          </Link>
        ))}
      </div>
      <Marginer direction="vertical" margin="3rem" />
    </div>
  );
}
