import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
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
    devNotes: {
        fontSize: '0.8rem',
        marginTop: '1rem',
        color: '#777',
        fontFamily: '"Courier New", Courier, monospace',
        textAlign: 'right'
    }
});

class ErrorCard extends Component {
    state = { expanded: false };

    render() {
        return (
            <div>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2">
                            Sorry, something went wrong
                        </Typography>
                        <Typography component="div">
                            Please try again later or send me an angry message on Facebook.
                        </Typography>
                    </CardContent>
                </Card>
                <Typography className={this.props.classes.devNotes}>
                    <i>Made with &#10084; and JS by <a target="_blank" href="http://andreis.place" rel="noopener noreferrer">kamirov</a>.</i>
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(ErrorCard);