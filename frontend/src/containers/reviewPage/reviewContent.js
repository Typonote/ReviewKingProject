import './reviewContent.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Marginer from '../../components/marginer';
import SearchBar from '../../components/searchBar/searchBar';
import Map from '../../components/map/map';

export default function ReviewContent() {
  const [reviewContent, setReviewContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API로 부터 선릉역 주변 식당 정보 받아옴 (category, img, lat, lng, name)
  const GetRestaurantsInfoAPI = async () => {
    setError(null);
    setReviewContent(null);
    setLoading(true);
    const RestaurantsResponse = await axios
      .get(`http://3.139.100.234:5000/reviews`)
      .then(response => {
        setReviewContent(response.data.restaurants);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return RestaurantsResponse;
  };

  useEffect(() => {
    GetRestaurantsInfoAPI();
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
  if (!reviewContent) return null;

  return (
    <div className="ReviewContainer">
      <Marginer direction="vertical" margin="3rem" />
      <h2 className="TitleText">음식점 리뷰</h2>

      <Marginer direction="vertical" margin="2rem" />

      <div className="ReviewIntroContainer">
        <h3 className="topText">
          리뷰를 알고 싶은 음식점의 상호명을 입력해주세요.
        </h3>

        <Marginer direction="vertical" margin="2rem" />

        <SearchBar data={reviewContent} />

        <Marginer direction="vertical" margin="4rem" />

        <Map data={reviewContent} />

        <Marginer direction="vertical" margin="2rem" />

        <h3 className="downText">
          리뷰왕은 선릉역 근처에 위치한 음식점의 대한 정보를 제공합니다.
        </h3>

        <Marginer direction="vertical" margin="3rem" />
      </div>
    </div>
  );
}

// TODO. 로컬에서 MAP 정상작동 하였으나, 마커가 뜨지 않음 => 해결해야함
