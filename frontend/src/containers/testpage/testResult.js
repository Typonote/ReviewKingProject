import './testResult.scss';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactElasticCarousel from 'react-elastic-carousel';
import Marginer from '../../components/marginer';

export default function TestResult() {
  const { subctr } = useParams();
  const [rankContent, setRankContent] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  const multikey = useSelector(state => state).keys;
  const url = multikey.map(a => `key=${a}&`).join('');
  const scrollToServiceSection = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  // API로 부터 카테고리 정보 & 이미지를 받아옴(id: 36~70)
  const GetRecomandAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setRankContent(null);
    setLoading(true);
    const CategoryResponse = await axios
      .get(`http://3.139.100.234:5000/what-to-eat/${subctr}/?${url}}`)
      .then(response => {
        setRankContent(response.data.result);
        setSubCategory(response.data.subcategory);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return CategoryResponse;
  };

  useEffect(() => {
    GetRecomandAPI();
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
    <div className="CategoryContainer">
      <Marginer direction="vertical" margin="6rem" />
      <h1>선택하신 "{subCategory}"의 키워드에 속한 음식점들입니다.</h1>
      <Marginer direction="vertical" margin="2rem" />
      <div className="orderText">
        &nbsp;음식점을 클릭해 더 자세한 리뷰를 확인해 보세요!
      </div>
      <Marginer direction="vertical" margin="6rem" />

      <ReactElasticCarousel breakPoints={breakPoints}>
        {rankContent.map(option => (
          <Link
            to={`/reviews/${option.restaurant_id}`}
            className="testLink"
            onClick={scrollToServiceSection}
          >
            <div
              className="restaurantsResultChoice bg-cover"
              style={{ backgroundImage: `url(${option.img_url})` }}
            >
              <span>{option.name}</span>
              <h3>
                종합 평점&nbsp;&nbsp;
                <span
                  style={{
                    color: '#f59e0b',
                    marginLeft: '1.5rem',
                  }}
                >
                  {option.integrated_rating}
                </span>
              </h3>
              <div className="testRatingContainer">
                <table>
                  {option.kakao ? (
                    <tr>
                      <td>
                        <h3>카카오</h3>
                      </td>
                      <td>
                        <h4>{option.kakao}</h4>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {option.mango ? (
                    <tr>
                      <td>
                        <h3>망고플레이트</h3>
                      </td>
                      <td>
                        <h4>{option.mango}</h4>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {option.naver ? (
                    <tr>
                      <td>
                        <h3>네이버</h3>
                      </td>
                      <td>
                        <h4>{option.naver}</h4>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {option.siksin ? (
                    <tr>
                      <td>
                        <h3>식신</h3>
                      </td>
                      <td>
                        <h4>{option.siksin}</h4>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                </table>
              </div>
            </div>
          </Link>
        ))}
      </ReactElasticCarousel>

      <Marginer direction="vertical" margin="5rem" />

      <div className="buttonContainer">
        <Link
          to={`/what-to-eat/category/${subctr}`}
          onClick={scrollToServiceSection}
        >
          <div className="button-prev">이전</div>
        </Link>
        <Marginer direction="horizontal" margin="3rem" />
        <Link to="/reviews">
          <button
            type="button"
            className="button-next"
            onClick={scrollToServiceSection}
          >
            리뷰 보러가기
          </button>
        </Link>
      </div>
      <Marginer direction="vertical" margin="2rem" />
    </div>
  );
}
