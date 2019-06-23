import React from 'react'
import { Form } from 'formik'
import { Hidden } from '@material-ui/core'
import FilterMobileJournal from './MobileFilters'
import FilterJournal from './FiltersDesktop'
import connector from './connector'
import formik from './formik'

const FiltersJournal = () => (
  <Form>
    <Hidden smDown implementation="css">
      <FilterJournal />
    </Hidden>
    <Hidden mdUp implementation="css">
      <FilterMobileJournal />
    </Hidden>
  </Form>
)

export default connector(formik(FiltersJournal))
