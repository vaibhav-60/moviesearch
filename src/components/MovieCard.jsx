import React from 'react'

const MovieCard = ({movie : {title, vote_average, poster_path, release_date, original_language}}) => {
  return (
    <div className="movie-card">
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/No-poster.png`}
        alt={title}
        />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'>
                <img className='' src='./star.svg' />
                <p className='color-white'>{vote_average}</p>
                </div>
            <span>.</span>
            <p className='lang'>{original_language}</p>
            <p className='year'>
                {release_date ? release_date.split('-')[0] : NaN}
            </p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard
