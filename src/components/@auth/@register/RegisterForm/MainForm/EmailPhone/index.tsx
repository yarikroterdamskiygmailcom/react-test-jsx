import React from 'react'
import classnames from 'classnames'
import { Field } from 'formik'
import Input from 'src/components/controls/Input'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  reverseRoot: {
    flexDirection: 'column-reverse',
  }
})

interface Props extends WithStyles<typeof styles> {
  email?: string,
}

const EmailPhone = ({ classes, email }: Props) => (
  <div className={classnames(classes.root, { [classes.reverseRoot]: !email })}>
    <div>
      <Field
        fullWidth
        name="email"
        component={Input}
        placeholder="Email"
      />
    </div>
    <div>
      <Field
        fullWidth
        name="phone"
        component={Input}
        placeholder="Ваш телефон"
      />
    </div>
  </div>
)

export default withStyles(styles)(EmailPhone)
