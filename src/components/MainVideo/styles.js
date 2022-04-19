import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%',
        borderRadius: '7px',
        overflow: 'hidden',
    },
    reactPlayer: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',

    },
    playerControls: {
        position: 'absolute',
        width: '100%',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: '1',
        boxShadow: 'inset 0 -30px 50vw #000000, inset 0 -30px 30vw #000000'
    },
    videoTitle: {
        color: 'white',
        margin: '2% 0 2% 4%',
        textOverflow: 'ellipsis',
    },
    shareIcon: {
        color: 'white',
        transform: 'scaleX(-1)',
        right: '0',
        top: '0',
    },
    bottomControls: {
        padding: '0',
        // backgroundColor: 'rgba(0,0,0,.20)',
    },
    bottomIcons: {
        color: "white",
    },
    progressBar: {
        width: '90%',
        transform: 'translateX(5%)',
        color: 'white',
        '& .MuiSlider-thumb': {
            color: 'rgba(191,19,19,255)',
            border: '3px solid white'
        },
        '& .MuiSlider-rail': {
            opacity: '15%',
        }
    },
    progressBufferWrapper: {
        position: 'relative',
        width: '90%',
        height: '2px',
        margin: '0 5.5% 0 4.5%', // this is because the progress slider from Mui is strangely uncentered
    },
    progressBuffer: {
        position: 'absolute', 
        transform: 'translateY(15px)',
        backgroundColor: 'rgb(150, 0, 0, 1)',
        top: '0',
        bottom: '0',
        left: '0',
    },





    fourKWrapper: {
        height: '100%',
        display: 'flex',
        // justifyContent: 'center',
    },
    fourKBackground: {
    
    },
    closedCaptionBackground: {
        position: 'absolute',
        width: '14px',
        height: '14px',
        zIndex: '-1',
        backgroundColor: 'rgba(215,19,19,255)',
    },
    theaterModeButton: {
        position: 'relative',
        width: '18px',
        height: '16px',
        border: 'solid 1px white',
        borderRadius: '2px',
    },
    theaterModeBridge: {
        // position: 'absolute',
        width: '5px',
        height: '1.75px',
        backgroundColor: 'white',
        margin: 'auto',
        marginTop: '6px',
        // top: '0',
        // bottom: '0',
        // left: '0',
        // right: '0',
    },
    theaterModeLeftArrow: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        transform: 'translate(-30%, -15%)',
    },
    theaterModeRightArrow: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        transform: 'translate(10%, -15%)',
    },



    fullScreenOffOuter: {
        position: 'relative',
        width: '18px',
        height: '16px',
        border: 'solid 1px white',
        borderRadius: '2px',
    },
    fullScreenOffInner: {
        position: 'absolute',
        left: '0',
        bottom: '0',
        width: '6px',
        height: '5px',
        backgroundColor: 'white',
        borderRadius: '0 1px 0 0'
    },
    fullScreenOnOuter: {
        position: 'relative',
        width: '18px',
        height: '16px',
        border: 'solid 2px white',
        borderRadius: '3px',
        backgroundColor: 'white',
    },
    fullScreenOnInner: {
        position: 'absolute',
        right: '0',
        top: '0',
        width: '6px',
        height: '5px',
        backgroundColor: 'rgb(215, 0, 0)',
        borderRadius: '0 1px 0 0',
        zIndex: '2',
    }
}));