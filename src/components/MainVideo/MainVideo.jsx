import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Slider, Grid, Typography, IconButton, Select, Tooltip } from '@material-ui/core';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import MenuItem from '@mui/material/MenuItem';
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


const MainVideo = ({videoData}) => {
    const classes = useStyles();
    // console.log(videoData);
    const videoArr = [];
    const qualityArr = [];

    const playerContainerRef = useRef(null)
    const playerRef = useRef(null);
    const [quality, setQuality] = useState('');

    const [videoState, setVideoState] = useState({
        playing: true,
        muted: true,
        volume: .5,
        quality: '480p',
        qualityIndex: 0,
        played: 0,
        seeking: false,

    });
    const {playing, muted, volume, played, seeking} = videoState;

    const handlePlayPause = () => {
        setVideoState({ ...videoState, playing: !videoState.playing })
    };
    const handleMute = () => {
        setVideoState({ ...videoState, muted: !videoState.muted })
    };
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
        screenfull.toggle(playerContainerRef.current);
    };
    const handleProgress = (changeState) => {
        // console.log(changeState);
        if (!videoState.seeking) {
            setVideoState({ ...videoState, ...changeState})
        }
    };

    const handleProgressSeekChange = (e, newValue) => {
        setVideoState({ ...videoState, played: parseFloat(newValue / 100) })
    };
    const handleProgressSeekMouseDown = (e) => {
        setVideoState({ ...videoState, seeking: true });
    };

    const handleProgressSeekMouseUp = (e, newValue) => {
        setVideoState({ ...videoState, seeking: false });
        playerRef.current.seekTo(newValue / 100);
    };

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

    const qualityChange = (event) => {
        setQuality(event.target.value);
    };

    if (videoData) { // add all video content into arrays
        for (let i = 0; i < videoData.length; i++) {
            videoArr.push(videoData[i].url);
            qualityArr.push(videoData[i].height);
        }
    }
    let video = videoArr[0]
    
    // console.log(video)
    // console.log(videoArr);

    return (
        <>
            <div ref={playerContainerRef} className={classes.playerWrapper}>
                <ReactPlayer id="ReactPlayer"
                    ref={playerRef}
                    className={classes.reactPlayer}
                    url={video}
                    // controls={true}
                    width="100%" 
                    height="100%"
                    muted={muted}
                    playing={playing}
                    volume={volume}

                    onProgress={handleProgress}
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

                    <Grid container direction="row" justifyContent="space-between" alignItems="center" style={{padding: "16"}}>
                        <Grid item xs={12}>
                            <Slider 
                                className={classes.progressBar} 
                                min={0} 
                                max={100} 
                                defaultValue={0}
                                value={played * 100}
                                style={{padding: '0, 10px'}}
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
                                    <PauseIcon fontSize="large" />
                                    ) : (
                                    <PlayArrowIcon fontSize="large" />
                                    )}
                                </IconButton>

                                <IconButton className={classes.bottomIcons}>
                                    <AllInclusiveRoundedIcon fontSize="large" />
                                </IconButton>

                                <IconButton onClick={handleMute} className={classes.bottomIcons}>
                                    {muted? (
                                        <VolumeOffRoundedIcon fontSize="large" />
                                    ) : (
                                        <VolumeUpRoundedIcon fontSize="large" />
                                    )}
                                </IconButton>

                                <Slider 
                                    min={0} 
                                    max={100} 
                                    defaultValue={100}
                                    value={volume * 100} 
                                    className={classes.volumeSlider}
                                    onChange={handleVolumeChange}
                                    onChangeCommitted={handleVolumeSeekUp}
                                    />

                                <Button variant="text" style={{ color: "white", margin: '16px' }}>
                                    <Typography>{elapsedTime}/{totalDuration}</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Bottom right side */}

                        <Grid item>
                            <Select
                                className={classes.bottomIcons}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quality}
                                defaultValue={quality}
                                onChange={qualityChange}
                            >
                                {qualityArr.map((item) => (
                                    <MenuItem value={item}>{item}p</MenuItem>
                                ))}
                                
                            </Select>

                            <IconButton className={classes.bottomIcons}>
                                <ClosedCaptionIcon fontSize="large"/>
                            </IconButton>

                            <IconButton onClick={toggleFullScreen} className={classes.bottomIcons}>
                                <FullscreenIcon fontSize="large"/>
                            </IconButton>

                            <IconButton className={classes.bottomIcons}>
                                <PictureInPictureAltIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default MainVideo;