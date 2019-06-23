import React from 'react'
import laptop from 'src/assets/images/laptop.png'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    laptopWrapper: {
      flex: 1,
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        marginTop: 50,
        marginBottom: 50,
        textAlign: 'center',
      },
    },
    laptopImage: {
      [theme.breakpoints.down('sm')]: {
        width: 579,
        height: 357,
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    laptopVideo: {
      top: 28,
      left: 98,
      width: 520,
      height: 334,
      position: 'absolute',
      [theme.breakpoints.down('sm')]: {
        top: 24,
        left: 78,
        width: 420,
        height: 270,
      },
      [theme.breakpoints.down('xs')]: {
        position: 'relative',
        width: '100%',
        top: 0,
        left: 0,
      },
    },
  })

const LaptopVideoComponent = ({ classes }: WithStyles) => (
  <div className={classes.laptopWrapper}>
    <img src={laptop} alt="laptop" className={classes.laptopImage} />
    <iframe
      className={classes.laptopVideo}
      src="https://www.youtube.com/embed/KJtf2TEVUgk"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  </div>
)

export default withStyles(styles)(LaptopVideoComponent)
