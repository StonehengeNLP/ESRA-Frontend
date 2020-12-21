import React, { Component } from 'react'

export default class Searchbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search : "",

        }
    }

    render() {
        return (
            <div>
                <input
                id="search"
                type="text"
                placeholder="Enter search keywords"
                ></input>
            </div>
        )
    }
}
