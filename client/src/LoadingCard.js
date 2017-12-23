import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

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
            </div>
        );
    }
}

export default withStyles(styles)(ErrorCard);