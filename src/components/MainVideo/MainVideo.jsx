import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Slider, Grid, Typography, IconButton, Tooltip, Popover } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded';
import ClosedCaptionIcon from '@material-ui/icons/ClosedCaption';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import FourKRoundedIcon from '@material-ui/icons/FourKRounded';
import screenfull from 'screenfull';
import useStyles from './styles';

let count = 0;

const MainVideo = ({ videoData, isMediumDevice, theaterMode, setTheaterMode, formatTime, playlistIndex, setPlaylistIndex, isSmallDevice, isLargeDevice }) => {
    const classes = useStyles();
    const videoArr = [];
    const qualityArr = [];

    const playerContainerRef = useRef(null)
    const playerRef = useRef(null);
    const controlsRef = useRef(null);

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';
    const elapsedTime = formatTime(currentTime);
    const totalDuration = formatTime(duration);

    const [videoState, setVideoState] = useState({
        playing: false,
        muted: false,
        volume: .5,
        played: null,
        loaded: null,
        video: {
            url: null,
            quality: null,
            qualityIndex: null,
        },
        looping: false,
        isFullScreen: false,
        changingQuality: false,
    });
    const {playing, muted, volume, played, video, looping, isFullScreen} = videoState;


    // push video data into 2 arrays
    for (let i = 0; i < videoData.URLs.length; i++) {
        videoArr.push(videoData.URLs[i].url);
        qualityArr.push(videoData.URLs[i].height);
    }
    

    const qualityChange = (quality, index) => {
        setVideoState({ ...videoState,
            video: { 
                quality: quality,
                url: videoArr[index],
                qualityIndex: index,
            },
            changingQuality: true,
        });
        handlePopoverClose();
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

    // I put ustState for seeking because it didn't work for some reason when it was a property of the videoState object.
    const [seeking, setSeeking] = useState(false); 
    const handleProgress = (changeState) => {
        if (count > 3) {
            controlsRef.current.style.visibility = "hidden";
            count = 0;
        }

        if (controlsRef.current.style.visibility === "visible") {
            count += 1;
        }

        if (!seeking) {
            setVideoState({ ...videoState, ...changeState});
        }
    };

    const handleProgressSeekChange = (e, newValue) => {
        setVideoState({ ...videoState, played: parseFloat(newValue / 100) });
    };
    const handleProgressSeekMouseDown = (e) => {
        setSeeking(true);
    };

    const handleProgressSeekMouseUp = (e, newValue) => {
        setSeeking(false);
        playerRef.current.seekTo(newValue / 100);

    };

    const handleEnded = () => {
        if (!videoState.looping && (playlistIndex < 20)) {
            setPlaylistIndex(playlistIndex + 1)
        }
    }

    function ValueLabelComponent(props) {
        const { children, open, value } = props;
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }

    function disableScroll() {
        // Get the current page scroll position

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }
      
    function enableScroll() {
        window.onscroll = function() {};
    }

    const handleMouseMove = () => {
        controlsRef.current.style.visibility = "visible";
        count = 0;
    }

    // quality popup functions
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverClick = (event) => {
        setAnchorEl(event.currentTarget);
        disableScroll();
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        enableScroll();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div 
                ref={playerContainerRef} 
                className={classes.playerWrapper}
                onMouseMove={handleMouseMove}
            >
                <ReactPlayer id="ReactPlayer"
                    ref={playerRef}
                    className={classes.reactPlayer}
                    url={video.url? videoArr[videoState.video.qualityIndex] : videoArr[videoArr.length - 1]}                   
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

                <div className={classes.playerControls} ref={controlsRef}>
                    <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{padding: '16'}}>
                        <Grid item xs={10} >
                            <Typography 
                                className={classes.videoTitle} 
                                variant={isSmallDevice? "body2" : "h6" } 
                            >
                                {videoData.title}
                            </Typography>
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

                        {/* Bottom left controls */}

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

                                <div style={{ width: '15vw', maxWidth: '80px', display: 'flex' }}>
                                    <Slider 
                                        min={0} 
                                        max={100} 
                                        defaultValue={100}
                                        value={volume * 100} 
                                        className={classes.progressBar}
                                        onChange={handleVolumeChange}
                                        onChangeCommitted={handleVolumeSeekUp}
                                    />
                                </div>

                                { !isSmallDevice &&
                                <Typography style={{color: "white", cursor: 'default', marginLeft: '15px' }} 
                                    variant={isLargeDevice? "body1" : "body2"} 
                                >
                                    {elapsedTime}/{totalDuration}
                                </Typography>
                                }
                            </Grid>
                        </Grid>

                        {/* Bottom right side */}

                        <Grid item>
                            <Button aria-describedby={id} variant="text" onClick={handlePopoverClick}>
                                <Typography variant="h6" style={{ fontWeight: "bold", color: "white", marginTop: "1px"}}>HD</Typography>
                                <div className={classes.fourKWrapper} >
                                    <FourKRoundedIcon fontSize="medium" color="primary" />
                                    <div className={classes.fourKBackground} />
                                </div>
                            </Button>
                            <Popover 
                                container={playerContainerRef.current}
                                id={id}
                                className={classes.popover}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            >
                                <Grid container direction="column" style={{ position: 'sticky' }}>
                                    {qualityArr.map((item, index) => (
                                        <Button onClick={() => qualityChange(item, index)} className={classes.popoverButtons} variant="contained" >
                                            {item === videoState.video.quality && <Typography variant="body1">-&nbsp;</Typography>}
                                            <Typography variant="body1">
                                                {item}p
                                            </Typography>
                                        </Button>
                                    ))}
                                </Grid>
                            </Popover>

                            {!isSmallDevice &&
                            <IconButton className={classes.bottomIcons}>
                                <ClosedCaptionIcon fontSize="medium" />
                                <div className={classes.closedCaptionBackground} />
                            </IconButton>
                            }

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

