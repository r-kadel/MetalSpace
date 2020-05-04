import React from 'react';
import './Error.css';

export default function Error({ className, ...props }) {
  return (
    <span className={['Error', className].join(' ')} {...props}>
      {props.message}
    </span>
  );
}