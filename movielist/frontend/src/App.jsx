import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieContainer from "./components/MovieContainer";
import Sidebar from "./components/Sidebar";


/********************************************************
* nazwa funkcji: <tu wstaw nazwę funkcji>
*
* parametry wejściowe: <nazwa parametru> - <co przechowuje parametr>
* wartość zwracana: <co zwraca funkcja – opis>
* opis funkcji: <zwięzły opis>
*
* autor: Kamil Biały
* ****************************************************/

function App() {

	const [isLogged, setIsLogged] = useState(false);
	const [userEmail, setUserEmail] = useState(false);
	const [whatToShow, setWhatToShow] = useState("Wszystkie");
	const [movies, setMovies] = useState([]);

	/********************************************************
	* 
	* opis funkcji: sprawdza czy użytkownik jest zalogowany i ustawia listę zapisanych filmów
	*
	* autor: Kamil Biały
	* ****************************************************/
	useEffect(() => {
		if(localStorage.getItem("movies") !== null)
		{
			const data = JSON.parse(localStorage.getItem("movies"));
			setMovies(data.movies);
		}

		fetch('http://localhost:5000/login', {
			mode: "cors",
			credentials: 'include'
		})
		.then(data => data.json())
		.then(response => {
			if(response.logged)
			{
				setIsLogged(true);
				setUserEmail(response.email);
				setMovies(response.movies);
			}
			else
			{
				setIsLogged(false);
				setUserEmail(null);
			}
		})
		.catch(e => {
			console.log(e);
		});
	}, [])

	/********************************************************
	* nazwa funkcji: updateMoviesInDB
	*
	* parametry wejściowe: movies - tablica przechowująca listę wszystkich zapisanych filmów
	* opis funkcji: zapisuje listę filmów w bazie danych lub w localStorage jeżeli użytkownik nie jest zalogowany
	*
	* autor: Kamil Biały
	* ****************************************************/
	const updateMoviesInDB = movies => {
		if(isLogged)
		{
			const data = {movies};
			fetch('http://localhost:5000/addMovies', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(data => data.json())
			.then(response => {
				console.log(response.message);
			})
			.catch(e => {
				console.log(e);
			});
		}
		else
		{
			const data = {movies};
			localStorage.setItem("movies", JSON.stringify(data))
		}
	}

	/********************************************************
	* nazwa funkcji: addMovie
	*
	* parametry wejściowe: movie - film dodawany przez użytkownika
	* opis funkcji: dodaje film do listy wszystkich filmów, sortuje ją malejąco względem oceny i wywołuje funkcję updateMoviesInDB
	*
	* autor: Kamil Biały
	* ****************************************************/
	const addMovie = movie => {
		const newMovies = [...movies, movie];
		const sorted = newMovies.sort((a, b) => b.score - a.score);
		setMovies(sorted);
		updateMoviesInDB(sorted);
	}

	/********************************************************
	* nazwa funkcji: updateMovies
	*
	* parametry wejściowe: id - identyfikator aktualizowanego filmu, newMovie - aktualizowany film
	* opis funkcji: podmienia film o danym id z nowo zaktualizowanymi danymi, sortuje listę malejąco względem oceny i wywołuje funkcję updateMoviesInDB
	*
	* autor: Kamil Biały
	* ****************************************************/
	const updateMovies = (id, newMovie) => {
		const filtered = [...movies].filter(movie => movie.id !== id);
		const newMovies = [...filtered, newMovie];
		const sorted = newMovies.sort((a, b) => b.score - a.score);
		setMovies(sorted);
		updateMoviesInDB(sorted);
	}

	/********************************************************
	* nazwa funkcji: deleteMovie
	*
	* parametry wejściowe: id - identyfikator usuwanego filmu
	* opis funkcji: usuwa film o danym id z listy, sortuje ją malejąco względem oceny i wywołuje funkcję updateMoviesInDB
	*
	* autor: Kamil Biały
	* ****************************************************/
	const deleteMovie = id => {
		const filtered = [...movies].filter(movie => movie.id !== id);
		const sorted = filtered.sort((a, b) => b.score - a.score);
		setMovies(sorted);
		updateMoviesInDB(sorted);
	}

	return (
		<div className="main-container">
			<Header isLogged={isLogged} userEmail={userEmail}></Header>
			<Sidebar movies={movies} addMovie={addMovie} setWhatToShow={setWhatToShow}></Sidebar>
			<MovieContainer movies={movies} deleteMovie={deleteMovie} whatToShow={whatToShow} updateMovies={updateMovies}></MovieContainer>
		</div>
  	);
}

export default App;
