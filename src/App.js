import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Backdrop, CircularProgress } from '@material-ui/core';
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
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const [video, setVideo] = useState({
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


    const getVideoData = async (startIndex) => {
        setLoading(true);

        try {
            const { data } = await getIGNData(startIndex);
            setVideoArr(data);
            setVideo({
                URLs: data[0].assets,
                title: data[0].metadata.title,
                description: data[0].metadata.description,
            });
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getVideoData(startIndex)
        setPlaylistIndex(0)
    }, [startIndex]);

    useEffect(() => {
        console.log('test', videoArr, playlistIndex)

        if (videoArr.length !== 0) {
            setVideo({
                URLs: videoArr[playlistIndex].assets,
                title: videoArr[playlistIndex].metadata.title,
                description: videoArr[playlistIndex].metadata.description,
            })
        }
    }, [playlistIndex, videoArr])

    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    return (
        <>
            <CssBaseline />
            <Header isSmallDevice={isSmallDevice} setStartIndex={setStartIndex} />
            {isMediumDevice && !theaterMode? (
                <Grid container spacing={2} style={{ width: '85%', margin: '0vw auto' }}>
                    <Grid item xs={12} md={8} >
                        <MainVideo 
                            videoData={video}
                            isMediumDevice={true}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                            playlistIndex={playlistIndex}
                            setPlaylistIndex={setPlaylistIndex}
                            isLargeDevice={isLargeDevice}
                            />
                        <Review videoData={video} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={true}
                            formatTime={formatTime}
                            playlistIndex={playlistIndex}
                            setPlaylistIndex={setPlaylistIndex}
                            isLargeDevice={isLargeDevice}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={0} style={isSmallDevice? { width: '98%', margin: '0 auto' } : { width: '90%', margin: '0vw auto' }}>
                    <Grid item xs={12} style={{ padding: '0 0 2em'}}>
                        <MainVideo 
                            videoData={video}
                            isMediumDevice={isMediumDevice}
                            theaterMode={theaterMode}
                            setTheaterMode={setTheaterMode}
                            formatTime={formatTime}
                            playlistIndex={playlistIndex}
                            setPlaylistIndex={setPlaylistIndex}
                            isSmallDevice={isSmallDevice}
                            isLargeDevice={isLargeDevice}
                        />
                    </Grid>
                    <Grid container direction='row' spacing={1} style={{ flexWrap: 'nowrap', overflowX: 'scroll'}}>
                        <VideoList 
                            videoArr={videoArr} 
                            isMediumDevice={false}
                            formatTime={formatTime}
                            playlistIndex={playlistIndex}
                            setPlaylistIndex={setPlaylistIndex}
                            isSmallDevice={isSmallDevice}
                            isLargeDevice={isLargeDevice}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Review videoData={video} />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default App;