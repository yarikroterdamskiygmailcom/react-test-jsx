import React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Input from 'src/components/controls/Input'
import { Field } from 'formik'
import connector from './connector'

const styles = createStyles({
  root: {
    margin: '0 auto',
    marginTop: 20,
    marginBottom: 10,
    width: '90%',
    maxWidth: 1400,
    '@media (max-width: 1650px, min-width: 1024px)': {
      width: '95%',
      marginTop: 10,
    },
    '@media (max-width: 1024px)': {
      maxWidth: 620,
      margin: '10px auto',
    },
    '@media (max-width: 930px)': {
      maxWidth: 520,
    },
    '@media (max-width: 700px)': {
      width: '100%',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  isFilterCommentOpened: boolean,
}

const FilterSearch = ({ classes, isFilterCommentOpened }: Props) => {
  if (!isFilterCommentOpened) return null

  return (
    <div className={classes.root}>
      <Field
        fullWidth
        filterComment
        name="comment"
        component={Input}
        placeholder="Поиск по комментариям..."
      />
    </div>
  )
}

export default withStyles(styles)(connector(FilterSearch))
