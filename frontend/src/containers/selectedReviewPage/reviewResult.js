/* eslint-disable jsx-a11y/alt-text */
import './reviewResult.scss';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Marginer from '../../components/marginer';
import Map from '../../components/map/map';
import WordCloudTabs from '../../components/wordcloudTab/Tabs';

export default function ReviewResult() {
  const [reviewResult, setReviewResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // API로 부터 선릉역 주변 식당 정보 받아옴 (category, img, lat, lng, name)

  const GetSelectedInfoAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setReviewResult(null);
    setLoading(true);
    const SelectedResponse = await axios
      .get(`http://3.139.100.234:5000/reviews/${id}`)
      .then(response => {
        setReviewResult(response.data.restaurant);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return SelectedResponse;
  };

  useEffect(() => {
    GetSelectedInfoAPI();
  }, []);

  if (loading)
    return (
      <div className="notice-container">
        <div className="loader" />
        <Marginer direction="vertical" margin="2rem" />
        <div className="notice">잠시만 기다려 주세요!</div>
      </div>
    );
  if (error) return <div className="notice-error ">에러가 발생했습니다</div>;
  if (!reviewResult) return null;

  console.log(reviewResult);

  return (
    <div className="ReviewResultContainer">
      <Marginer direction="vertical" margin="3rem" />
      <h2 className="TitleText"> 음식점 리뷰 결과 </h2>

      <Marginer direction="vertical" margin="1rem" />

      <div className="ReviewResultIntroContainer">
        <Marginer direction="vertical" margin="2rem" />
        <div className="ReviewNameContainer">
          <h2 className="SelectedText">{reviewResult.name}</h2>
          <h2 className="NumberText" style={{ color: '#0b214a' }}>
            종합평점 : {reviewResult.integrated_rating}
          </h2>
        </div>
        <Marginer direction="vertical" margin="2rem" />

        <div className="buttonContainer">
          <Link to="/reviews">
            <button type="button" className="button-re">
              다른 음식점 검색하기
            </button>
          </Link>
        </div>
        <Marginer direction="vertical" margin="2rem" />

        <WordCloudTabs data={reviewResult} />

        <Marginer direction="vertical" margin="2rem" />
        <h3 className="bodyText">
          리뷰왕은 검색하신 음식점에 대한 정보를 크롤링하여 사용자에게
          워드클라우드 형태로 제공합니다.
        </h3>

        <Marginer direction="vertical" margin="4rem" />
        <Map data={[reviewResult]} />
        <Marginer direction="vertical" margin="2rem" />

        <h3 className="bodyText">
          지도를 움직여 해당 음식점의 위치를 확인해보세요.
        </h3>
        <Marginer direction="vertical" margin="6rem" />
      </div>
    </div>
  );
}

// TODO. 로컬에서 MAP 정상작동 하였으나, 현재 오류가 있어 주석처리 => 해결해야함
