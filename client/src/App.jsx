import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CONFIG from '../../config.json';
import MovieList from './components/MovieList'
import { Paper, Grid, TableFooter, TextField } from '@material-ui/core/';



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
    if(event.keyCode === 13) {
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
    const numberWithCommas = this.state.totalResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");

    return (
      <Paper style={{padding: '2% 15%'}}>
        <Grid style={{minHeight: '80vh'}}>
        <h2>Your Personal IMDb</h2>
            <TextField
              type="text"
              fullWidth
              label="Enter The Movie Title and Press Enter"
              placeholder="Find Movie"  
              margin="normal"
              value={this.state.movieTitle}
              onChange={(event) => (this.setState({movieTitle: event.target.value}))}
              onKeyUp={this.handleSearchSubmit}
          />
          <MovieList apiMovieList={this.state.apiMovieList} ownMovieList={this.state.ownMovieList}/>
        </Grid>
        <div className='footer'>
          Total Number of Search Results: <b>{numberWithCommas}</b>
        </div>
      </Paper>
    )
  }
}

export default App;