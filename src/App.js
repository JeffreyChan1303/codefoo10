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
        query: '(min-width: 960px)',
    })
    const isSmallDevice = useMediaQuery({
        query: '(max-width: 550px)',
    })
    const isLargeDevice = useMediaQuery({
        query: '(min-width: 1250px)',
    })


    const getVideoData = (startIndex, videoCount) => {
        getIGNData(`/videos?startIndex=${startIndex}&count=${videoCount}`)
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
            <Header isSmallDevice={isSmallDevice} />
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
                            isLargeDevice={isLargeDevice}
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
                            isLargeDevice={isLargeDevice}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={0} style={isSmallDevice? { width: '98%', margin: '0 auto' } : { width: '90%', margin: '0vw auto' }}>
                    <Grid item xs={12} style={{ padding: '0 0 2em'}}>
                        <MainVideo 
                            getVideoData={getVideoData} 
                            videoData={video.current}
                            isMediumDevice={isMediumDevice}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                            startIndex={startIndex}
                            setStartIndex={setStartIndex}
                            isSmallDevice={isSmallDevice}
                            isLargeDevice={isLargeDevice}
                        />
                    </Grid>
                    <Grid container direction='row' spacing={1} style={{ flexWrap: 'nowrap', overflowX: 'scroll'}}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={false}
                            formatTime={formatTime}
                            startIndex={startIndex}
                            setStartIndex={setStartIndex}
                            isSmallDevice={isSmallDevice}
                            isLargeDevice={isLargeDevice}
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