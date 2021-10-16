import './rankContent.scss';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Marginer from '../../components/marginer';

export default function RankContent() {
  const [rankContent, setRankContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API로 부터 카테고리 정보 & 이미지를 받아옴(id: 36~70)
  const GetCategoryAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setRankContent(null);
    setLoading(true);
    const CategoryResponse = await axios
      .get(`http://3.139.100.234:5000/ranks`)
      .then(response => {
        setRankContent(response.data.categories);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return CategoryResponse;
  };

  useEffect(() => {
    GetCategoryAPI();
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
  if (!rankContent) return null;

  return (
    <div className="RankContainer">
      <Marginer direction="vertical" margin="3rem" />
      <h2 className="TitleText"> 업종별 순위</h2>
      <Marginer direction="vertical" margin="4rem" />

      <div className="choiceRankContainer">
        {rankContent.map(option => (
          <Link to={`/rank/result/${option.category_id}`}>
            <button type="button" className="menuCategory">
              {option.category}
            </button>
          </Link>
        ))}
      </div>

      <Marginer direction="vertical" margin="8rem" />
    </div>
  );
}
