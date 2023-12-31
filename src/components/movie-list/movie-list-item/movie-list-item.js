/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import './movie-list-item.css';
import { Rate } from 'antd';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import classNames from 'classnames';

import { AppContext } from '../../../App';

export const MovieListItem = (props) => {
  const { movieId, isRated, imgSrc, title, date, genreIds, genresObj, getText, voteAverage, movieRatedArr } = props;
  const { rateFilm } = useContext(AppContext);
  const [movieIsRated, setMovieIsRated] = useState(false);
  const [prevClickedStar, setPrevClickedStar] = useState(null);

  let rating;
  movieRatedArr.forEach((ratedMovie) => {
    if (ratedMovie.id === movieId) {
      rating = ratedMovie.rating;
    }
  });

  let visibleReleaseDate;

  if (date.length === 0) {
    visibleReleaseDate = '';
  }
  if (date.length > 0) {
    const releaseDate = new Date(date);
    const MonthFullname = format(releaseDate, 'MMMM');
    visibleReleaseDate = `${MonthFullname} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`;
  }

  let defaultValue = 0;

  if (rating) {
    defaultValue = rating;
  }

  const checkStarsClick = (value) => {
    if (value === 0 || movieIsRated) {
      setMovieIsRated(false);
      rateFilm(movieId, 'DELETE', value);
    }
    if (isRated) {
      setMovieIsRated(true);
    } else if (value !== 0 && value !== rating && value.target !== prevClickedStar) {
      setMovieIsRated(true);
      rateFilm(movieId, 'POST', value);
    }
    setPrevClickedStar(() => value.target);
  };

  const ratingClasses = classNames('list-item__vote-average', {
    'low-color': voteAverage < 3,
    'below-middle-color': voteAverage >= 3 && voteAverage < 5,
    'above-middle-color': voteAverage >= 5 && voteAverage < 7,
    'high-color': voteAverage >= 7,
  });

  const createGenres = () => {
    return genreIds.map((genreId) => (
      <button key={genreId} className="genre-btn">
        {genresObj[genreId]}
      </button>
    ));
  };
  return (
    <div className="list-item">
      <div className="list-item__img-box">
        <img
          className="list-item__img"
          src={imgSrc}
          alt="poster"
          onError={(e) => (e.target.src = '/no-poster.jpg')}
        ></img>
      </div>
      <div className="list-item__content">
        <h4 className="list-item__title">{title}</h4>
        <div className={ratingClasses}>{voteAverage}</div>
        <span className="list-item__date">{visibleReleaseDate}</span>
        <div className="list-item__genres">{createGenres(genreIds)}</div>
        <p className="list-item__text">{getText()}</p>
        <Rate
          allowHalf
          defaultValue={defaultValue}
          count={10}
          onChange={(value) => {
            checkStarsClick(value);
          }}
        />
      </div>
    </div>
  );
};
