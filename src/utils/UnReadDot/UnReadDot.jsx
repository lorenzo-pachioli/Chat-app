import React from 'react';
import './UnReadDot.css';

export default function UnReadDot({ unReadNumber }) {

  return <span className='unReadDot' style={{ display: unReadNumber === 0 ? 'none' : 'flex' }}>{unReadNumber}</span>
}
