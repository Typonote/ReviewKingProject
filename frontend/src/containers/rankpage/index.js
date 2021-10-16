import './index.scss';
import React from 'react';
import Marginer from '../../components/marginer';
import RankContent from './rankContent';

export default function RankPage() {
  return (
    <div className="ServicePageContainer" name="servicePageContainer">
      <Marginer direction="vertical" margin="2rem" />

      <RankContent />
    </div>
  );
}
