import React from 'react'
import { createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { JournalAnalyticsData } from 'src/redux/app/types'
import DeleteTransation from '../../DeleteTransation'
import ProjectAndCategory from './ProjectAndCategory'
import SecondColumn from './SecondColumn'
import Contragent from './Counterparty'
import FirstColumn from './FirstColumn'
import ThirdColumn from './ThirdColumn'
import TagsForm from './TagsForm'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    ...globalStyles.flexAround,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  container: {
    width: '100%',
  },
  firstSecond: {
    width: '100%',
    ...globalStyles.flexAround,
    [theme.breakpoints.down('sm')]: {
      ...globalStyles.flexBetween,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  comment: {
    width: '100%',
    maxWidth: 330,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
  button: {
    ...globalStyles.flexCenter,
    background: '#919191',
    padding: '10px 14px',
    marginTop: 10,
    minWidth: 'auto',
    height: 'auto',
    color: 'white',
    fontSize: 14,
    '&:hover': {
      background: '#919191',
      transform: 'none',
      boxShadow: 'none',
      '-webkit-box-shadow': 'none',
    },
  },
  deleteIcon: {
    ...globalStyles.alignCenter,
    marginBottom: 2,
  },
})

interface Props extends WithStyles<typeof styles> {
  journalData: JournalAnalyticsData | null,
  onDelete: () => void,
}

const DialogContainer = ({ classes, journalData, onDelete }: Props) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.firstSecond}>
        <FirstColumn />
        <SecondColumn />
      </div>

      <ProjectAndCategory />
      <Contragent />

      <div>
        <TagsForm />

        <Hidden smDown implementation="css">
          <DeleteTransation journalData={journalData} onDelete={onDelete} />
        </Hidden>
      </div>
    </div>

    <div className={classes.comment}>
      <ThirdColumn onDelete={onDelete} />
    </div>
  </div>
)

export default withStyles(styles)(DialogContainer)
