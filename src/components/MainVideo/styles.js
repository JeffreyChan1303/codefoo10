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
        left: '0',
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
    },
    bottomIcons: {
        color: 'white',
    },
    volumeSlider: {
        width: '100px',
    },
    progressBar: {
        width: '90%',
        transform: 'translateX(5%)',
    }
}));