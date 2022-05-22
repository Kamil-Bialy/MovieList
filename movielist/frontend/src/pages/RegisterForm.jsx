import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

function RegisterForm()
{
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState({
        show: false,
        message: ''
    });    

    const [passwordError, setPasswordError] = useState({
        show: false,
        message: ''
    });

    const [confirmPasswordError, setConfirmPasswordError] = useState({
        show: false,
        message: ''
    });


    /********************************************************
    * nazwa funkcji: handleSubmit
    *
    * opis funkcji: pobiera dane rejestracji, jeżeli są poprawne wysyła zapytanie do serwera
    *               jeżeli są poprawne, rejestruje dane użytkownika w bazie danych i ładuje stronę logowania
    *               w przeciwnym wypadku wyświetla błąd rejestracji
    *
    * autor: Kamil Biały
    * ****************************************************/
    const handleSubmit = () => {

        if(!ValidateData())
        {
            return;
        }
        
        const data = { email, password };
        fetch('http://localhost:5000/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .then(response => {
            if(response.registered)
            {
                navigate('../login');
            }
            else
            {
                setEmailError({show: true, message: "Podany adres e-mail już istnieje   "})
            }
          })
        .catch(e => {
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

        if(password.length < 8)
        {
            setPasswordError({show: true, message: "Hasło musi być dłuższe niż 8 znaków"});
            return false;
        }
        else
        {
            setPasswordError({show: false, message: ""});
        }

        if(password !== confirmPassword)
        {
            setConfirmPasswordError({show: true, message: "Hasła nie są identyczne"});
            return false;
        }
        else
        {
            setConfirmPasswordError({show: false, message: ""});
        }

        return true;
    }

    return(
        <div className="login-page">
            <div className="login-page-card">
                <div className="login-user">
                    <FontAwesomeIcon className="login-user-icon" icon={faUser}></FontAwesomeIcon>
                </div>
                <p className="login-header">Zarejestruj się</p>
                <form method="post">
                    <div className="login-page-wrapper">
                        <label>
                            E-mail:
                            <input type="text" name="email" placeholder="Wprowadź e-mail" required onChange={e => setEmail(e.target.value)}/>
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

                    <div className="login-page-wrapper">
                        <label>
                            Powtórz hasło:
                            <input type="password" name="confirm-password" placeholder="Wprowadź ponownie hasło" onChange={e => setConfirmPassword(e.target.value)}/>
                            {confirmPasswordError.show ? <p className="error">{confirmPasswordError.message}</p> : ''}
                        </label>
                    </div>

                    <input type="button" value="Zarejestruj się" className="main-button" onClick={handleSubmit} />
                    <div className="login-links">
                        <NavLink to="/login">Masz już konto? Zaloguj się</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;