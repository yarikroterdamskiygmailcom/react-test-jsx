import React from 'react'
import {
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  WithStyles,
  withStyles
} from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import Summary from './Summary'
import Details from './Details'

const styles = createStyles({
  root: {
    margin: 0,
    background: '#f6fafd',
  },
  expanded: {
    background: 'white',
  },
  summary: {
    paddingRight: 0,
    background: '#f6fafd',
  },
  details: {
    padding: 0,
  },
})

interface Props extends WithStyles<typeof styles> {
  data: JournalAnalyticsData,
  onRowChoose?: () => void,
}

const Expansion = ({ classes, onRowChoose, data }: Props) => (
  <ExpansionPanel classes={{ root: classes.root, expanded: classes.expanded }}>
    <ExpansionPanelSummary classes={{ root: classes.summary }}>
      <Summary data={data} />
    </ExpansionPanelSummary>

    <ExpansionPanelDetails classes={{ root: classes.details }}>
      <Details data={data} onRowChoose={onRowChoose} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default withStyles(styles)(Expansion)
