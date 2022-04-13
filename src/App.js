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
    const [startIndex, setStartIndex] = useState(0);
    const video = useRef({
        URLs: '',
        title: '',
        description: '',
    });

    const isMediumDevice = useMediaQuery({
        query: '(min-width: 960px)'
    })

    console.log(video.current);
    console.log(videoArr);


    const getVideoData = (startIndex, videoCount) => {
        getIGNData(`http://localhost:3000/videos?startIndex=${startIndex}&count=${videoCount}`)
            .then(({ data }) => {
                console.log(data);
                video.current = {
                    URLs: data[0].assets,
                    title: data[0].metadata.title,
                    description: data[0].metadata.description,
                };
                setVideoArr(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getVideoData(startIndex, 10)
    }, [startIndex]);

    return (
        <>
            <CssBaseline />
            <Header />
            {console.log(!theaterMode)}
            {isMediumDevice && !theaterMode? (
                <Grid container spacing={2} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} md={8} >
                        <MainVideo 
                            getVideoData={getVideoData} 
                            videoData={video.current}
                            isMediumDevice={true}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                            startIndex={startIndex}
                            setStartIndex={setStartIndex}
                            />
                        <Review videoData={video.current} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={true}
                            formatTime={formatTime}
                            startIndex={startIndex}
                            setStartIndex={setStartIndex}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={5} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} >
                        <MainVideo 
                            getVideoData={getVideoData} 
                            videoData={video.current}
                            isMediumDevice={isMediumDevice}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                            startIndex={startIndex}
                            setStartIndex={setStartIndex}
                        />
                    </Grid>
                    <Grid container direction='row' spacing={1} style={{ flexWrap: 'nowrap', overflowX: 'scroll'}}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={false}
                            formatTime={formatTime}
                            startIndex={startIndex}
                            setStartIndex={setStartIndex}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Review videoData={video.current} />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default App;