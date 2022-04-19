import React from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const Review = ({videoData}) => {
    const classes = useStyles();
    console.log(videoData)
    return (
        <>
            <Typography className={classes.title} variant="h4" >{videoData.title}</Typography>
            <Typography className={classes.description} variant="h6">{videoData.description}</Typography>
        </>
    );
}

export default Review;