import React, { useState, useEffect, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import { getIGNData } from './api/index';

import { Header, MainVideo, Review, VideoList } from './components';

const App = () => {
    const [videoArr, setVideoArr] = useState([]);
    const video = useRef({url: ''});

    const isMediumDevice = useMediaQuery({
        query: '(min-width: 960px)'
    })

    console.log(video.current);
    console.log(videoArr);

    useEffect(() => {
        getIGNData()
            .then(({ data }) => {
                console.log(data);
                video.current = {url: data[0].assets};
                setVideoArr(data);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    return (
        <>
            <CssBaseline />
            <Header />
            {isMediumDevice? (
                <Grid container spacing={5} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} md={8} >
                        <MainVideo videoData={video.current.url} />
                        <Review />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VideoList videoArr={videoArr} isMediumDevice={true} />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={5} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} md={8} >
                        <MainVideo videoData={video.current.url} />
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