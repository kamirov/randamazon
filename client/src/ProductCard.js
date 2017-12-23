import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 200,
        backgroundSize: 'contain'
    },
};

class ProductCard extends Component {
    render() {

        let description;
        if (this.props.product.features) {
            description = (
                <ul>
                    { this.props.product.features.map((item, i) => <li key={i}>{item}</li>) }
                </ul>
            );
        } else {
            description = <i>No description available.</i>
        }

        return (
            <div>
                <Card className={this.props.classes.card}>
                    <CardMedia
                        className={this.props.classes.media}
                        image={this.props.product.imageUrl}
                        title={this.props.product.title}
                    />
                    <CardContent>
                        <Typography type="headline" component="h2">
                            {this.props.product.title}
                        </Typography>
                        <Typography component="div">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button raised color="primary" href={this.props.product.url} target='_blank'>
                            {this.props.product.price}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ProductCard);