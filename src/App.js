import React, { useState, useEffect, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import { getIGNData } from './api/index';

import { Header, MainVideo, Review, VideoList } from './components';

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
                            />
                        <Review />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VideoList videoArr={videoArr} isMediumDevice={true} />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={5} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} >
                        <MainVideo 
                            getVideoData={getVideoData} 
                            videoData={video.current.url}
                            isMediumDevice={false}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                        />
                    </Grid>
                    <Grid container direction='row' spacing={1} style={{ flexWrap: 'nowrap', overflowX: 'scroll'}}>
                        <VideoList videoArr={videoArr} isMediumDevice={false} />
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