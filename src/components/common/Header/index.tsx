import React from 'react'
import { AppBar, createStyles, Hidden, Icon, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { globalStyles } from 'src/styles/global-styles'
import Transactions from '../Transactions'
import UserHeader from './User'
import Logo from './Logo'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  flexEvenly: {
    ...globalStyles.flexEvenly,
  },
  alignCenter: {
    ...globalStyles.alignCenter,
  },
  appBar: {
    height: 100,
    background: 'linear-gradient(to right, #51b1c8, #57de8b)',
  },
  container: {
    width: '100vw',
    height: '100%',
    display: 'flex',
  },
  flex: {
    display: 'flex',
  },
  fullWidth: {
    width: '100%',
    ...globalStyles.alignCenter,
  },
  newLogo: {
    width: 90,
    height: 60,
    borderRadius: 0,
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('xs')]: {
      width: 70,
      height: 47,
      paddingLeft: 5,
    },
  },
  companyName: {
    maxWidth: 200,
    ...globalStyles.alignCenter,
  },
  head: {
    ...globalStyles.flexBetween,
    margin: '0 20px',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    paddingLeft: 100,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  titleCompany: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 20,
    fontWeight: 'bold',
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  phoneWrapper: {
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  phoneIcon: {
    color: '#57de8b',
    fontSize: '18px',
  },
  langLabel: {
    color: 'white',
    paddingLeft: 10,
    fontWeight: 'bold',
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 10,
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 5,
    }
  },
  menuIcon: {
    paddingLeft: 50,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 20,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  isButtonVisible: boolean,
  user: User | null,
  company: Company | null,
}

const Header = ({ isButtonVisible, user, company, classes }: Props) => (
  <AppBar className={classes.appBar} elevation={0}>
    <div className={classes.container}>
      <div className={classes.fullWidth}>
        <div className={classes.head}>
          <div className={classes.flex}>
            <Logo />

            {(company && isButtonVisible)
              ? <Hidden smDown implementation="css" className={classes.alignCenter}>
                <div className={classes.companyName}>
                  <Typography variant="subtitle1" className={classes.titleCompany}>
                    {company.name}
                  </Typography>
                </div>
              </Hidden>
              : <>
                <Hidden smDown implementation="css" className={classes.alignCenter}>
                  <Typography variant="subtitle1" className={classes.title}>
                    Сервис финансово-управленческого учета для бизнеса
                  </Typography>
                </Hidden>
              </>}
          </div>

          {(company && isButtonVisible)
            ? <>
              <Hidden mdUp implementation="css" className={classes.alignCenter}>
                <Typography variant="subtitle1" className={classes.titleCompany}>
                  {company.name}
                </Typography>
              </Hidden>

              <Hidden smDown implementation="css" className={classes.alignCenter}>
                <Transactions />
              </Hidden>
            </>
            : <Hidden mdUp implementation="css" className={classes.alignCenter}>
              <Typography variant="subtitle1" className={classes.title}>
                Финансовый учет
              </Typography>
            </Hidden>}

          <div className={classes.alignCenter}>
            {user
              ? <UserHeader />
              :
              <div className={classes.flex}>
                <a href="tel:+380967772748" className={classes.phoneWrapper}>
                  <Icon className={classes.phoneIcon}>phone</Icon>
                </a>
                <div className={classes.flex}>
                  <Typography variant="subtitle1" className={classes.langLabel}>RUS</Typography>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>
  </AppBar>
)

export default withStyles(styles)(connector(Header))
