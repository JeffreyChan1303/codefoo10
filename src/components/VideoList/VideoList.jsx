import React, { useState } from 'react';
import { Grid, Typography, Button, duration } from '@material-ui/core';


import useStyles from './styles';


const VideoList = ({videoArr, isMediumDevice, formatTime}) => {
    const classes = useStyles();
    const [loadMore, setLoadMore] = useState(false)
    const videos = []; 

    const handleLoadMore = () => {
        setLoadMore(!loadMore);
    }

    // console.log(videoArr)
    // console.log(isMediumDevice)

    for (let i = 0; i < videoArr.length; i++) {
        let temp = videoArr[i]

        videos.push({
            thumbnail: temp.thumbnails[temp.thumbnails.length - 1].url, // inputs the highest quality thumbnail for every video into array
            title: temp.metadata.title, //inputs title of the video
            duration: temp.metadata.duration, // inputs the duration of the video
        });
    }
    console.log(videos)
    // console.log(thumbnailArr[0])

    return (
        <>
        {isMediumDevice? (
        <>
            {videos.map((element, index) => index < (loadMore? videos.length : 4) && (
            <>
                {index != 0 && <hr style={{opacity: '40%'}} />}
                <Grid item className={classes.playlistItem} xs={4} md={12}>
                    <div className={classes.playlistImgWrapper}>
                        <a className={classes.playlistLink} href='' >
                            <img  
                                className={classes.playlistImg} 
                                src={element.thumbnail} 
                                alt=''
                            />
                            <div className={classes.videoDurationWrapper}>
                                <Typography className={classes.videoDurationText}>{formatTime(element.duration)}</Typography>
                            </div>
                        </a>
                    </div>
                    <div className={classes.textContainer} >
                        <div className={classes.textWrapper} >
                            <a className={classes.playlistLink} href=''>
                                <Typography className={classes.text} variant="body2">{element.title}</Typography>
                            </a>
                        </div>
                    </div>
                </Grid>
            </>
            ))}
            {loadMore? (
                <Button variant="contained" className={classes.loadMoreButton} onClick={handleLoadMore} >
                    <Typography variant="body1"> Show Less </Typography>
                </Button>
            ) : (
                <Button variant="contained" className={classes.loadMoreButton} onClick={handleLoadMore} >
                    <Typography variant="body1"> Load More </Typography>
                </Button>
            )}
        </>
        ) : (
        <>
            {videos.map((element, index) => (
            <>
                {index != 0 && <hr style={{opacity: '40%'}} />}
                <Grid item className={classes.playlistItem} xs={12} md={12} style={{minWidth: '30vw'}}>
                    <div className={classes.playlistImgWrapper} >
                        <a className={classes.playlistLink} href='' >
                            <img  
                                className={classes.playlistImg} 
                                src={element.thumbnail} 
                                alt=''
                            />
                            <div className={classes.videoDurationWrapper}>
                                <Typography className={classes.videoDurationText}>{formatTime(element.duration)}</Typography>
                            </div>
                        </a>
                    </div>
                    <div className={classes.textContainer}>
                        <div className={classes.textWrapper} >
                            <a className={classes.playlistLink} href='' >
                                <Typography className={classes.text} variant="body2">{element.title}</Typography>
                            </a>
                        </div>
                    </div>
                </Grid>
            </>
            ))}
        </>
        )}
        </>
    );
}

export default VideoList;