import React, { Component } from 'react';
import { Button, Grid } from 'material-ui';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // Function bindings
        this.refreshProduct = this.refreshProduct.bind(this);
    }

    async refreshProduct() {
        let data = await (await fetch('http://localhost:3500/product')).json();
        console.log(data);
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={4}>
                        <Button raised color="primary" className="randomize-button" onClick={this.refreshProduct}>Show me a random item</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;