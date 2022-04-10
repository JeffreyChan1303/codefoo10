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
        boxShadow: 'inset 0 -10px 50vw #000000',
    },
    bottomControls: {
        padding: '0',
        // backgroundColor: 'rgba(0,0,0,.20)',
    },
    bottomIcons: {
        color: "white",
    },
    volumeSlider: {
        width: '100px',
    },
    progressBar: {
        width: '90%',
        transform: 'translateX(5%)',
        color: 'white',
        '& .MuiSlider-thumb': {
            color: 'red',
            border: '3px solid white'
        },
        '& .MuiSlider-rail': {
            opacity: '20%',
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
        backgroundColor: 'rgb(120, 0, 0, 1)',
        top: '0',
        bottom: '0',
        left: '0',
    },

}));