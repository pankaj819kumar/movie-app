// {
//     type: "ADD_MOVIES",
//     movies: [m1, m2, m3]
// }
// {
//     type: 'DECREASE_COUNT'
// }

// action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';

// action creators
export function addMovies(movies, id) {
    return {
        type: ADD_MOVIES,
        movies: movies,
        id
    }
}

export function addFavourite(movie) {
    return {
        type: ADD_TO_FAVOURITES,
        movie: movie,
    }
}

export function removeFromFavourites(movie) {
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie: movie
    }
} 

export function setShowFavourites(val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val     // short for val : val
    }
} 
