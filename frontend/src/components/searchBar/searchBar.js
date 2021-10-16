import React, { useEffect, useState } from 'react';
import './searchBar.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

export default function SearchBar(props) {
  const [filterData, setFilterData] = useState([]);
  const [clearWord, setClearWord] = useState('');

  // 검색 부분

  const FilterOnChangeHandler = e => {
    const searchWord = e.target.value;
    setClearWord(searchWord);
    const newFilter = props.data.filter(value => {
      return value.name.includes(searchWord);
    });
    setFilterData(newFilter);
  };

  const clearInput = () => {
    setFilterData([]);
    setClearWord('');
  };

  useEffect(() => {}, [props]);

  return (
    <div className="SearchContainer">
      <div className="searchInput">
        <input
          type="text"
          placeholder="음식점을 검색하세요!"
          value={clearWord}
          onChange={FilterOnChangeHandler}
        />
        <div className="searchIcon">
          {filterData.length !== 0 && (
            <CloseIcon className="clearBTN" onClick={clearInput} />
          )}
        </div>
      </div>
      {filterData.length !== 0 && (
        <div className="dataResult">
          {filterData.slice(0, 10).map(option => (
            <Link to={`/reviews/${option.id}`}>
              <div className="dataItem">{option.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
