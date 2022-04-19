import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Slider, Grid, Typography, IconButton, Select, Tooltip, Popover } from '@material-ui/core';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import MenuItem from '@mui/material/MenuItem';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import FourKRoundedIcon from '@mui/icons-material/FourKRounded';
import screenfull from 'screenfull';

import useStyles from './styles';


const MainVideo = ({videoData, getVideoData, isMediumDevice, theaterMode, setTheaterMode, formatTime, startIndex, setStartIndex}) => {
    const classes = useStyles();
    const videoArr = [];
    const qualityArr = [];

    // console.log(videoData);

    const playerContainerRef = useRef(null)
    const playerRef = useRef(null);

    const [videoState, setVideoState] = useState({
        playing: false,
        muted: false,
        volume: .5,
        played: null,
        loaded: null,
        video: {
            url: null,
            quality: null,
            apiIndex: 0,
        },
        looping: false,
        isFullScreen: false,
        changingQuality: false,
    });
    const {playing, muted, volume, played, video, looping, isFullScreen} = videoState;


    // currently videoData is the array of urls for the sources
    if (videoData.URLs) { // add all video content into arrays
        for (let i = 0; i < videoData.URLs.length; i++) {
            videoArr.push(videoData.URLs[i].url);
            qualityArr.push(videoData.URLs[i].height);
        }
    }

    
    
    // console.log(video)
    // console.log(qualityArr);

    const qualityChange = (e) => {
        setVideoState({ ...videoState,
            video: { 
                quality: e.target.value, 
                url: videoArr[qualityArr.indexOf(e.target.value)],
            },
            changingQuality: true,
        });
        
    };

    const resumeWhereLeftOff = () => {
        if(videoState.changingQuality) {
            playerRef.current.seekTo(videoState.played);
            setVideoState({ ...videoState, changingQuality: false })
        }
    }


    const handlePlayPause = () => {
        setVideoState({ ...videoState, playing: !videoState.playing })
    };
    const handleMute = () => {
        setVideoState({ ...videoState, muted: !videoState.muted })
    };
    const handleLoop = () => {
        setVideoState({ ...videoState, looping: !videoState.looping });
    }
    const handleVolumeChange = (e, newVolume) => {
        setVideoState({ 
            ...videoState, 
            volume: parseFloat(newVolume/100), 
            muted: newVolume === 0? true : false
        });
    };
    const handleVolumeSeekUp = (e, newVolume) => {
        setVideoState({ 
            ...videoState, 
            volume: parseFloat(newVolume/100), 
            muted: newVolume === 0? true : false
        }); 
    };
    const toggleFullScreen = () => {
        setVideoState({ ...videoState, isFullScreen: !videoState.isFullScreen });
        screenfull.toggle(playerContainerRef.current);
    };


    const [seeking, setSeeking] = useState(false); // I put this separately because it didn't work for some reason w hen it was a property of the videoState object.
    const handleProgress = (changeState) => {
        // console.log(changeState);
        if (!seeking) {
            setVideoState({ ...videoState, ...changeState});
        }
        console.log(seeking)
        // console.log(changeState)
    };

    const handleProgressSeekChange = (e, newValue) => {
        setVideoState({ ...videoState, played: parseFloat(newValue / 100) });
    };
    const handleProgressSeekMouseDown = (e) => {
        console.log(seeking)
        setSeeking(true);
        console.log(seeking)
    };

    const handleProgressSeekMouseUp = (e, newValue) => {
        setSeeking(false);
        playerRef.current.seekTo(newValue / 100);

    };

    const handleEnded = () => {
        if (!videoState.looping) {
            setStartIndex(startIndex + 1)
        }
    }

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';
    const elapsedTime = formatTime(currentTime);
    const totalDuration = formatTime(duration);

    function ValueLabelComponent(props) { // make this lok better... keep it open when dragging
        const { children, open, value } = props;
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }

    // quality change with popup TEST
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div ref={playerContainerRef} className={classes.playerWrapper}>
                <ReactPlayer id="ReactPlayer"
                    ref={playerRef}
                    className={classes.reactPlayer}
                    url={video.url? video.url : videoArr[videoArr.length - 1]}
                    // controls={true}
                    width="100%" 
                    height="100%"
                    muted={muted}
                    playing={playing}
                    loop={looping}
                    volume={volume}
                    onStart={resumeWhereLeftOff}

                    onEnded={handleEnded}

                    onProgress={handleProgress}
                    progressInterval={500}
                />
                {/* Top Controls */}
                <div className={classes.playerControls} >
                    <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{padding: '16'}}>
                        <Grid item xs={10} >
                            <Typography className={classes.videoTitle} variant="body1" >{videoData.title}</Typography>
                        </Grid>

                        <Grid >
                            <IconButton className={classes.shareIcon}>
                                <ReplyRoundedIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>

                    {/* Bottom Controls */}

                    <Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.bottomControls} >
                        <Grid item xs={12}>
                            <div className={classes.progressBufferWrapper} >
                                <div className={classes.progressBuffer} style={{left: `${videoState.played * 100}%`, width: `${(videoState.loaded - videoState.played) * 100}%`}} />
                            </div>
                            <Slider
                                className={classes.progressBar} 
                                min={0} 
                                max={100} 
                                defaultValue={0}
                                value={played * 100}
                                ValueLabelComponent={(props => (
                                    <ValueLabelComponent {...props} value={elapsedTime} />
                                ))}
                                onChange={handleProgressSeekChange}
                                onMouseDown={handleProgressSeekMouseDown}
                                onChangeCommitted={handleProgressSeekMouseUp}
                                />
                        </Grid>

                        <Grid item >
                            <Grid container direction="row" alignItems="center">
                                <IconButton onClick={handlePlayPause} className={classes.bottomIcons}>
                                    {playing? (
                                    <PauseIcon fontSize="medium" />
                                    ) : (
                                    <PlayArrowIcon fontSize="medium" />
                                    )}
                                </IconButton>

                                <IconButton onClick={handleLoop} className={classes.bottomIcons}>
                                    {looping? (
                                        <AllInclusiveRoundedIcon fontSize="medium" color="primary" />
                                    ) : (
                                        <AllInclusiveRoundedIcon fontSize="medium"/>
                                    )}
                                </IconButton>

                                <IconButton onClick={handleMute} className={classes.bottomIcons}>
                                    {muted? (
                                        <VolumeOffRoundedIcon fontSize="medium" />
                                    ) : (
                                        <VolumeUpRoundedIcon fontSize="medium" />
                                    )}
                                </IconButton>

                                <Slider 
                                    min={0} 
                                    max={100} 
                                    defaultValue={100}
                                    value={volume * 100} 
                                    className={classes.progressBar}
                                    onChange={handleVolumeChange}
                                    onChangeCommitted={handleVolumeSeekUp}
                                    style={{ width: "70px"}}

                                />

                                <Typography style={{color: "white", cursor: 'default', marginLeft: '15px' }} >{elapsedTime}/{totalDuration}</Typography>
                            </Grid>
                        </Grid>

                        {/* Bottom right side */}

                        <Grid item>
                            <Button aria-describedby={id} variant="text" onClick={handleClick}>
                                <Typography variant="h6" style={{ fontWeight: "bold", color: "white", marginTop: "1px"}}>HD</Typography>
                                <div className={classes.fourKWrapper} >
                                    <FourKRoundedIcon fontSize="medium" color="primary"/>
                                    <div className={classes.fourKBackground} />
                                </div>
                            </Button>
                            <Popover 
                                container={playerContainerRef.current}
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                //style={{ width: '100px', height: '100px' }}
                            >
                                <Grid container direction="column">
                                    {qualityArr.map((item) => (
                                        <Button onClick={qualityChange} style={{ textTransform: "none" }}>{item}p</Button>
                                    ))}
                                </Grid>
                            </Popover>

                            {!video.quality && (video.quality = qualityArr[qualityArr.length - 1])} {/* this initializes the select bar on load */}
                            {qualityArr[0] &&
                            <Select 
                                className={classes.bottomIcons} // this has issue when in fullscreen
                                value={video.quality}
                                defaultValue={video.quality }
                                onChange={qualityChange}
                            >
                                {qualityArr.map((item) => (
                                    <MenuItem value={item} >{item}p</MenuItem>
                                ))}
                            </Select>
                            }

                            <IconButton className={classes.bottomIcons}>
                                <ClosedCaptionIcon backgroundColor="primary" fontSize="medium" />
                                <div className={classes.closedCaptionBackground} />
                            </IconButton>

                            {isMediumDevice? (!theaterMode? (
                                <IconButton onClick={() => setTheaterMode(!theaterMode)} className={classes.bottomIcons}>
                                    <div className={classes.theaterModeButton}>
                                        <ArrowLeftRoundedIcon className={classes.theaterModeLeftArrow} fontSize="small"/>
                                        <div className={classes.theaterModeBridge} />
                                        <ArrowRightRoundedIcon className={classes.theaterModeRightArrow} fontSize="small"/>
                                    </div>
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => setTheaterMode(!theaterMode)} className={classes.bottomIcons} >
                                <div className={classes.theaterModeButton}>
                                    <ArrowRightRoundedIcon className={classes.theaterModeLeftArrow} fontSize="small"/>
                                    <ArrowLeftRoundedIcon className={classes.theaterModeRightArrow} fontSize="small"/>
                                </div>
                                </IconButton>
                            )) : (
                                <></>
                            )}

                            <IconButton onClick={toggleFullScreen} className={classes.bottomIcons} >
                                {isFullScreen? (
                                    <div className={classes.fullScreenOnOuter} >
                                        <div className={classes.fullScreenOnInner} />
                                    </div>
                                ) : (
                                    <div className={classes.fullScreenOffOuter} >
                                        <div className={classes.fullScreenOffInner} />
                                    </div>
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default MainVideo;

