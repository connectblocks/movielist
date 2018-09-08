import React, { Component } from 'react';
import axios from 'axios';

class MovieListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      own: props.own
    }   
    this.handleOwnClick = this.handleOwnClick.bind(this);
  }

  handleOwnClick(event) {
    if(event.target.value === 'No') {
      axios.post('/movies', { movieId: this.props.item.id })
        .then((res) => {
          console.log(res.data) 
          this.setState({ own: 'Yes'})   
        })
        .catch(err => console.log(err))
    } else {
      axios.delete('/movies', {data: { movieId: this.props.item.id }})
        .then((res) => {
          console.log(res.data) 
          this.setState({ own: 'No'})   
        })
        .catch(err => console.log(err))
      }
  }

  render () {
    const inStyle = this.state.own === 'Yes' ? 'Green' : 'Red';
    return (
      <div style={{borderStyle: 'solid', margin: '5px', padding: '5px'}}>
        <h3>{this.props.item.title}</h3>
        <div><b>Release Date: </b>{this.props.item.release_date}</div>
        <div>
          <span><b>Own the movie: </b></span>    
          <button onClick={this.handleOwnClick} value={this.state.own} style={{color: 'White', backgroundColor: inStyle, borderRadius: '5px'}}>{this.state.own}</button>
        </div>
        <div><b>Overview</b></div>
        <div>{this.props.item.overview}</div>
      </div>
    )
  }
}

export default MovieListEntry; 