import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';

function MovieDetails(details)
{   
    const [tempScore, setTempScore] = useState(details.score);
    const [tempFavourite, setTempFavourite] = useState(details.favourite);
    const [tempNotes, setTempNotes] = useState(details.notes);
    const [tempProgress, setTempProgress] = useState(details.progress);

    const [tempScoreError, setTempScoreError] = useState({
        show: false,
        message: ''
    });


    /********************************************************
    * nazwa funkcji: handleSubmit
    *
    * parametry wejściowe: e - zawiera dane o evencie
    * opis funkcji: weryfikuje dane wejściowe i wyświetla odpowienie błędy. Jeżeli dane są poprawne, wywołuje funkcję update
    *
    * autor: Kamil Biały
    * ****************************************************/
    const handleSubmit = e => {

        if(isNaN(tempScore) || tempScore > 10 || tempScore < 0)
        {
            setTempScoreError({show: true, message: "Wprowadź ocenę pomiędzy 0 a 10"});
            return;
        }
        else
        {
            setTempScoreError({show: false, message: ""});
        }

        const newMovie = {
            id: details.id,
			title: details.title,
			score: Number(tempScore),
			favourite: tempFavourite,
			notes: tempNotes,
			progress: tempProgress
        }

        details.update(details.id, newMovie);

        details.closeDetails(e);
    }

    return(
        <div className="movie-dialog" style={{zIndex: "15"}} onClick={e => details.closeDetails(e) }>
            <form className="movie-dialog-form" style={{zIndex: "11"}} onClick={e => e.stopPropagation()}>
                <button className="fontawesome-button closeDialog" onClick={e => details.closeDetails(e)} >
                    <FontAwesomeIcon icon={faX} color="white"/>
                </button>
                
                <div className="wrapper">                
                    <p className="movie-details-title">
                        {details.title}
                    </p>

                    <button className="fontawesome-button" style={{fontSize: "22px"}} onClick={e => { e.preventDefault(); setTempFavourite(!tempFavourite);}}>
                        <FontAwesomeIcon icon={faHeart} color={tempFavourite? "red" : "white"}/>
                    </button>
                </div>

                <label className="wrapper">
                    Ocena: 
                    <input type="text" name="score" value={tempScore} onChange={e => setTempScore(e.target.value)} />
                    {tempScoreError.show ? <p className="error">{tempScoreError.message}</p> : ''}
                </label>

                <label className="wrapper">
                    Stan: 
                    <select value={tempProgress} onChange={e => setTempProgress(e.target.value)}>            
                        <option value="Obejrzane">Obejrzane</option>
                        <option value="W planach">W planach</option>
                        <option value="Porzucone">Porzucone</option>
                    </select>
                </label>

                <label className="wrapper">
                    Notatki: 
                    <textarea name="notes" cols="23" rows="5" style={{resize: "none"}} value={tempNotes} onChange={e => setTempNotes(e.target.value)}></textarea>
                </label>

                <input type="button" value="Zmień dane" className="main-button" onClick={(handleSubmit)}/>
                <input type="button" value="Usuń film" className="main-button" style={{backgroundColor: "red"}} onClick={() => details.deleteMovie(details.id)} />
            </form>
        </div>
        
    )
}

export default MovieDetails;
