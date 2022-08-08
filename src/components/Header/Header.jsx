import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';

const Header = ({ isSmallDevice, setStartIndex }) => {
    const classes = useStyles();
    return (
        <AppBar position="static" style={{ backgroundColor: "rgba(246,246,249,255)" }} className={classes.appBar}>
            <Toolbar className={classes.toolbar} >
                <div className={classes.textWrapper} >
                    {isSmallDevice ? (
                        <Button 
                            variant='outlined' 
                            style={{ textTransform: 'none' }}
                            onClick={() => setStartIndex(Math.floor(Math.random() * 280))}
                        >
                            Click To Get New Playlist
                        </Button>
                    ) : (
                    <>
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                        <Button 
                            variant='outlined' 
                            style={{ textTransform: 'none' }}
                            onClick={() => setStartIndex(Math.floor(Math.random() * 280))}
                        >
                            Click To Get New Playlist
                        </Button>
                    <Typography variant="body1" className={classes.sectionTitle}> Placeholder </Typography>
                    </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;