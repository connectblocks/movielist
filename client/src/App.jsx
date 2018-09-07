import React, { Component } from 'react';
import axios from 'axios';
import CONFIG from '../../config.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "joins"
    }
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${CONFIG.movie_db_api_key}&query=${this.state.search}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        hello this is movie list 
      </div>
    )
  }
}

export default App;