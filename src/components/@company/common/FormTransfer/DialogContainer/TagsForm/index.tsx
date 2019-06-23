import React from 'react'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import TagsAutosuggest from 'src/components/controls/TagsAutosuggest'
import { Field } from 'formik'

const styles = (theme: Theme) => createStyles({
  root: {
    paddingBottom: 20,
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
})

const TagsForm = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Field
      fullWidth
      name="tags"
      inputLabel="Теги"
      placeholder="Выберите теги"
      component={TagsAutosuggest}
    />
  </div>
)

export default withStyles(styles)(TagsForm)
