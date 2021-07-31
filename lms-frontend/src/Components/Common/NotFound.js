import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://error404.fun/img/full-preview/2x/24.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    },
  }));

function NotFound() {
    const classes = useStyles();
    return (
        <div container component="main" className={classes.image}>
            {/* <h1>''</h1> */}
        </div>
    )
}

export default NotFound
