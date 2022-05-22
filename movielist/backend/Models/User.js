const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    movies: [{
        id: {
            type: Number,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        favourite: {
            type: Boolean,
            required: true,
        },
        notes: {
            type: String,
        },
        progress: {
            type: String,
            required: true,
        },
    }] 
})

module.exports = mongoose.model('User', userSchema);