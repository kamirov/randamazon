import React, { Component } from 'react';
import { Button, Grid } from 'material-ui';
import ProductCard from './ProductCard';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        // Function bindings
        this.refreshProduct = this.refreshProduct.bind(this);

        this.refreshProduct();
    }

    async refreshProduct() {
        let responseData = await (await fetch('http://localhost:3500/product')).json();
        this.setState({
            product: responseData.product,
            phrase: responseData.phrase,
            status: 'ok'
        });
        console.log(responseData);
    }

    render() {

        let main = null;
        if (this.state.status === 'ok') {
            main = <ProductCard product={this.state.product} phrase={this.state.phrase} />;
        } else if (this.state.status === 'error') {

        } else if (this.state.status === 'loading') {

        }
        return (
            <div>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={4}>
                        <Button raised color="primary" className="randomize-button" onClick={this.refreshProduct}>Show me a random item</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={4}>
                        {main}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;