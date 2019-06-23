import React from 'react'
import { Link } from 'react-router-dom'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  link: {
    marginTop: 20,
    marginBottom: 20,
    color: '#45a5b9',
    textDecoration: 'underline',
  },
})

const AuthLink = ({ classes, linkTo, linkText }: Props) =>
  linkTo ? (
      <Link to={linkTo}>
        <Typography variant="subtitle1" className={classes.link} align="center">{linkText}</Typography>
      </Link>
    )
    : null

interface Props extends WithStyles<typeof styles> {
  linkTo: string,
  linkText?: string,
}

export default withStyles(styles)(AuthLink)
