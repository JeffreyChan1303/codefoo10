import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';


import useStyles from './styles';


const VideoList = ({videoArr, isMediumDevice}) => {
    const classes = useStyles();
    const [loadMore, setLoadMore] = useState(false)
    const thumbnailArr = [];
    const titleArr = [];
    const indexArr = [];

    const handleLoadMore = () => {
        setLoadMore(!loadMore);
    }

    // console.log(videoArr)
    // console.log(isMediumDevice)

    for (let i = 0; i < videoArr.length; i++) {
        let temp = videoArr[i]
        thumbnailArr.push(temp.thumbnails[temp.thumbnails.length - 1].url); // inputs the highest quality thumbnail for every video into the array
        titleArr.push(temp.metadata.title); // inputs the title of the video
        indexArr.push(i);
    }
    // console.log(thumbnailArr[0])

    return (
        <>
        {isMediumDevice? (
        <>
            {indexArr.map((index) => index < (loadMore? indexArr.length : 4) && (
            <>
                {index != 0 && <hr style={{opacity: '40%'}} />}
                <Grid item className={classes.playlistItem} xs={4} md={12}>
                    <div className={classes.playlistImgWrapper}>
                        <a className={classes.playlistLink} href='' > 
                            <img  
                                className={classes.playlistImg} 
                                src={thumbnailArr[index]} 
                                alt=''
                            />
                        </a>
                    </div>
                    <div className={classes.textContainer} >
                        <div className={classes.textWrapper} >
                            <a className={classes.playlistLink} href=''>
                                <Typography className={classes.text} variant="body2">{titleArr[index]}</Typography>
                            </a>
                        </div>
                    </div>
                </Grid>
            </>
            ))}
            {!loadMore && 
                <Button variant="contained" className={classes.loadMoreButton} onClick={handleLoadMore} >
                    <Typography variant="body1"> Load More </Typography>
                </Button>
            }
        </>
        ) : (
        <>
            {indexArr.map((index) => (
            <>
                {index != 0 && <hr style={{opacity: '40%'}} />}
                <Grid item className={classes.playlistItem} xs={12} md={12} style={{minWidth: '30vw'}}>
                    <div className={classes.playlistImgWrapper} >
                        <a className={classes.playlistLink} href='' >
                            <img  
                                className={classes.playlistImg} 
                                src={thumbnailArr[index]} 
                                alt=''
                            />
                        </a>
                    </div>
                    <div className={classes.textContainer}>
                        <div className={classes.textWrapper} >
                            <a className={classes.playlistLink} href='' >
                                <Typography className={classes.text} variant="body2">{titleArr[index]}</Typography>
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