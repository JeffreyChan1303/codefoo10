import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Slider, Grid, Typography, IconButton, Select, Tooltip } from '@material-ui/core';
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
import screenfull from 'screenfull';

import useStyles from './styles';



// import PauseRoundedIcon from '@mui/icons-material/PauseRounded';


const formatTime = (seconds) => {
    if (isNaN(seconds)) {
        return '00:00';
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if(hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
}


const MainVideo = ({videoData, getVideoData, isMediumDevice, theaterMode, setTheaterMode}) => {
    const classes = useStyles();
    const videoArr = [];
    const qualityArr = [];

    console.log(videoData);

    const playerContainerRef = useRef(null)
    const playerRef = useRef(null);

    const [videoState, setVideoState] = useState({
        playing: false,
        muted: false,
        volume: .5,
        played: null,
        loaded: null,
        seeking: false,
        video: {
            url: null,
            quality: null,
            apiIndex: 0,
        },
        looping: false,
        isFullScreen: false,
    });
    const {playing, muted, volume, played, video, looping, isFullScreen} = videoState;

    if (videoData) { // add all video content into arrays
        for (let i = 0; i < videoData.length; i++) {
            videoArr.push(videoData[i].url);
            qualityArr.push(videoData[i].height);
        }
    }

    
    
    // console.log(video)
    // console.log(qualityArr);

    const qualityChange = (e) => {
        setVideoState({ ...videoState,
            video: { 
                quality: e.target.value, 
                url: videoArr[qualityArr.indexOf(e.target.value)],
            }
        });
        
    };

    const resumeWhereLeftOff = () => {
        playerRef.current.seekTo(videoState.played);
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
    const handleProgress = (changeState) => {
        // console.log(changeState);
        if (!videoState.seeking) {
            setVideoState({ ...videoState, ...changeState});
        }
        console.log({...videoState})
        // console.log(changeState)
    };

    const handleProgressSeekChange = (e, newValue) => {
        setVideoState({ ...videoState, played: parseFloat(newValue / 100) });
    };
    const handleProgressSeekMouseDown = (e) => {
        setVideoState({ ...videoState, seeking: true });
    };

    const handleProgressSeekMouseUp = (e, newValue) => {
        setVideoState({ ...videoState, seeking: false });
        playerRef.current.seekTo(newValue / 100);

    };


    const handleEnded = () => {
        if (!videoState.looping) {
            getVideoData(video.apiIndex + 1, 10)
            setVideoState({ ...videoState, played: 0, video: { apiIndex: video.apiIndex + 1 } })
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
                        <Grid item>
                            <Typography variant="h6" style={{ color: "#fff" }}>Video Title</Typography>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" startIcon={<ReplyRoundedIcon/>}/>
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
                                <ClosedCaptionIcon fontSize="medium"/>
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

