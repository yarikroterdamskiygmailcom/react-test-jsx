import React, { ChangeEvent } from 'react'
import { createStyles, TextField, Typography, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { activesValues } from 'src/constants'

const styles = createStyles({
  inputArea: {
    ...globalStyles.flexBetween,
    alignItems: 'center',
    padding: '20px',
    borderTop: 'solid 1px #EBF0F3',
  },
  input: {
    padding: 10,
  },
  inputOutline: {
    borderRadius: 10,
  },
  inputField: {
    maxWidth: '40%',
  },
  text: {
    fontWeight: 500,
    maxWidth: '50%',
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 12,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const ActivesValue = ({ classes, onChange }: Props) => (
  <>
    {activesValues.map((el, idx) => (
      <div key={`key-${idx}`} className={classes.inputArea}>
        <Typography variant="subtitle1" className={classes.text}>
          {el.label}
        </Typography>
        <TextField
          name={el.name}
          className={classes.inputField}
          InputProps={{ className: classes.inputOutline }}
          inputProps={{ className: classes.input }}
          placeholder="0"
          margin="none"
          type="number"
          variant="outlined"
          onChange={onChange}
        />
      </div>
    ))}
  </>
)

export default withStyles(styles)(ActivesValue)
