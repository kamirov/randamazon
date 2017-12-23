import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


const styles = theme => ({
    card: {
        maxWidth: '100%',
        minHeight: 300,
        padding: '1rem'
    },
    media: {
        height: 200,
        backgroundSize: 'contain'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: {
        flex: '1 1 auto',
        textAlign: 'right'
    },
    devNotes: {
        fontSize: '0.8rem',
        marginTop: '1rem',
        color: '#777',
        fontFamily: '"Courier New", Courier, monospace',
        textAlign: 'right'
    }
});

class ProductCard extends Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {

        let description;
        if (this.props.product.features) {
            description = (
                <ul>
                    { this.props.product.features.map((item, i) => <li key={i}>{item}</li>) }
                </ul>
            );
        } else {
            description = <p><i>No description available.</i></p>
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
                        {/*<div className={this.props.classes.flexGrow}>*/}
                            {/*<IconButton*/}
                                {/*className={classnames(this.props.classes.expand, {*/}
                                    {/*[this.props.classes.expandOpen]: this.state.expanded,*/}
                                {/*})}*/}
                                {/*onClick={this.handleExpandClick}*/}
                                {/*aria-expanded={this.state.expanded}*/}
                                {/*aria-label="Show more"*/}
                            {/*>*/}
                                {/*<ExpandMoreIcon />*/}
                            {/*</IconButton>*/}
                        {/*</div>*/}
                    </CardActions>
                    {/*<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>*/}
                        {/*<CardContent>*/}
                        {/*</CardContent>*/}
                    {/*</Collapse>*/}
                </Card>
                <Typography className={this.props.classes.devNotes}>
                    <i>Randomized using "{this.props.phrase}". Made with &#10084; and JS by <a target="_blank" href="http://andreis.place" rel="noopener noreferrer">kamirov</a>.</i>
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(ProductCard);