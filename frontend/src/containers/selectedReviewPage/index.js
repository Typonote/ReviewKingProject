import './index.scss';
import React from 'react';
import Marginer from '../../components/marginer';
import ReviewResult from './reviewResult';

export default function SelectedReviewPage() {
  return (
    <div className="ServicePageContainer" name="servicePageContainer">
      <Marginer direction="vertical" margin="2rem" />

      <ReviewResult />
    </div>
  );
}
