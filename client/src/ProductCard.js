import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';


const styles = theme => ({
    card: {
        maxWidth: '100%',
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
        fontFamily: '"Courier New", Courier, monospace'
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
                        <div className={this.props.classes.flexGrow}>
                            <IconButton
                                className={classnames(this.props.classes.expand, {
                                    [this.props.classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </div>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography type="alignRight" className={this.props.classes.devNotes}>
                                <i>Based on "{this.props.phrase}"</i>
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ProductCard);