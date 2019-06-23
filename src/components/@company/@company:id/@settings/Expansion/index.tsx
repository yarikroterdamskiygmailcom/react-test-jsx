import React from 'react'
import {
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core'
import Details from './Details'
import Information from 'src/assets/images/information.png'
import { InputDataValue } from 'src/redux/app/company/types'

const styles = createStyles({
  root: {
    margin: 10,
    borderRadius: 15,
    '&:before': {
      display: 'none',
    },
  },
  rounded: {
    '&:last-child': {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    '&:first-child': {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  },
  summary: {
    borderRadius: 15,
    background: 'white',
    border: '1px solid #e8edf1',
  },
  expandIcon: {
    transform: 'translateY(-50%) rotate(180deg)',
  },
  expanded: {
    borderRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  details: {
    display: 'block',
    padding: 0,
    '&:last-child': {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  title: string,
  isArchive?: boolean,
  data: InputDataValue[] | null | undefined,
}

const Expansion = ({ classes, data, title, isArchive }: Props) => (
  <ExpansionPanel classes={{ root: classes.root, rounded: classes.rounded }} elevation={0}>
    <ExpansionPanelSummary
      expandIcon={<img src={Information} alt="Information" />}
      classes={{ root: classes.summary, expandIcon: classes.expandIcon, expanded: classes.expanded }}
    >
      <Typography className={classes.title} variant="subtitle1">{title}</Typography>
    </ExpansionPanelSummary>

    <ExpansionPanelDetails classes={{ root: classes.details }}>
      {data && data!.map(value => <Details key={value._id} isArchive={isArchive} value={value} />)}
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default withStyles(styles)(Expansion)
