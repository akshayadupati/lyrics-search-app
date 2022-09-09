import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  findTrackHandler = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log("search track", res);
        if (res.data.message.body.track_list.length === 0) {
        //   dispatch({
        //     type: "NO_RESULTS_FLAG",
        //   });
        dispatch({
            type: "SEARCH_TRACKS",
            payload: "Not found",
          });
        } else {
          dispatch({
            type: "SEARCH_TRACKS",
            payload: res.data.message.body.track_list,
          });
          this.setState({ trackTitle: "" });
        }
      })
      .catch((err) => console.log("err search track", err));
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search for a Song
              </h1>
              <p className="lead text-center">
                Get lyrics for your favorite song
              </p>
              <form onSubmit={this.findTrackHandler.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
