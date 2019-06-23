import React from 'react'
import { Field } from 'formik'
import { createStyles, Hidden, Theme, withStyles, WithStyles } from '@material-ui/core'
import TagsAutosuggest from 'src/components/controls/TagsAutosuggest'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import DialogActions from './DialogActions'
import DeleteTransation from '../../DeleteTransation'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: -15,
    ...globalStyles.flexBetween,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  tags: {
    width: '100%',
    marginTop: 10,
    marginRight: 30,
  },
  flex: {
    display: 'flex',
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
  iconFilter: {
    ...globalStyles.alignCenter,
    marginRight: 5,
  },
})

interface Props extends WithStyles<typeof styles> {
  journalData: JournalAnalyticsData | null,
  onDelete: () => void,
}

const DialogFooter = ({ classes, journalData, onDelete }: Props) => (
  <div className={classes.root}>
    <div className={classes.tags}>
      <Field
        fullWidth
        name="tags"
        inputLabel="Теги"
        placeholder="Выберите теги"
        component={TagsAutosuggest}
      />

      <Hidden smDown implementation="css">
        <DeleteTransation journalData={journalData} onDelete={onDelete} />
      </Hidden>
    </div>

    <DialogActions onDelete={onDelete} />
  </div>
)

export default withStyles(styles)(DialogFooter)
