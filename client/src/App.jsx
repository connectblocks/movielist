import React, { Component } from 'react';
import axios from 'axios';
import CONFIG from '../../config.json';
import MovieList from './components/MovieList'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: "",
      totalResult: 0,
      apiMovieList: [],
      ownMovieList: []
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    if(this.state.movieTitle === '') {
      alert(`please enter the movie you want to search`);
    } else {
      axios.all([
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${CONFIG.movie_db_api_key}&query=${this.state.movieTitle}`),
        axios.get(`/movies`)
      ])
      .then(axios.spread((res1, res2) => {
        this.updateStates(res1.data, res2.data);
      }))
      .catch((err) => {
        console.log(err)
      });
    }
  }

  updateStates(apiList, myList) {
     const ownMovieList = myList.map((item) => item.movieId);
     this.setState({
       apiMovieList: apiList.results,
       totalResult: apiList.total_results,
       ownMovieList
     })
  }

  render() {
    return (
      <div>
        <form>
          <label><b>Find Movies</b></label>
            <input 
              type="text" 
              value={this.state.movieTitle}
              onChange={(event) => (this.setState({movieTitle: event.target.value}))}
              />
          <button onClick={this.handleSearchSubmit}>Submit</button>
        </form>
        <div>
          <MovieList apiMovieList={this.state.apiMovieList} ownMovieList={this.state.ownMovieList}/>
        </div>
        <div>
          Total Number of Search Result: {this.state.totalResult}
        </div>
      </div>
    )
  }
}

export default App;