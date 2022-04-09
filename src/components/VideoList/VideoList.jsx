import React from 'react';
import { Grid, Typography } from '@material-ui/core';


import useStyles from './styles';


const VideoList = ({videoArr, isMediumDevice}) => {
    const classes = useStyles();
    const thumbnailArr = [];
    const titleArr = [];
    const indexArr = [];

    console.log(videoArr)
    console.log(isMediumDevice)

    for (let i = 0; i < videoArr.length; i++) {
        let temp = videoArr[i]
        thumbnailArr.push(temp.thumbnails[temp.thumbnails.length - 1].url); // inputs the highest quality thumbnail for every video into the array
        titleArr.push(temp.metadata.title); // inputs the title of the video
        indexArr.push(i);
    }
    console.log(thumbnailArr[0])

    return (
        <>
        {isMediumDevice? (
        <>
            {indexArr.map((index) => (
            <>
                <Grid item className={classes.playlistItem} xs={4} md={12}>
                    <div className={classes.playlistImgWrapper}>
                        <img  
                            className={classes.playlistImg} 
                            src={thumbnailArr[index]} 
                            alt="image not loaded"
                        />
                    </div>
                    <div className={classes.textContainer} >
                        <div className={classes.textWrapper} >
                            <Typography className={classes.text} variant="body2">{titleArr[index]}</Typography>
                        </div>
                    </div>
                </Grid>
                {indexArr.length - 1 != index && <hr style={{opacity: '40%'}} />}
            </>
            ))}
        </>
        ) : (
        <>
            {indexArr.map((index) => (
            <>
                <Grid item className={classes.playlistItem} xs={12} md={12} style={{minWidth: '30vw'}}>
                    {/* ayyooooo */}
                    <div className={classes.playlistImgWrapper} >
                        <img  
                            className={classes.playlistImg} 
                            src={thumbnailArr[index]} 
                            alt="image not loaded"
                        />
                    </div>
                    <div className={classes.textContainer}>
                        <div className={classes.textWrapper} >
                            <Typography className={classes.text} variant="body2">{titleArr[index]}</Typography>
                        </div>
                    </div>
                </Grid>
                {indexArr.length - 1 != index && <hr style={{opacity: '40%'}}/>}
            </>
            ))}
        </>
        )}
        </>
    );
}

export default VideoList;