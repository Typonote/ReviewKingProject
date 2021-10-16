import './index.scss';
import React from 'react';
import Marginer from '../../components/marginer';
import ReviewContent from './reviewContent';

export default function ReviewPage() {
  return (
    <div className="ServicePageContainer" name="servicePageContainer">
      <Marginer direction="vertical" margin="2rem" />

      <ReviewContent />
    </div>
  );
}
