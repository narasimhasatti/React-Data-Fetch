import React, { Component } from 'react';

import './App.css';
import DisplayComp from './DisplayComp';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filmData: []
        };
        this.loadData = this.loadData.bind(this);

    }
    loadData(url) {
        fetch(url)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    filmData: json.films.film
                });
            }).catch(err => {
                console.log(err)
            })
    }
    componentWillMount() {
        this.loadData("http://www.snagfilms.com/apis/films.json?limit=10");
    }
    render() {

        return (

            <DisplayComp fetchFilmDetails={this.state.filmData}/>
        );
    }

}
export default App;
