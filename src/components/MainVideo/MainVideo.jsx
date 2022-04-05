import React from 'react';
import useStyles from './styles';
import ReactPlayer from 'react-player/lazy';

const MainVideo = (url) => {
    const classes = useStyles();
    console.log(url.video)
    return (
        <>
        MainVideo 
            <ReactPlayer 
                url={url.video}
                controls={true}
                width="55vw"
                muted={false}
            />
        </>
    );
}

export default MainVideo;