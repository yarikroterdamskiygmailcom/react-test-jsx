import React, { MouseEvent } from 'react'
import { Checkbox, createStyles, WithStyles, withStyles } from '@material-ui/core'
import PanoramaFishEye from 'mdi-react/PanoramaFisheyeIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import { smallIconCheckBox } from 'src/constants'

const styles = createStyles({
  checkBox: {
    padding: 13,
  },
})

interface Props extends WithStyles<typeof styles> {
  value: boolean,
  onSelect?: (event: MouseEvent<HTMLTableElement>) => void
}

const TableCheckBox = ({ classes, value, onSelect }: Props) => (
  <Checkbox
    checked={value}
    color="primary"
    onClick={onSelect}
    classes={{ root: classes.checkBox }}
    icon={<PanoramaFishEye size={smallIconCheckBox} />}
    checkedIcon={<CheckCircleIcon size={smallIconCheckBox} />}
  />
)

export default withStyles(styles)(TableCheckBox)
