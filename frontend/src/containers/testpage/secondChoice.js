/* eslint-disable jsx-a11y/label-has-associated-control */
import './secondChoice.scss';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Marginer from '../../components/marginer';
import { actionSetKey } from '../../redux/action';

export default function SecondChoice() {
  const { subctr } = useParams();
  const [secondChoice, setSecondChoice] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [checkedItems, setCheckedItems] = useState([]);
  const [numItems, setNumItems] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  // API로 부터 키워드를 받아옴
  const GetKeywordAPI = async () => {
    // 요청이 시작 할 때 초기화

    setCheckedItems(null);
    setNumItems(null);
    setDisabled(true);
    setError(null);
    setSecondChoice(null);
    setLoading(true);
    const CategoryResponse = await axios
      .get(`http://3.139.100.234:5000/what-to-eat/${subctr}`)
      .then(response => {
        setSecondChoice(response.data.keywords);
        setSubCategory(response.data.subcategory);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return CategoryResponse;
  };

  const scrollToServiceSection = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  // 체크박스 누를 때마다 상태관리
  const ChekedNumClickHandler = () => {
    // 선택된 목록 가져오기
    const query = 'input[name="keyword"]:checked';
    const selectedEls = document.querySelectorAll(query);

    // 선택한 목록의 갯수 출력
    const count = new Set();
    selectedEls.forEach(el => {
      count.add(el.value);
    });
    const a = count.size;

    if (a === 0) {
      setDisabled(true);
      setNumItems(a);
    } else if (a <= 5) {
      setDisabled(false);
      setNumItems(a);
    } else {
      setDisabled(true);
      setNumItems(a);
    }
  };

  // test 버튼 누를 때, 상태관리
  const ChekedValueClickHandler = () => {
    // 선택된 목록 가져오기
    const query = 'input[name="keyword"]:checked';
    const selectedEls = document.querySelectorAll(query);

    // 선택한 목록 출력 => 공백으로 나눠서 arr이라는 배열에 추가
    let result = '';
    selectedEls.forEach(el => {
      result += `${el.value} `;
      const arr = result.trim().split(' ');
      setCheckedItems(arr);
      dispatch(actionSetKey(arr));
    });

    // 선택한 목록의 갯수 출력
    const count = new Set();
    selectedEls.forEach(el => {
      count.add(el.value);
    });
    const a = count.size;
    setNumItems(a);

    if (disabled === true) {
      toast.warn('1개 이상, 5개 미만으로 선택해주세요', {
        className: 'custom-toast',
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      });
    }

    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    GetKeywordAPI();
    ChekedNumClickHandler();
  }, []);

  console.log('checkedItems', checkedItems);
  console.log('numItems', numItems);
  console.log('disabled', disabled);

  if (loading)
    return (
      <div className="notice-container">
        <div className="loader" />
        <Marginer direction="vertical" margin="2rem" />
        <div className="notice">잠시만 기다려 주세요!</div>
      </div>
    );
  if (error) return <div className="notice-error">에러가 발생했습니다</div>;
  if (!secondChoice) return null;

  console.log(secondChoice);
  return (
    <div className="CategoryContainer">
      <Marginer direction="vertical" margin="3rem" />
      <h2 className="TitleText"> 오늘 뭐먹지?</h2>
      <Marginer direction="vertical" margin="2rem" />

      <h2>"{subCategory}"에 대한 리뷰에 많이 언급된 키워드들입니다.</h2>
      <Marginer direction="vertical" margin="1rem" />
      <div className="orderText">
        &nbsp;최소 1개 이상, 5개 미만으로 키워드를 선택해 주세요
      </div>

      <Marginer direction="vertical" margin="2rem" />

      <div className="SecondChoiceContainer">
        {secondChoice.map(keyword => (
          <div className="choiceBox">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="keyword"
                value={keyword}
                onChange={ChekedNumClickHandler}
              />
              <div className="icon-box">
                <span>{keyword}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
      <Marginer direction="vertical" margin="4rem" />
      <div className="buttonContainer">
        <Link to="/what-to-eat/category/" onClick={scrollToServiceSection}>
          <div className="button-prev">이전</div>
        </Link>
        <Marginer direction="horizontal" margin="3rem" />
        <Link
          to={
            disabled
              ? `/what-to-eat/category/${subctr}`
              : `/what-to-eat/category/${subctr}/result`
          }
        >
          <button
            type="button"
            className="button-next"
            onClick={ChekedValueClickHandler}
          >
            결과 확인
          </button>
        </Link>
      </div>
      <Marginer direction="vertical" margin="2rem" />
    </div>
  );
}
