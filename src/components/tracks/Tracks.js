import React from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner.js";
import Track from "../tracks/Track";

class Tracks extends React.Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { track_list, heading } = value;
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else if (track_list === "Not found") {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4"> Sorry, no songs found.. Please try with different keywords.. </h3>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {track_list.map((item) => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
