import React, { useState, useEffect, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import { getIGNData } from './api/index';

import { Header, MainVideo, Review, VideoList } from './components';


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

const App = () => {
    const [videoArr, setVideoArr] = useState([]);
    const [theaterMode, setTheaterMode] = useState(false);
    const video = useRef({url: ''});

    const isMediumDevice = useMediaQuery({
        query: '(min-width: 960px)'
    })

    console.log(video.current);
    console.log(videoArr);


    const getVideoData = (startIndex, videoCount) => {
        getIGNData(`http://localhost:3000/videos?startIndex=${startIndex}&count=${videoCount}`)
            .then(({ data }) => {
                console.log(data);
                video.current = {url: data[0].assets};
                setVideoArr(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getVideoData(0, 10)
    }, []);

    return (
        <>
            <CssBaseline />
            <Header />
            {console.log(!theaterMode)}
            {isMediumDevice && !theaterMode? (
                <Grid container spacing={5} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} md={8} >
                        <MainVideo 
                            getVideoData={getVideoData} 
                            videoData={video.current.url} 
                            isMediumDevice={true}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                            />
                        <Review />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={true}
                            formatTime={formatTime}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={5} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} >
                        <MainVideo 
                            getVideoData={getVideoData} 
                            videoData={video.current.url}
                            isMediumDevice={isMediumDevice}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                        />
                    </Grid>
                    <Grid container direction='row' spacing={1} style={{ flexWrap: 'nowrap', overflowX: 'scroll'}}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={false}
                            formatTime={formatTime}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Review />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default App;