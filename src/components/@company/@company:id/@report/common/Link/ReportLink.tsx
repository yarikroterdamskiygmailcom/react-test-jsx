import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'

import connector from './connector'

const styles = createStyles({
  root: {
    font: '500 14px Gotham Pro',
    color: '#313131'
  }
})

interface ReportLinkProps extends WithStyles<typeof styles> {
  id: string,
  children: ReactNode,
  path: string,
}

const ReportLink = ({ id, path, children, classes }: ReportLinkProps) => {
  const url = `/company/${id}/report${path}`
  return (
    <Link className={classes.root} to={url}>{children}</Link>
  )
}

export default withStyles(styles)(connector(ReportLink))
