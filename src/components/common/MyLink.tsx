import React from 'react'
import { Link } from 'react-router-dom'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  link: {
    color: '#45a5b9',
    textAlign: 'center',
    textDecoration: 'underline',
    fontFamily: 'Gotham Pro, sans-serif',
  },
})

const MyLink = ({ classes, linkTo, linkText }: Props) =>
  linkTo ? (
      <Link to={linkTo}>
        <Typography variant="subtitle1" className={classes.link}>{linkText}</Typography>
      </Link>
    )
    : null

interface Props extends WithStyles<typeof styles> {
  linkTo: string,
  linkText?: string,
}

export default withStyles(styles)(MyLink)
