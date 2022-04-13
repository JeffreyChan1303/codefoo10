import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" style={{ backgroundColor: "rgb(255,255,255)" }} className={classes.appBar}>
            <Toolbar className={classes.toolbar} >
                <div className={classes.textWrapper} >
                    <Typography variant="body1" className={classes.sectionTitle}> Section 1 </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Section 1 </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Section 1 </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Section 1 </Typography>
                    <Typography variant="body1" className={classes.sectionTitle}> Section 1 </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;