import React from 'react'
import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import AuthLink from './AuthLink'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.dark,
      textAlign: 'center',
    },
    title: {
      fontSize: 40,
      marginTop: 20,
      fontWeight: 950,
      [theme.breakpoints.down('sm')]: {
        fontSize: 36,
        marginTop: 0,
      },
    },
    description: {
      marginTop: 0,
      marginBottom: 20,
      display: 'block',
      lineHeight: 1.444,
    },
  })

const Signature = ({ classes, title, linkTo, linkText, description }: Props) => (
  <div className={classes.root}>
    <Typography color="inherit" className={classes.title}>{title}</Typography>

    {linkTo && <AuthLink linkTo={linkTo} linkText={linkText} />}

    <Typography color="inherit" variant="subtitle1" className={classes.description}>{description}</Typography>
  </div>
)

interface Props extends WithStyles<typeof styles> {
  title: string,
  linkTo?: string,
  linkText?: string,
  description: string,
}

export default withStyles(styles)(Signature)
