import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    playlistItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5%',
        maxHeight: '15vh',
        // height: '28.125%',
    },
    playlistImgWrapper: {
        position: 'relative',
        width: '50%',
        height: '28.125%',
        paddingTop: '28.125%',
        borderRadius: '7px',
        overflow: 'hidden',
    },
    playlistImg: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '100%',
    },
    textWrapper: {
        width: '50%',
    },
}));