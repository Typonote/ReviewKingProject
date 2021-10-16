import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './index.scss';

export default function DownArrow() {
  return (
    <div className="ArrowContainer">
      <div className="ArrowIcon">
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </div>
  );
}
