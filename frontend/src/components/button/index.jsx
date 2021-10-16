import React from 'react';
import './index.scss';

export default function Button(props) {
  return (
    <div className="ButtonWrapper" {...props}>
      {props.children}
    </div>
  );
}
