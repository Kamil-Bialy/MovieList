import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

function LoginForm()
{
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState({
        show: false,
        message: ''
    });    

    const [passwordError, setPasswordError] = useState({
        show: false,
        message: ''
    });


    /********************************************************
    * nazwa funkcji: handleLogin
    *
    * opis funkcji: pobiera dane logowania, jeżeli są poprawne wysyła zapytanie do serwera
    *               jeżeli użytkownik istnieje w bazie danych, wysyła użytkownika na główną stronę
    *               w przeciwnym wypadku wyświetla błąd logowania
    *
    * autor: Kamil Biały
    * ****************************************************/
    const handleLogin = () => {
        if(!ValidateData())
        {
            return;
        }
        const data = { email, password };
        fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.text())
        .then(response => {
            setPasswordError({show: false, message: ""});
            if(response === "Logged")
            {
                navigate('../'  , {replace: true})
            }
            else
            {
                setPasswordError({show: true, message: "Niepoprawne hasło lub e-mail"});
            }
          })
        .catch((e) => {
            console.log(e);
          });
    }

    /********************************************************
    * nazwa funkcji: ValidateData
    *
    * wartość zwracana: true/false
    * opis funkcji: sprawdza poprawność danych, wyświetla odpowiednie błędy i zwraca wartość false jeżeli są błędne
    *               jeżeli są poprawne zwraca wartość true
    *
    * autor: Kamil Biały
    * ****************************************************/
    const ValidateData = () =>
    {
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if(!regex.test(email))
        {
            setEmailError({show: true, message: "Wprowadź poprawny adres e-mail"});
            return false;
        }
        else
        {
            setEmailError({show: false, message: ""});
        }

        if(password.length === 0)
        {
            setPasswordError({show: true, message: "Wprowadź hasło"});
            return false;
        }
        else
        {
            setPasswordError({show: false, message: ""});
        }

        if(password.length < 8)
        {
            setPasswordError({show: true, message: "Hasło musi być dłuższe niż 8 znaków"});
            return false;
        }
        else
        {
            setPasswordError({show: false, message: ""});
        }

        return true;
    }

    return(
        <div className="login-page">
            <div className="login-page-card">
                <div className="login-user">
                    <FontAwesomeIcon className="login-user-icon" icon={faUser}></FontAwesomeIcon>
                </div>
                <p className="login-header">Zaloguj się</p>
                <form method="post">
                    <div className="login-page-wrapper">
                        <label>
                            E-mail:
                            <input type="text" name="email" placeholder="Wprowadź e-mail" onChange={e => setEmail(e.target.value)}/>
                            {emailError.show ? <p className="error">{emailError.message}</p> : ''}
                        </label>
                    </div>
                    <div className="login-page-wrapper">
                        <label>
                            Hasło:
                            <input type="password" name="password" placeholder="Wprowadź hasło" onChange={e => setPassword(e.target.value)}/>
                            {passwordError.show ? <p className="error">{passwordError.message}</p> : ''}
                        </label>
                    </div>
                    <input type="button" value="Zaloguj się" className="main-button" onClick={handleLogin} />
                    <div className="login-links">
                        <NavLink to="/register">Nie masz konta? Zarejestruj się</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;