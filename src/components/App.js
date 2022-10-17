import Navbar from './Navbar';
import React from 'react';
import { data as moviesList} from '../data';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';


class App extends React.Component {

  // invoked immediately after a component is mounted
  componentDidMount() {
    const { store } = this.props;


    // Adds a change listener. It will be called any time an action is dispatched
    store.subscribe(() => {
      console.log("UPDATED (in subscribe)");
      this.forceUpdate();  
    });
      
    // make api call
    // dispatch action
    store.dispatch(addMovies(moviesList));
    console.log("STATE", this.props.store.getState());
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }
  render() {
    const {movies, search} = this.props.store.getState(); // {movies []  , search [] } (destructuring)
    const { list, favourites, showFavourites } = movies;
    console.log('RENDER', this.props.store.getState()); 
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (   // automatically return
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
