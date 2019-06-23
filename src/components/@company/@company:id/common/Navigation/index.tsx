import React from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { Company } from 'src/redux/app/company/types'
import { CompanyNavigation } from 'src/constants'
import ButtonNavigation from './ButtonNavigation'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    width: 'calc(100vw - 300px)',
    display: 'flex',
    overflowX: 'auto',
    '@media (max-width: 1279px)': {
      width: 'calc(100vw - 265px)'
    },
    '@media (max-width: 1023px)': {
      width: '100vw'
    },
  },
  link: {
    ...globalStyles.fullWidth,
  },
  activeNavLink: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
})

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  company: Company | null,
}

const Navigation = ({ classes, company }: Props) => (
  <div className={classes.root}>
    {company && CompanyNavigation.map((value, index) => (
      <NavLink
        key={index}
        className={classes.link}
        activeClassName={classes.activeNavLink}
        to={`/company/${company._id}/${value.path}`}
      >
        <ButtonNavigation path={value.path} title={value.title} />
      </NavLink>
    ))}
  </div>
)

export default withStyles(styles)(withRouter(connector(Navigation)))
