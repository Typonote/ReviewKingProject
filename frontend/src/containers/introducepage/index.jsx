import React from 'react';
import Marginer from '../../components/marginer';
import IntroduceContent from './introduceContent';

import './index.scss';

export default function IntroducePage() {
  return (
    <div className="ServicePageContainer" name="servicePageContainer">
      <Marginer direction="vertical" margin="2rem" />

      <IntroduceContent />
    </div>
  );
}
