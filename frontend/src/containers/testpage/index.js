import './index.scss';
import React from 'react';
import Marginer from '../../components/marginer';
import FirstChoice from './firstChoice';

export default function TestPage() {
  return (
    <div className="ServicePageContainer" name="servicePageContainer">
      <Marginer direction="vertical" margin="2rem" />

      <FirstChoice />
    </div>
  );
}
