import React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import InformationOutline from 'mdi-react/InformationOutlineIcon'
import { ChosenProjectsData } from 'src/redux/app/reports/types'
import { reportIconSize, informationLabels } from 'src/constants'

import ProjectsCharts from './common/Charts'
import ProjectsTable from './common/Table'
import connector from './connector'
import ReportLink from '../common/Link/ReportLink'
import CustomTooltip from 'src/components/common/Tooltip'

const styles = createStyles({
  root: {
    width: 'calc(100vw - 375px)',
    marginLeft: 30,
    '@media (max-width: 1279.98px)': {
      width: 'calc(100vw - 340px)',
    },
    '@media (max-width: 1023.98px)': {
      width: '100vw',
      margin: 0,
    }
  },
  links: {
    margin: '20px 0 20px 30px',
    '@media (max-width: 1023.98px)': {
      margin: '20px 0 20px 15px'
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  chosenProjectsData: ChosenProjectsData | null,
}

const ProjectsScene = ({ classes, chosenProjectsData }: Props) => (
  <div className={classes.root}>
    <div className={classes.links}>
      <ReportLink path="">
        Все отчеты
      </ReportLink>{' / '}
      <ReportLink path="/projects_report">
        Проекты
      </ReportLink>
      <CustomTooltip text={informationLabels[5]} bottom>
        <InformationOutline size={reportIconSize} />
      </CustomTooltip>
    </div>

    <ProjectsTable />

    {chosenProjectsData && <ProjectsCharts isForProjects={true} />}
  </div>
)

export default withStyles(styles)(connector(ProjectsScene))
