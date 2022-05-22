import React from "react";
import MovieItem from "./MovieItem";

function MovieGroup({movies, deleteMovie, whatToShow, updateMovies})
{
    return(
        <div className="movie-list-group">
            <h3>{whatToShow}</h3>
            <div className="movie-list-header">
                <div className="movie-title">Tytuł</div>
                <div className="movie-score">Ocena</div>
                <div className="movie-favourite">Ulubione</div>
            </div>
            {movies.map(movie => {
                if(movie.progress === whatToShow)
                {
                    return <MovieItem key={movie.id} movies={movies} details={movie} deleteMovie={deleteMovie} updateMovies={updateMovies}></MovieItem>
                }
            })}
        </div>
    )
}

export default MovieGroup;