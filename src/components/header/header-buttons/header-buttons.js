/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { useEffect, useState, useContext } from 'react';
import './header-buttons.css';

import { AppContext } from '../../../App';

export const HeaderButtons = () => {
  const { setIsRated } = useContext(AppContext);
  const [activeBtn, setActiveBtn] = useState('search');

  useEffect(() => {
    if (activeBtn === 'rated') {
      setIsRated(true);
    } else {
      setIsRated(false);
    }
  }, [activeBtn]);

  return (
    <div className="header__btns">
      <button
        className={activeBtn === 'search' ? 'search-btn active-btn' : 'search-btn'}
        onClick={() => {
          setActiveBtn('search');
        }}
      >
        Search
      </button>
      <button
        className={activeBtn === 'rated' ? 'rated-btn active-btn' : 'rated-btn'}
        onClick={() => {
          setActiveBtn('rated');
        }}
      >
        Rated
      </button>
    </div>
  );
};
