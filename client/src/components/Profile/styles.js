import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    paddingBottom: '0',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  profileContainer: {
    width: '100%',
    minHeight: "180px",
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    right: '5px',
    top: '5px',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 1)',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  avatarContainer: {
    width: '110px',
    height: '110px',
    position: 'absolute',
    bottom: '-10px',
    left: '0',
    right: '0',
    marginInline: 'auto',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: "100px",
    height: "100px",
  },
  editAvatar: {
    position: 'absolute', 
    bottom: '0', 
    right: '5px', 
    width: '30px', 
    height: '30px', 
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '50%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: "flex",
    justifyContent: 'space-around',
    gap: '15px',
  },
}));