import React, { Component } from 'react'
import { Button, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { Company, GetCompany, SetPromotionalCode } from 'src/redux/app/company/types'
import { Payment, Subscribe, UnsubscribeParams } from 'src/redux/app/company/payment/types'
import { getTariffs } from 'src/utils/Payment'
import { User } from 'src/redux/app/auth/types'
import { globalStyles } from 'src/styles/global-styles'
import { PromoCode as PromoCodeType } from './types'
import Loading from 'src/components/common/Loading'
import TariffCard from './TariffCard'
import PromoCode from './PromoCode'
import connector from './connector'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      paddingBottom: 20,
    },
    title: {
      fontSize: 28,
      paddingTop: 40,
      fontWeight: 500,
      color: '#5bb7db',
      textTransform: 'uppercase',
    },
    tariff: {
      maxWidth: 1256,
      margin: 'auto',
      alignItems: 'flex-end',
      ...globalStyles.flexAround,
      paddingTop: theme.spacing.unit * 4,
      [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
      },
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    },
    promoTitle: {
      color: 'rgb(77, 77, 77)',
    },
    promoUnSubcribe: {
      display: 'flex',
    },
    promocode: {
      width: 200,
      display: 'flex',
      margin: '10px auto',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      ...globalStyles.button,
    },
    inputPromo: {
      display: 'flex',
      margin: '10px auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

interface Props extends WithStyles<typeof styles> {
  loading: boolean,
  user: User | null,
  payment: Payment | null,
  company: Company | null,
  match: {
    params: {
      id: string,
    },
  },
  history: {
    pathname: (url: string) => void,
  },
  actions: {
    subscribe: (data: Subscribe) => void,
    unsubscribe: (data: UnsubscribeParams) => void,
    getCompany: (form: GetCompany) => void,
    changeTariff: (data: Subscribe) => void,
    setPromotionalCode: (form: SetPromotionalCode) => void,
  }
}

interface State {
  isPromoCode: boolean,
  isOtherSettingsOpened: boolean,
}

class PaymentScene extends Component<Props, State> {
  public state = {
    isOtherSettingsOpened: false,
    isPromoCode: false,
  }

  public componentDidMount(): void {
    this.getCompany()
  }

  public getCompany = async () => {
    const { actions, user, match } = this.props
    if (user) await actions.getCompany({ company_id: match.params.id, user_id: user.id })
  }

  public openOtherSettings = () => {
    this.setState(prevState => ({
      isOtherSettingsOpened: !prevState.isOtherSettingsOpened,
    }))
  }

  public openPromoCode = () => {
    this.setState(prevState => ({
      isPromoCode: !prevState.isPromoCode,
    }))
  }

  public unSubscribe = () => {
    const { user, payment, actions } = this.props
    if (user && payment) {
      const data = {
        userId: user.id,
        _id: payment.payment_id,
      }

      actions.unsubscribe(data)
    }
  }

  public getPromoCode = async (form: PromoCodeType) => {
    const { actions, company } = this.props

    if (company) await actions.setPromotionalCode({ company_id: company._id, promotional_code: form.promoCode })

    await this.getCompany()

    this.openPromoCode()
    this.openOtherSettings()
  }

  public getPaymentData = (tariffType: string, tariffId: string, tariffSum: number, tariffTerm: string) => async () => {
    const { actions, company, user } = this.props

    if (company && user) {
      const data = {
        amount: `${tariffSum}00`,
        order_desc: `Оплата тарифа "${tariffType}" для компании ${company.name}`,
        tariff_type: tariffType,
        tariff_id: tariffId,
        tariff_term: tariffTerm,
        company_id: company._id,
        company_name: company.name,
        user_email: user.email,
        user_name: user.name,
        promotional_code: company.promotional_code,
      }

      if (company.subscription && company.subscription.is_active) {
        await actions.changeTariff(data)
      } else {
        await actions.subscribe(data)
        this.goPay()
      }
    }
  }

  public goPay = () => {
    const { payment } = this.props
    if (payment) window.location.replace(payment.checkout_url)
  }

  public promocode = () => {
    const { classes, payment } = this.props
    const { isPromoCode, isOtherSettingsOpened } = this.state

    if (!isPromoCode && isOtherSettingsOpened) {
      return (
        <div className={classes.promoUnSubcribe}>
          <Button
            className={classes.promocode}
            onClick={this.openPromoCode}
          >
            Есть промокод?
          </Button>
          {payment && (
            <Button
              className={classes.promocode}
              onClick={this.unSubscribe}
            >
              Отписаться
            </Button>)}
        </div>
      )
    }

    return null
  }

  public render(): React.ReactNode {
    const { classes, loading, company } = this.props
    const { isPromoCode, isOtherSettingsOpened } = this.state

    if (loading) return <Loading />

    const tariffs = company ? getTariffs(!!company.promotional_code, company) : null

    return (
      <div className={classes.root}>
        <Typography align="center" className={classes.title}>
          Выберите тариф для компании
        </Typography>
        {(company && tariffs) && (
          <div>
            <Typography variant="subtitle2" align="center">"{company.name}"</Typography>
            <Typography variant="subtitle2" align="center">Тариф: {company.tariff.value}</Typography>

            {company.promotional_code && <Typography align="center" variant="subtitle2" className={classes.promoTitle}>
              Вы используете промокод "{company.promotional_code}"
            </Typography>}

            <div className={classes.tariff}>
              <TariffCard
                tariff={tariffs.entrepreneur}
                pay={this.getPaymentData}
              />
              <TariffCard
                isFavourite
                tariff={tariffs.business}
                pay={this.getPaymentData}
              />
              <TariffCard
                tariff={tariffs.fullSupport}
                pay={this.getPaymentData}
              />
            </div>

            <Button
              className={classes.promocode}
              onClick={this.openOtherSettings}
            >
              Другие настройки
            </Button>

            {this.promocode()}

            {isPromoCode && isOtherSettingsOpened && (
              <div className={classes.inputPromo}>
                <PromoCode onSubmit={this.getPromoCode} />
              </div>
            )}
          </div>)}
      </div>
    )
  }
}

export default withStyles(styles)(connector(PaymentScene))
