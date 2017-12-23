import React, { Component } from 'react';
import { Button, Grid } from 'material-ui';
import ProductCard from './ProductCard';
import ErrorCard from './ErrorCard';
import LoadingCard from './LoadingCard';
import FilterBar from './FilterBar';
import queryString from 'query-string'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {
                minPrice: 1,
                maxPrice: 1000,
                countryCode: 'CA'
            }
        }

        // Function bindings
        this.refreshProduct = this.refreshProduct.bind(this);
        this.updateFilter = this.updateFilter.bind(this);

        this.refreshProduct();
    }

    async refreshProduct() {
        console.log('filters', this.state.filters);

        // Amazon assumes price input in cents, UI accepts dollars. This conversion should probably happen on the BE
        let tempFilters = Object.assign({}, this.state.filters);
        tempFilters.maxPrice *= 100;
        tempFilters.minPrice *= 100;

        let paramFilters = queryString.stringify(tempFilters);

        this.setState({
            status: 'loading'
        });

        let responseData = await (await fetch(`http://localhost:3500/product/?${paramFilters}`)).json();

        if (responseData.product) {
            this.setState({
                product: responseData.product,
                phrase: responseData.phrase,
                status: 'ok'
            });
        } else {
            this.setState({
                status: 'error'
            });
        }

        console.log(responseData);
    }

    updateFilter(name, value) {
        let filters = this.state.filters;
        filters[name] = value;

        this.setState({
            filters: filters
        });
    }

    render() {

        let main = null;
        if (this.state.status === 'ok') {
            main = <ProductCard product={this.state.product} phrase={this.state.phrase} />;
        } else if (this.state.status === 'error') {
            main = <ErrorCard />;
        } else if (this.state.status === 'loading') {
            main = <LoadingCard />;
        }

        return (
            <div>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12} sm={9} md={6} lg={5} xl={3}>
                        <Button raised color="primary" className="randomize-button" onClick={this.refreshProduct}>Show me a random item</Button>

                        <Grid>
                            <FilterBar filters={this.state.filters} onChange={this.updateFilter} />
                        </Grid>
                        <Grid>
                            {main}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;