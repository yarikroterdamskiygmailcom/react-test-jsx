import React, { Component, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { User } from 'src/redux/app/auth/types'
import { Company, CreateCompany, DeleteCompany } from 'src/redux/app/company/types'
import { globalStyles } from 'src/styles/global-styles'
import Loading from 'src/components/common/Loading'
import { ChooseCompany, Currency } from './types'
import CompanyCard from './CompanyCard'
import DialogCard from './DialogCard'
import AddCard from './AddCard'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: 100,
    marginBottom: 100,
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
      marginBottom: 50,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
      marginBottom: 20,
    },
  },
  container: {
    marginTop: 60,
    ...globalStyles.flexCenter,
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  grid: {
    display: 'grid',
    gridColumnGap: '20px',
    margin: '0 auto',
    gridTemplateColumns: '380px 380px 380px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '380px 380px',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '300px 300px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      maxWidth: 380,
    },
  },
  title: {
    fontSize: 48,
    fontWeight: 1000,
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
    },
  },
})

type State = {
  isOpen: boolean,
  error: string | null,
}

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  loading: boolean,
  user: User | null,
  companies: [Company] | null,
  currencies: [Currency] | null,
  actions: {
    getCurrencies: () => void,
    getCompanies: (userId: object) => void,
    createCompany: (form: CreateCompany) => void,
    deleteCompany: (form: DeleteCompany) => void,
    createDemoCompany: (form: CreateCompany) => void,
  },
}

type Request = {
  value: {
    _id: string,
  },
}

class ChooseScene extends Component<Props, State> {
  public state = {
    isOpen: false,
    error: null,
  }

  public componentDidMount(): void {
    const { actions, user, currencies } = this.props
    if (isEmpty(currencies)) actions.getCurrencies()
    if (user) actions.getCompanies({ user_id: user.id })
  }

  public componentWillUnmount(): void {
    this.setState({
      isOpen: false,
    })
  }

  public handleOpenDialog = () => {
    this.setState({
      isOpen: true,
    })
  }

  public handleCloseDialog = () => {
    this.setState({
      isOpen: false,
    })
  }

  public onOpenCompany = (id: string) => async () => {
    const { history } = this.props

    history.push(`/company/${id}`)
  }

  public onDelete = (companyId: string, isOwner: boolean) => async (e: MouseEvent<HTMLButtonElement>) => {
    const { actions, user } = this.props

    e.stopPropagation()

    if (user) {
      await actions.deleteCompany({ user_id: user.id, company_id: companyId, is_owner: isOwner })
      actions.getCompanies({ user_id: user.id })
    }
  }

  public onChangeTariff = (company: Company) => async (e: MouseEvent<HTMLButtonElement>) => {
    const { history } = this.props

    e.stopPropagation()

    history.push(`/company/${company._id}/payment`)
  }

  public returnedCreateCompany = async (isDemo: boolean, data: CreateCompany) => {
    const { actions } = this.props
    if (isDemo) {
      return actions.createDemoCompany(data)
    }
    return actions.createCompany(data)
  }

  public createCompany = async ({ isDemo, name, currency }: ChooseCompany) => {
    const { user, actions, history } = this.props

    if (!user) {
      this.setState({
        error: 'Компанию могут создать только авторизированные пользователи'
      })
    } else {
      const data: CreateCompany = {
        currency,
        user_id: user.id,
        company_name: name,
        promotional_code: null,
      }

      const request: unknown | Request = await this.returnedCreateCompany(isDemo, data)

      actions.getCompanies({ user_id: user.id })

      this.handleCloseDialog()

      history.push(`/company/${(request as Request).value._id}/journal`)
    }
  }

  public render(): React.ReactNode {
    const { classes, loading, user, companies, currencies } = this.props
    const { isOpen, error } = this.state

    if (loading) return <Loading />

    return (
      <div className={classes.root}>
        <Typography align="center" className={classes.title}>ВЫБОР КОМПАНИИ</Typography>

        <div className={classes.container}>
          <div className={classes.grid}>
            {companies && companies.map(company =>
              <CompanyCard
                key={company._id}
                name={company.name}
                tariff={company.tariff.value}
                daysLeft={company.tariff_days_left}
                isDemoCompany={company.demo_company}
                onOpenCompany={this.onOpenCompany(company._id)}
                onChangeTariff={this.onChangeTariff(company)}
                onDelete={this.onDelete(company._id, company.users[0].is_owner)}
              />
            )}

            {user && <AddCard onOpenDialog={this.handleOpenDialog} />}

            <DialogCard
              error={error}
              isOpen={isOpen}
              currencies={currencies}
              onSubmit={this.createCompany}
              onCloseDialog={this.handleCloseDialog}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connector(ChooseScene))
