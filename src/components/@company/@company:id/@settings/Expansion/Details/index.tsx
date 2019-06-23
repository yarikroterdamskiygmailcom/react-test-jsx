import React, { Component } from 'react'
import {
  createStyles,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core'
import DetailsForm from './DetailsForm'
import AccountValue from './AccountValue'
import List from 'src/assets/images/list.png'
import Pencil from 'src/assets/images/pencil.png'
import { globalStyles } from 'src/styles/global-styles'
import { InputDataValue } from 'src/redux/app/company/types'

const styles = createStyles({
  root: {
    ...globalStyles.fullWidth,
    '&:last-child': {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
  expanded: {
    '&:before': {
      opacity: 1,
    },
  },
  summary: {
    background: 'white',
    borderRadius: 15,
    paddingRight: 0,
  },
  container: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexBetween,
  },
  img: {
    marginRight: 15,
  },
  flex: {
    display: 'flex',
  },
  title: {
    fontSize: 14,
  },
  details: {
    display: 'block',
    background: '#f6fafd',
    padding: 0,
    '&:last-child': {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
  divider: {
    ...globalStyles.fullWidth,
    background: '#55cda1',
    height: 1,
  },
  dividerDefault: {
    ...globalStyles.fullWidth,
    background: 'rgba(0, 0, 0, 0.12)',
    height: 1,
  },
})

interface Props extends WithStyles<typeof styles> {
  value: InputDataValue,
  isArchive?: boolean,
}

interface State {
  isEdit: boolean,
}

class Details extends Component<Props, State> {
  public state = {
    isEdit: false,
  }

  public handleEdit = () => {
    this.setState(state => ({ isEdit: !state.isEdit }))
  }

  public render() {
    const { classes, value, isArchive } = this.props
    const { isEdit } = this.state

    return (
      <ExpansionPanel elevation={0} classes={{ root: classes.root, expanded: classes.expanded }}>
        <ExpansionPanelSummary classes={{ root: classes.summary }}>
          <div className={classes.container}>
            <div className={classes.flex}>
              <div className={classes.img}>
                <img src={List} alt="List" />
              </div>
              <Typography variant="subtitle1" className={classes.title}>
                {value.label}
              </Typography>
            </div>
            <div onClick={this.handleEdit}>
              <img src={Pencil} alt="Pencil" />
            </div>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails classes={{ root: classes.details }}>
          <Divider className={classes.divider} />
          {isEdit
            ? (
              <DetailsForm
                name={value.label}
                accountType={value.account_type}
                startingBalance={value.starting_balance}
                archived={value.archived}
                isArchive={isArchive}
              />)
            : (
              <AccountValue
                name={value.label}
                accountType={value.account_type}
                startingBalance={value.starting_balance}
                archived={value.archived}
                isArchive={isArchive}
              />)}

          <Divider className={classes.dividerDefault} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(Details)
