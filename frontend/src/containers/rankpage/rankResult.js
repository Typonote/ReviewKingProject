import './rankResult.scss';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Marginer from '../../components/marginer';
import Map from '../../components/map/map';

export default function RankResult() {
  const [rankResult, setRankResult] = useState([]);
  const [nameValue, setNameValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { category } = useParams();

  // API로 부터 상위 3개 식당 정보 받아옴 (이미지 url, 평점, 메뉴, 이름, 순위) => key: category_id
  const GetTopThreeAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setRankResult(null);
    setLoading(true);
    const TopThreeResponse = await axios
      .get(`http://3.139.100.234:5000/ranks/${category}`)
      .then(response => {
        setRankResult(response.data.result);
        setNameValue(response.data.category);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return TopThreeResponse;
  };

  useEffect(() => {
    GetTopThreeAPI();
  }, []);

  console.log(rankResult);
  console.log(nameValue);

  if (loading)
    return (
      <div className="notice-container">
        <div className="loader" />
        <Marginer direction="vertical" margin="2rem" />
        <div className="notice">잠시만 기다려 주세요!</div>
      </div>
    );
  if (error) return <div className="notice-error ">에러가 발생했습니다</div>;
  if (!rankResult) return null;

  return (
    <div className="ResultContainer">
      <Marginer direction="vertical" margin="2rem" />
      <div className="Chosen">
        <h1 style={{ display: 'flex' }}>
          <div>{nameValue}</div>를(을) 선택하셨습니다.
        </h1>
        <h1>다음과 같은 음식점을 추천합니다.</h1>
      </div>

      <Link to="/rank/">
        <div className="button-re">다시 선택하기</div>
      </Link>
      <Marginer direction="vertical" margin="4rem" />

      <div className="RankResultContainer">
        {rankResult.map(option => (
          <Link to={`/reviews/${option.restaurant_id}`}>
            <div className="restaurantsChoice">
              <div className="top">
                <img className="rankImage" alt="" src={option.img_url} />
              </div>
              <div className="down">
                <span>{option.name}</span>
                <h3>순위 {option.rank}</h3>
                <div className="ratingContainer">
                  <h3>
                    종합 평점 :&nbsp;
                    <span style={{ color: '#2496ed' }}>
                      {option.integrated_rating}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Marginer direction="vertical" margin="1rem" />

      <Marginer direction="vertical" margin="4rem" />
      <Map data={rankResult} />
      <Marginer direction="vertical" margin="4rem" />
    </div>
  );
}
