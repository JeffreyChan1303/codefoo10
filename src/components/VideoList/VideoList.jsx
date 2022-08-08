import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './styles';

const VideoList = ({videoArr, isMediumDevice, formatTime, playlistIndex, setPlaylistIndex, isSmallDevice, isLargeDevice }) => {
    const classes = useStyles();
    const [loadMore, setLoadMore] = useState(false)
    const videos = []; 

    const handleLoadMore = () => {
        setLoadMore(!loadMore);
    }

    for (let i = 0; i < videoArr.length; i++) {
        let temp = videoArr[i]

        videos.push({
            thumbnail: temp.thumbnails[temp.thumbnails.length - 1].url, // inputs the highest quality thumbnail for every video into array
            title: temp.metadata.title, //inputs title of the video
            duration: temp.metadata.duration, // inputs the duration of the video
        });
    }
    console.log(videos)

    return (
        <>
        {isMediumDevice? (
        <>
            {videos.map((element, index) => index < (loadMore? videos.length : 4 + playlistIndex) && (
                index >= playlistIndex &&
            <>
                {index !== 0 && <hr style={{opacity: '40%'}} />}
                <Grid item className={classes.playlistItem} xs={4} md={12}>
                    <Button className={classes.playlistImgWrapper} onClick={() => setPlaylistIndex(index)}>
                        <img  
                            className={classes.playlistImg} 
                            src={element.thumbnail} 
                            alt=''
                        />
                        <div className={classes.videoDurationWrapper}>
                            <Typography className={classes.videoDurationText} variant={isLargeDevice? "body1" : "body2"}>
                                {formatTime(element.duration)}
                            </Typography>
                        </div>
                    </Button>
                    <Button className={classes.textContainer} onClick={() => setPlaylistIndex(index)}>
                        <div className={classes.textWrapper} >
                            <Typography className={classes.text} variant={isLargeDevice? "body1" : "body2"}>
                                {element.title}
                            </Typography>
                        </div>
                    </Button>
                </Grid>
            </>
            ))}
            {loadMore? (
                <Button variant="contained" className={classes.loadMoreButton} onClick={handleLoadMore} >
                    <Typography variant="body1" className={classes.loadMoreButtonText} > Show Less </Typography>
                </Button>
            ) : (
                <Button variant="contained" className={classes.loadMoreButton} onClick={handleLoadMore} >
                    <Typography variant="body1" className={classes.loadMoreButtonText} > Load More </Typography>
                </Button>
            )}
        </>
        ) : (
        <>
            {videos.map((element, index) => (
                index >= playlistIndex &&
            <>
                {index !== 0 && <hr style={{opacity: '40%'}} />}
                <Grid item className={classes.playlistItem} xs={12} md={12} style={{minWidth: '30vw'}}>
                    <Button className={classes.playlistImgWrapper} style={isSmallDevice? { width: '100%', paddingTop: "56.25%" } : {}} onClick={() => setPlaylistIndex(index)}>
                            <img  
                                className={classes.playlistImg} 
                                src={element.thumbnail} 
                                alt=''
                            />
                            <div className={classes.videoDurationWrapper}>
                                <Typography className={classes.videoDurationText} variant={isLargeDevice? "body1" : "body2"}>
                                    {formatTime(element.duration)}
                                </Typography>
                            </div>
                    </Button>

                    {!isSmallDevice && 
                    <Button className={classes.textContainer} onClick={() => setPlaylistIndex(index)}>
                        <div className={classes.textWrapper} >
                            <Typography className={classes.text} variant={isLargeDevice? "body1" : "body2"}>
                                {element.title}
                            </Typography>
                        </div>
                    </Button>
                    }
                </Grid>
            </>
            ))}
        </>
        )}
        </>
    );
}

export default VideoList;