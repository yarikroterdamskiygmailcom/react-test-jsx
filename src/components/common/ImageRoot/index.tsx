import React from 'react'
import { Avatar, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import topRightImage from 'src/assets/images/topRightSomething.png'
import connector from './connector'
import { Company } from '../../../redux/app/company/types'

const styles = (theme: Theme) => createStyles({
  topRightImage: {
    top: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    borderRadius: 0,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  company: Company | null,
}

const ImageRoot = ({ classes, company }: Props) => company ? null : (
  <Avatar
    src={topRightImage}
    alt="top right image"
    className={classes.topRightImage}
  />
)

export default withStyles(styles)(connector(ImageRoot))
