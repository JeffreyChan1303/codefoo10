import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import ReactPlayer from 'react-player/lazy';

import { getIGNData } from './api/index';

import { Header, MainVideo, Review, VideoList } from './components';

const App = () => {
    const [video, setVideo] = useState([]);
    const [videos, setVideos] = useState([]);


    console.log(video);
    console.log(videos);

    useEffect(() => {
        getIGNData()
            .then(({ data }) => {
                console.log(data);
                setVideo({url: data[0].assets});
                setVideos(data);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '80%', margin: '0vw 10vw' }}>
                <Grid item xs={12} md={9} >
                    <MainVideo videoData={video.url} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <VideoList />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Review />
                </Grid>
            </Grid>

        </>
    )
}

export default App;