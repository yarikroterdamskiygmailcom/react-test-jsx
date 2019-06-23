import React, { ChangeEvent, Component } from 'react'
import moment from 'moment'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'
import InformationOutline from 'mdi-react/InformationOutlineIcon'
import exchange from 'src/assets/images/exchange.png'
import { Accounts, Company } from 'src/redux/app/company/types'
import { globalStyles } from 'src/styles/global-styles'
import { hundredPercents, informationLabels, reportIconSize } from 'src/constants'
import generateBalance from 'src/utils/generateBalance'

import ReportLink from '../common/Link/ReportLink'
import BalanceValues from './common/BalanceValues'
import connector from './connector'
import ActivesValue from './common/ActivesValue'
import LiabilitiesValue from './common/LiabilitiesValue'
import CustomTooltip from 'src/components/common/Tooltip'

const styles = createStyles({
  root: {
    width: 'calc(100vw - 375px)',
    marginLeft: 30,
    '@media (max-width: 1279.98px)': {
      width: 'calc(100vw - 340px)',
    },
    '@media (max-width: 1023.98px)': {
      width: '100vw',
      margin: 0,
    }
  },
  container: {
    ...globalStyles.flexBetween,
  },
  links: {
    margin: '20px 0 20px 30px',
    '@media (max-width: 1023.98px)': {
      margin: '20px 0 20px 15px'
    },
  },
  largeField: {
    display: 'block',
    overflow: 'auto',
    backgroundColor: 'white',
    width: '45%',
    height: '100%!important',
    border: 'solid 1px #EBF0F3',
    borderRadius: 10,
    '@media (max-width: 799.98px)': {
      width: '100%',
    },
  },
  balanceOuter: {
    display: 'inline-block',
    margin: '10px 30px',
    padding: '7px 15px',
    border: '1px solid #b6b9aa',
    borderRadius: 15,
    '@media (max-width: 1399.98px)': {
      marginLeft: 30,
    },
    '@media (max-width: 1023.98px)': {
      marginLeft: 15,
    },
  },
  balance: {
    fontWeight: 700,
    fontSize: 16,
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 12,
    },
  },
  values: {
    ...globalStyles.flexBetween,
    padding: '10px 30px',
    '@media (max-width: 799.98px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
    '@media (max-width: 1023.98px)': {
      padding: '10px 15px',
    },
  },
  label: {
    padding: '20px',
    fontWeight: 700,
  },
  logo: {
    marginTop: 25,
    '@media (max-width: 799.98px)': {
      marginBottom: 25,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  company: Company | null,
  companyAccounts: Accounts | null,
}

interface State {
  firstInputValue: number,
  secondInputValue: number,
  thirdInputValue: number,
}

class BalanceScene extends Component<Props, State> {
  public state = {
    firstInputValue: 0,
    secondInputValue: 0,
    thirdInputValue: 0,
  }

  public handleChangeBalance = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const { name, value } = event.target
    this.setState({ ...this.state, [name]: Number(value) })
  }

  public render() {
    const { company, companyAccounts, classes } = this.props
    const { firstInputValue, secondInputValue, thirdInputValue } = this.state

    const balanceValues = generateBalance(companyAccounts)

    const changeBalance = firstInputValue + secondInputValue + thirdInputValue

    const activeBalance = Math.round((balanceValues.activeBalance! + changeBalance) * hundredPercents) / hundredPercents
    const selfCapital = Math.round((balanceValues.selfCapital! + changeBalance) * hundredPercents) / hundredPercents

    const date = moment().format('DD.MM.YYYY')
    const currencySymbol = company && company.currency.symbol

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.links}>
            <ReportLink path="">
              Все отчеты
            </ReportLink>{' / '}
            <ReportLink path="/balance">
              Баланс
            </ReportLink>
            <CustomTooltip text={informationLabels[4]} bottom>
              <InformationOutline size={reportIconSize} />
            </CustomTooltip>
          </div>

          <div className={classes.balanceOuter}>
            <Typography variant="subtitle1" className={classes.balance}>
              Баланс на {date}
            </Typography>
          </div>
        </div>

        <div className={classes.values}>
          <div className={classes.largeField}>
            <Typography variant="subtitle1" className={classes.label}>
              Активы: {activeBalance.toLocaleString('ru')} {currencySymbol}
            </Typography>

            <ActivesValue onChange={this.handleChangeBalance} />

            <BalanceValues
              label="Дебиторка"
              data={balanceValues.debitValues}
              currencySymbol={currencySymbol}
            />

            <BalanceValues
              label="Деньги"
              data={balanceValues.moneyValues}
              currencySymbol={currencySymbol}
            />
          </div>

          <div>
            <img src={exchange} alt="exchange" className={classes.logo} />
          </div>

          <LiabilitiesValue
            selfCapital={selfCapital}
            activeBalance={activeBalance}
            currencySymbol={currencySymbol}
            companyAccounts={companyAccounts}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connector(BalanceScene))
