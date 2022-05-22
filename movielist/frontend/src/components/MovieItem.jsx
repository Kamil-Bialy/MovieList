import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MovieDetails from './MovieDetails';


function MovieItem({movies, details, deleteMovie, updateMovies})
{

    const [id, setID] = useState(details.id);
    const [title, setTitle] = useState(details.title);
    const [score, setScore] = useState(details.score);
    const [favourite, setFavourite] = useState(details.favourite);
    const [notes, setNotes] = useState(details.notes);
    const [progress, setProgress] = useState(details.progress);

    const [showDetails, setShowDetails] = useState(false);


    //otwiera okno detali filmu
    const openDetails = () => {
        setShowDetails(true);
    }

    //zamyka okno detali filmu
    const closeDetails = e => {
        e.stopPropagation();
        setShowDetails(false);
    }    

    /********************************************************
    *
    * opis funkcji: odświeża wartości obiektu movieDetails gdy zmieni się jedna z wartości notes, score, favourite, progress lub movies
    *
    * autor: Kamil Biały
    * ****************************************************/
    useEffect(() => {
        setMovieDetails({
            id, setID,
            title, setTitle,
            score, setScore,
            favourite, setFavourite,
            notes, setNotes,
            progress, setProgress,
            closeDetails,
            deleteMovie, update, movies
        })
    }, [notes, score, favourite, progress, movies] )
    
    /********************************************************
    * nazwa funkcji: update
    *
    * parametry wejściowe: id - identyfikator aktualizowanego filmu, newMovie - aktualizowany film
    * opis funkcji: aktualizuje dane filmu i wywołuje funkcję updateMovies
    *
    * autor: Kamil Biały
    * ****************************************************/
    const update = (id , newMovie) => {
        setScore(newMovie.score);
        setFavourite(newMovie.favourite);
        setNotes(newMovie.notes);
        setProgress(newMovie.progress);
        updateMovies(id , newMovie);
    }

    const [movieDetails, setMovieDetails] = useState({
        id, setID,
        title, setTitle,
        score, setScore,
        favourite, setFavourite,
        notes, setNotes,
        progress, setProgress,
        closeDetails,
        deleteMovie, update, movies
    });



    return(
        <div className="movie-item" onClick={openDetails}>
            <div className="movie-title">{title}</div>
            <div className="movie-score">{score}</div>
            <div className="movie-favourite">
                <FontAwesomeIcon className="fontawesome-button" icon={faHeart} color={favourite ? "red" : "white"} />
            </div>


            {showDetails ? <MovieDetails {...movieDetails}></MovieDetails> : null}
        </div>
    )
}

export default MovieItem;