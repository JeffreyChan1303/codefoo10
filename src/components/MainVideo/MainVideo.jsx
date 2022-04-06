import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Button, Slider, Select, Grid, Typography, IconButton } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';

import useStyles from './styles';


// import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
const MainVideo = ({video}) => {
    const classes = useStyles();
    console.log(video);
    const videos = [];

    const [quality, setQuality] = useState({
        height: 0,
        url: '',
    })

    const playing = useRef(false);


    if (video) {
        for (let i = 0; i < video.length; i++) {
            videos.push(video[i].url)
        }
    }
    console.log(videos);

    function reverse(value) {
        value = !value;
        console.log(value);
    };
    return (
        <>
            <div className={classes.playerWrapper}>
                <ReactPlayer id="ReactPlayer"
                    className={classes.reactPlayer}
                    url={videos}
                    // controls={true}
                    width="100%" 
                    height="100%"
                    // muted={muted}
                    playing={playing.current}
                    onEnded={() => {

                    }}
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
                            <Slider className={classes.progressBar} min={0} max={100} defaultValue={20} style={{padding: '0, 10px'}} />
                        </Grid>

                        <Grid item >
                            <Grid container direction="row" alignItems="center">
                                <IconButton className={classes.bottomIcons}>
                                    <PlayArrowIcon fontSize="large" />
                                </IconButton>

                                <IconButton className={classes.bottomIcons}>
                                    <AllInclusiveRoundedIcon fontSize="large" />
                                </IconButton>

                                <IconButton className={classes.bottomIcons}>
                                    <VolumeUpRoundedIcon fontSize="large" />
                                </IconButton>

                                <Slider min={0} max={100} defaultValue={100} className={classes.volumeSlider} />

                                <Button variant="text" style={{ color: "white", margin: '16px' }}>
                                    <Typography>1:34 / 4:17</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Bottom right side */}

                        <Grid item>
                            <Button variant="text" className={classes.bottomIcons}>
                                <Settings fontSize="large" />
                            </Button>

                            <IconButton className={classes.bottomIcons}>
                                <ClosedCaptionIcon fontSize="large"/>
                            </IconButton>

                            <IconButton className={classes.bottomIcons}>
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