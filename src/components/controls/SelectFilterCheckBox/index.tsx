import React, { ChangeEvent, Component } from 'react'
import classNames from 'classnames'
import { Checkbox, createStyles, FormControlLabel, Typography, WithStyles, withStyles } from '@material-ui/core'
import { JournalState, JournalStateKey } from 'src/redux/app/journal/types'
import { InputDataValue } from 'src/redux/app/company/types'
import { FiltersData } from 'src/redux/app/types'
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon'
import { consumptionCategories, incomeCategories } from 'src/constants'
import defaultCheckBox from 'src/assets/images/defaultCheckBox.png'
import { globalStyles } from 'src/styles/global-styles'
import ShowError from '../../common/ShowError'
import InputLabel from '../../common/InputLabel'
import connector from './connector'

const styles = createStyles({
  root: {
    minWidth: 220,
    borderRadius: 10,
    cursor: 'pointer',
    background: 'white',
    position: 'relative',
    border: '1px solid #b6b9aa',
    ...globalStyles.flexBetween,
  },
  container: {
    width: '100%',
    maxHeight: 280,
    overflowY: 'auto',
  },
  items: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: 7,
  },
  control: {
    margin: 0,
    width: '100%',
    display: 'flex',
    '&:hover': {
      background: '#edf4fa',
    },
  },
  controlSelected: {
    '&:hover': {
      borderRadius: 10,
    },
  },
  title: {
    ...globalStyles.alignCenter,
    ...globalStyles.fullWidth,
    fontSize: 13,
    padding: 7,
  },
  icon: {
    padding: 2,
  },
  moreIcon: {
    top: 9,
    right: '5%',
    position: 'absolute',
  },
})

interface Props extends WithStyles<typeof styles> {
  inputLabel: string,
  filtersData: FiltersData | null,
  journalState: JournalState | JournalStateKey,
  field: {
    name: string,
    value: [InputDataValue],
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
  },
  actions: {
    selectFiltersValues: (name: string, value: InputDataValue) => void,
    selectedAllFiltersValues: (name: string) => void,
  }
}

interface State {
  isOpen: boolean,
}

class SelectFilterCheckBox extends Component<Props, State> {
  public state = {
    isOpen: false,
  }

  public handleIsOpenMenu = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }))
  }

  public handleClickAllCheckBox = (name: string) => async (event: ChangeEvent<{}>) => {
    const { selectedAllFiltersValues } = this.props.actions

    await selectedAllFiltersValues(name)
    event.persist()
  }

  public handleClickCheckBox = (name: string, value: InputDataValue) => async (event: ChangeEvent<{}>) => {
    const { selectFiltersValues } = this.props.actions

    await selectFiltersValues(name, value)
    event.persist()
  }

  public render() {
    const { classes, inputLabel, journalState, field, form } = this.props
    const { isOpen } = this.state

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    const title = (field.name === incomeCategories || field.name === consumptionCategories) && 'категории'

    return (
      <div>
        {inputLabel && <InputLabel inputLabel={inputLabel} />}

        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classNames(classes.control, { [classes.controlSelected]: !isOpen })}>
              <Checkbox
                color="primary"
                classes={{ root: classes.input }}
                onChange={this.handleClickAllCheckBox(field.name)}
                checked={!!(journalState as JournalStateKey)[field.name]}
                icon={<img alt="defaultIcon" src={defaultCheckBox} className={classes.icon} />}
              />
              <Typography variant="subtitle1" className={classes.title} onClick={this.handleIsOpenMenu}>
                Все {title || inputLabel.toLocaleLowerCase()}
              </Typography>
            </div>

            {isOpen && field.value && (
              <div className={classes.items}>
                {field.value.map(value => (
                  <FormControlLabel
                    key={value._id}
                    checked={value.selected}
                    className={classes.control}
                    onChange={this.handleClickCheckBox(field.name, value)}
                    label={
                      <Typography variant="subtitle1" className={classes.title}>
                        {value.value}
                      </Typography>}
                    control={<Checkbox
                      color="primary"
                      classes={{ root: classes.input }}
                      icon={<img alt="defaultIcon" src={defaultCheckBox} className={classes.icon} />}
                    />}
                  />))}
              </div>)}
          </div>

          <div onClick={this.handleIsOpenMenu} className={classes.moreIcon}>
            <ExpandMoreIcon color="#b2b2b2" />
          </div>
        </div>

        <ShowError isFormTouched={isFormTouched} error={error} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(SelectFilterCheckBox))
