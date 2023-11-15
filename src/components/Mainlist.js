import React from 'react';

export default function Mainlist(props) {
  const Addfav = props.Addfav;

  return (
    <>
      <div className="sub-heading">{props.heading}</div>
      <div className='movies-container'>
        {props.movies && props.movies.map((movie, index) => (
          <div className='image-container' key={index}>
            <img className='movie-poster' src={movie.Poster} alt="movie" />
            <div className="overlay" onClick={() => props.setfav(movie)}> <Addfav /> </div>
          </div>
        ))}
      </div>
    </>
  );
}
