import React from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const styles = theme => ({
    container: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '33%',
        boxSizing: 'border-box'
    },
});

class FilterBar extends React.Component {
    handleChange = name => event => {
        this.props.onChange(name, event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="countryCode">Country</InputLabel>
                    <Select
                        value={this.props.filters.countryCode}
                        onChange={this.handleChange('countryCode')}
                        input={<Input name="countryCode" id="countryCode" />}
                    >
                        <MenuItem value='CA'>Canada</MenuItem>
                        <MenuItem value='US'>USA</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="minPrice">Min Price</InputLabel>
                    <Input
                        id="minPrice"
                        label="Min Price"
                        value={this.props.filters.minPrice}
                        onChange={this.handleChange('minPrice')}
                        inputProps={{ type: 'number', min: 1, max: this.props.filters.maxPrice }}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="minPrice">Max Price</InputLabel>
                    <Input
                        id="minPrice"
                        label="Max Price"
                        value={this.props.filters.maxPrice}
                        onChange={this.handleChange('maxPrice')}
                        inputProps={{ type: 'number', min: this.props.filters.minPrice }}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </form>
        );
    }
}

export default withStyles(styles)(FilterBar);