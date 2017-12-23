import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    card: {
        maxWidth: '100%',
        minHeight: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
    },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
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
                        <CircularProgress className={this.props.classes.progress} />
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