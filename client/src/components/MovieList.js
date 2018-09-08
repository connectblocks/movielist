import React from 'react';
import MovieListEntry from './MovieListEntry';

const MovieList = ({apiMovieList, ownMovieList}) => {
  const movieView = apiMovieList.slice(0, 10).map((item) => {
    const isOnMyList = ownMovieList.indexOf(item.id.toString()) < 0 ? "No" : "Yes";
    return <MovieListEntry item={item} key={item.id} own={isOnMyList}/>
  })
  return (
    <div>{movieView}</div>
  )
}

export default MovieList; 