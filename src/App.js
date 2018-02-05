import React, { Component } from 'react';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: []
        };
        this.loadData = this.loadData.bind(this);

    }
    loadData(url) {
        fetch(url)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    datas: json.films.film
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

            <
            div className = "App" >
            <
            div className = "container" >
            <
            div className = "panel-group" >


            {
                this.state.datas.map((datas, dataid) => {
                    return ( <
                        div class = "grid-container outline" >
                        <
                        div class = "row" >
                        <
                        div className = "col-3 col-1"
                        key = { dataid } >
                        Film ID: { datas.id } <
                        /div> <
                        div className = "col-3 col-1"
                        key = { dataid } >
                        Film Title: { datas.title } <
                        /div> <
                        /div> <
                        /div>
                    )
                })
            }

            <
            /div> </div > < /div>

        );
    }

}
export default App;
