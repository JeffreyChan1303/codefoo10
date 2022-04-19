import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" style={{ backgroundColor: "rgba(246,246,249,255)" }} className={classes.appBar}>
            <Toolbar className={classes.toolbar} >
                <div className={classes.textWrapper} >
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;