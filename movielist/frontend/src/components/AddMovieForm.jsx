import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function AddMovieForm({openForm, closeForm, addMovie})
{

    const [title, setTitle] = useState("");
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState("Obejrzane");

    const [titleError, setTitleError] = useState({
        show: false,
        message: ''
    });    

    const [scoreError, setScoreError] = useState({
        show: false,
        message: ''
    });

    /********************************************************
    * nazwa funkcji: handleSubmit
    *
    * parametry wejściowe: e - zawiera dane o evencie
    * opis funkcji: weryfikuje dane wejściowe i wyświetla odpowienie błędy. Jeżeli dane są poprawne, wywołuje funkcję addMovie z danymi wejściowymi
    *
    * autor: Kamil Biały
    * ****************************************************/
    const handleSubmit = e => {
        e.preventDefault();

        if(title === "")
        {
            setTitleError({show: true, message: "Wprowadź tytuł"});
            return;
        }
        else
        {
            setTitleError({show: false, message: ""});
        }

        if(isNaN(score) || score > 10 || score < 0)
        {
            setScoreError({show: true, message: "Wprowadź ocenę pomiędzy 0 a 10"});
            return;
        }
        else
        {
            setScoreError({show: false, message: ""});
        }

        addMovie({
            id: Math.floor(Math.random() * 10000),
            title: title,
            score: Number(score),         
            favourite: false,
			notes: '',
            progress: progress,
        })

        closeForm(e);
    }

    return(
        <div className="movie-dialog" onClick={e => closeForm(e) }>
            <form className="movie-dialog-form" onClick={e => e.stopPropagation()}>
                <h2>
                    <button className="fontawesome-button closeDialog" onClick={e => closeForm(e)} >
                        <FontAwesomeIcon icon={faX} color="white"/>
                    </button>
                    Dodaj film
                </h2>
                <label className="wrapper">
                    Tytuł: 
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                    {titleError.show ? <p className="error">{titleError.message}</p> : ''}
                </label>


                <label className="wrapper">
                    Ocena: 
                    <input type="text" name="score" value={score} onChange={e => setScore(e.target.value)} />
                    {scoreError.show ? <p className="error">{scoreError.message}</p> : ''}
                </label>

                <label className="wrapper">
                    Stan: 
                    <select value={progress} onChange={e => setProgress(e.target.value)}>            
                        <option value={"Obejrzane"}>Obejrzane</option>
                        <option value={"W planach"}>W planach</option>
                        <option value={"Porzucone"}>Porzucone</option>
                    </select>
                </label>

                <input type="submit" value="Dodaj" className="main-button" onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default AddMovieForm;