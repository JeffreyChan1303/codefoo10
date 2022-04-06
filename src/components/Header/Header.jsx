import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" >
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    App? 
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Header
                    </Typography> 
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        </div>
                        <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;