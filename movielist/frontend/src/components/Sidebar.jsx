import React, { useState } from "react";
import AddMovieForm from "./AddMovieForm";


function Sidebar({movies, addMovie, setWhatToShow})
{

    const [showForm, setShowForm] = useState(false);
    const [showCount, setShowCount] = useState(false);

    //otwiera okno dodawania filmu
    const openForm = () => {
        setShowForm(true);
    }

    //zamyka okno dodawania filmu
    const closeForm = e => {
        e.stopPropagation()
        setShowForm(false);
    }

    /********************************************************
    * nazwa funkcji: getCount
    * 
    * parametry wejściowe: progress - kategoria filmu
    * wartość zwracana: długość listy filmów o danej kategorii
    * opis funkcji: sprawdza długość danej kategorii filmów i zwraca jej długość jeżeli użytkownik najechał na kategorie
    *
    * autor: Kamil Biały
    * ****************************************************/
    const getCount = progress => {
        if(movies.length <= 0 || !showCount)
        {
            return;
        }

        if(progress === "Wszystkie")
        {
            return movies.length;
        }

        return movies.filter(movie => movie.progress === progress).length;
    }

    return(
        <div className="sidebar">
            <button onClick={openForm} className="main-button">Dodaj film</button>

            <div onMouseEnter={() => setShowCount(true)} onMouseLeave={() => setShowCount(false)}>
                <p className="link" onClick={() => setWhatToShow("Wszystkie")}>Wszystkie {getCount("Wszystkie")}</p>
                <p className="link" onClick={() => setWhatToShow("Obejrzane")}>Obejrzane {getCount("Obejrzane")}</p>
                <p className="link" onClick={() => setWhatToShow("W planach")}>W planach {getCount("W planach")}</p>
                <p className="link" onClick={() => setWhatToShow("Porzucone")}>Porzucone {getCount("Porzucone")}</p>
            </div>

            {showForm ? <AddMovieForm openForm={openForm} closeForm={closeForm} addMovie={addMovie}></AddMovieForm> : ""}
        </div>
    )
}

export default Sidebar;