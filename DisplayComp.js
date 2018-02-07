import React, { Component } from "react";

import "./App.css";

class DisplayComp extends Component {
 
  render() {
    var fetchData= this.props.fetchFilmDetails;

    return (
      <div className="App">
        {fetchData.map((item) => {
          return (
            <div className="grid-container outline" key={item.id}>
              <div className="row">
                <div className="col-3 col-1" >
                  Film ID: {item.id}
                </div>
                <div className="col-3 col-1" >
                  Film Title: {item.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default DisplayComp;
