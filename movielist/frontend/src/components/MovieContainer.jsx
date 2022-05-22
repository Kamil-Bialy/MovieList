import React from "react";
import MovieGroup from "./MovieGroup";

function MovieContainer({movies, deleteMovie, whatToShow, updateMovies})
{
    /********************************************************
    * nazwa funkcji: CheckForMovies
    *
    * parametry wejściowe: progress - kategoria filmów
    * wartość zwracana: true/false
    * opis funkcji: sprawdza, czy w liście filmów znajduje się chociaż jeden film z danej kategorii
    *
    * autor: Kamil Biały
    * ****************************************************/
    const CheckForMovies = progress => {
        if(movies.some(movie => movie.progress === progress))
        {
            return true;
        }
        return false;
    }

    if(whatToShow === "Wszystkie")
    {
        return(
            <div className="movie-list">
                {CheckForMovies("Obejrzane") ? <MovieGroup movies={movies} deleteMovie={deleteMovie} whatToShow={"Obejrzane"} updateMovies={updateMovies}></MovieGroup> : null}
                {CheckForMovies("W planach") ? <MovieGroup movies={movies} deleteMovie={deleteMovie} whatToShow={"W planach"} updateMovies={updateMovies}></MovieGroup> : null}
                {CheckForMovies("Porzucone") ? <MovieGroup movies={movies} deleteMovie={deleteMovie} whatToShow={"Porzucone"} updateMovies={updateMovies}></MovieGroup> : null}
            </div>
        )       
    }
    else
    {
        return(
            <div className="movie-list">
                <MovieGroup movies={movies} deleteMovie={deleteMovie} whatToShow={whatToShow} updateMovies={updateMovies}></MovieGroup>
            </div>
        )
    }
}

export default MovieContainer;