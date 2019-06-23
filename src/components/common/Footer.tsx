import React from 'react'
import { Avatar, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import classnames from 'classnames'

import { globalStyles } from 'src/styles/global-styles'
import emailIcon from 'src/assets/images/email-icon.png'
import footerLogo from 'src/assets/images/footer_logo.png'
import { FOOTER_LINKS } from 'src/constants'

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: '#202020',
      flexDirection: 'column',
    },
    gridContainer: {
      paddingTop: 60,
      paddingBottom: 60,
      ...globalStyles.flexEvenly,
      position: 'relative',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
        paddingTop: 30,
        paddingBottom: 30,
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'initial',
        padding: 0,
      },
    },
    footerWrapper: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    footerLeftWrapper: {
      maxWidth: 420,
      ...globalStyles.flexBetween,
      [theme.breakpoints.down('md')]: {
        maxWidth: 320,
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto',
        justifyContent: 'space-around',
      },
    },
    footerLink: {
      color: '#c4c4c4',
      lineHeight: 1.499,
      '&:hover': {
        color: '#c4c4c4',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },
    footerLinks: {
      margin: 0,
      columns: 2,
      maxHeight: 180,
      paddingLeft: 0,
      paddingTop: 40,
      marginRight: 65,
      listStyle: 'none',
      ...globalStyles.alignCenter,
      [theme.breakpoints.down('lg')]: {
        marginRight: 0,
      },
      [theme.breakpoints.down('md')]: {
        paddingTop: 20,
      },
      [theme.breakpoints.down('sm')]: {
        width: 300,
        marginRight: 0,
        paddingTop: 50,
        padding: '50px 0 35px',
        margin: '0 auto',
      },
    },
    footerRightWrapper: {
      flex: 1,
      maxWidth: 490,
      justifyContent: 'center',
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto',
        paddingTop: 0,
        paddingBottom: 20,
      },
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    footerTitle: {
      fontSize: 36,
      marginTop: 0,
      marginBottom: 10,
      color: '#fefefe',
      fontWeight: 900,
      width: '100%',
    },
    footerDescription: {
      lineHeight: 1.5,
      color: '#c4c4c4',
      margin: 0,
      marginBottom: 20,
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },
    marginText: {
      marginBottom: 13,
    },
    footerEmail: {
      display: 'flex',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        ...globalStyles.flexCenter,
      },
    },
    support: {
      width: 25,
      height: 25,
      borderRadius: 0,
      paddingRight: 10,
      ...globalStyles.alignCenter,
    },
    logo: {
      margin: 'auto 0',
      borderRadius: 0,
      [theme.breakpoints.down('sm')]: {
        marginRight: 5,
      },
    },
    divider: {
      height: 1,
      width: '100%',
      borderTop: '1px solid #373737',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 10,
      },
    },
    footerEndLink: {
      marginLeft: 25,
      color: '#767676',
      '&:hover': {
        color: '#767676',
      },
    },
    footerEnd: {
      ...globalStyles.flexAround,
      height: 78,
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
      },
    },
    commonFooterEnd: {
      ...globalStyles.flexBetween,
      margin: 'auto 0',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
  })

const Footer = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.footer}>
    <div className={classnames(classes.gridContainer, classes.footerWrapper)}>
      <div className={classes.footerLeftWrapper}>
        <ul className={classes.footerLinks}>
          {FOOTER_LINKS.map((value, index) => (
            <li key={index}>
              <a href={value.url}>
                <Typography variant="subtitle1" className={classnames(classes.footerLink, classes.marginText)}>
                  {value.text}
                </Typography>
              </a>
            </li>))}
        </ul>
      </div>

      <div className={classes.footerRightWrapper}>
        <Typography className={classes.footerTitle}>FINMAP</Typography>
        <Typography variant="subtitle1" className={classes.footerDescription}>
          Права на товарный знак «FINMAP» принадлежат ФОП Каунов Иван
          Сергеевич. Все материалы, размещенные на данном сайте, являются
          авторскими. Если вы хотите любым образом использовать их на своих
          ресурсах, вам необходимо получить письменное предварительное
          разрешение автора.
        </Typography>
        <div className={classes.footerEmail}>
          <Avatar
            src={emailIcon}
            alt="email icon"
            className={classes.support}
          />
          <a
            href="mailto:support@finmap.online"
            className={classes.footerLink}
          >
            support@finmap.online
          </a>
        </div>
      </div>
    </div>

    <div className={classes.divider} />

    <div className={classes.footerEnd}>
      <div className={classes.commonFooterEnd}>
        <Typography className={classes.footerEndLink}>FINMAP Сopyright © 2017 – 2019</Typography>
        <a href="#">
          <Typography className={classes.footerEndLink}>Отказ от ответственности</Typography>
        </a>
        <a href="#">
          <Typography className={classes.footerEndLink}>Согласие с рассылкой</Typography>
        </a>
      </div>

      <Avatar className={classes.logo} src={footerLogo} alt="footer logo" />
    </div>
  </div>
)

export default withStyles(styles, { withTheme: true })(Footer)
