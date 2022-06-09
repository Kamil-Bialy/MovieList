const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());


const MongoURL = "mongodb://localhost:27017/MovieList";
const userModel = require('./Models/User');

/********************************************************
*
* opis funkcji: łączy się z bazą danych, jeżeli uda się połączyć uruchamia serwer, jeżeli nie ma połączenia zamyka go
*
* autor: Kamil Biały
* ****************************************************/
mongoose.connect(MongoURL)
        .then(res => {
            console.log('Connected to mongodb');
            app.listen(5000, console.log("Listening on port 5000"));
        })
        .catch(error => {
            console.error("Can't connect to mongodb", error);
            process.exit(0);
        })

const store = new MongoDBSession({
    url: MongoURL,
    databaseName: 'MovieList',
    collection: 'sessions',
})

app.use(
    session({
    secret: 'very very very very very secret key',
    resave: false,
    saveUninitialized: false,
    store: store
})
);

app.get('/', (req, res) => {
    res.send("Hallo");
})

/********************************************************
* 
* wartość zwracana: registered - określa czy próba rejestracji powiodła się
*
* opis funkcji: pobiera email i hasło użytkownika. Jeżeli użytkownik o podanym emailu istnieje w bazie danych,
*               zwraca wartość false. W przeciwnym wypadku hashuje hasło, tworzy nowego użytkownika, zapisuje
*               go w bazie danych i zwraca wartość true
*
* autor: Kamil Biały
* ****************************************************/
app.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let user = await userModel.findOne({email});

    if(user)
    {
        return res.json({registered: false});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new userModel({
        email: email,
        password: hashedPassword
    })

    await user.save();
    return res.json({registered: true});
})


/********************************************************
*
* opis funkcji: pobiera email i hasło, sprawdza czy istnieje użytkownik o podanym emailu i czy
*               podane hasło zgadza się z tym zapisanym w bazie danych. Jeżeli tak, zapisuje w sesji
*               id użytkownika
*
* autor: Kamil Biały
* ****************************************************/
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({email: email});

    if(!user)
    {
        return res.end();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
    {
        return res.end();
    }

    req.session.userID = user._id;
    return res.send("Logged");
})

/********************************************************
*
* opis funkcji: sprawdza czy istnieej sesja, jeżeli tak, pobiera dane użytkownika o id zapisanym w sesji
*               i zwraca je
*
* autor: Kamil Biały
* ****************************************************/
app.get('/login', async (req, res) => {
    if(req.session.userID)
    {
        const user = await userModel.findById(req.session.userID);
        return res.send({
            logged: true,
            email: user.email,
            movies: user.movies
        });
    }
    else
    {
        return res.send({
            logged: false
        });
    }
})

/********************************************************
*
* opis funkcji: kończy daną sesję
*
* autor: Kamil Biały
* ****************************************************/
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.end();
})

/********************************************************
*
* opis funkcji: pobiera listę filmów z zapytania i aktualizuje je u danego użytkownika
*
* autor: Kamil Biały
* ****************************************************/
app.post('/addMovies', async (req, res) => {
    let movies = req.body.movies;

    const user = await userModel.findByIdAndUpdate({_id: req.session.userID}, 
        {$set: {movies: movies}}
    );
    res.send({message: `Success`});
})
