import React from "react";
import {Link, useNavigate} from "react-router-dom";

function Header({ isLogged, userEmail })
{

    const navigate = useNavigate();

    /********************************************************
    * nazwa funkcji: handleLogout
    *
    * opis funkcji: wylogowywuje użytkownika i przeładowywuje stronę
    *
    * autor: Kamil Biały
    * ****************************************************/
    const handleLogout = () => {
        fetch('http://localhost:5000/logout', {
            credentials: "include"
        })
        .then(() => 
        {
            navigate(0);
        })
        .catch(e => {
            console.log(e)
        })
    }

    return(
        <div className="header">
            <h1>Biblioteka filmów</h1>
            {isLogged? 
                <div className="user-section">
                    <h4>Zalogowano jako: {userEmail}</h4>
                    <button className="main-button" onClick={handleLogout}>
                            Wyloguj się
                    </button>
                </div>
            : 

            <div className="user-section">
                <Link to="/login">
                    <button className="main-button">
                        Zaloguj się
                    </button>
                </Link>
            </div>

            }
        </div>

    )

}

export default Header;