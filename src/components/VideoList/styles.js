import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    playlistItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5%',
        maxHeight: '28.125%',
    },
    playlistLink: {
        textDecoration: 'none',
        color: 'black',
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
    textContainer: {
        position: 'relative',
        width: '50%',
        paddingTop: '28.125%',
    },
    textWrapper: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '100%',
    },
    text: {
        position: 'relative',
        height: '100%',
        width: '100%',
        textOverflow: 'ellipsis',
        overflowY: 'hidden',
    },
    loadMoreButton: {
        color: theme.color,
        width: '90%',
        margin: '5% 5%',
        backgroundColor: 'rgb(215, 0, 0)',
        color: 'white',
    }
}));