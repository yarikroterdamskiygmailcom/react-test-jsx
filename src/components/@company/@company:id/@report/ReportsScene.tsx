import React from 'react'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import ReportCard from './common/ReportCard'
import { reportsScene } from 'src/constants'

const styles = (theme: Theme) => createStyles({
  outerRoot: {
    width: 'calc(100vw - 300px)',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  root: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexCenter,
  },
  grid: {
    marginTop: 50,
    display: 'grid',
    gridRowGap: '50px',
    gridColumnGap: '100px',
    gridTemplateColumns: '210px 210px 210px 210px',
    '@media (max-width: 1550px)': {
      gridRowGap: '30px',
      gridColumnGap: '50px',
    },
    '@media (max-width: 1320px)': {
      gridRowGap: '20px',
      gridColumnGap: '30px',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '210px 210px 210px',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '210px 210px',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '210px',
    },
  },
})

const ReportScene = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.outerRoot}>
    <div className={classes.root}>
      <div className={classes.grid}>
        {reportsScene.map((value, index) => (
          <ReportCard
            key={index}
            path={value.path}
            img={value.img}
            title={value.title}
            description={value.description}
            index={index}
          />))}
      </div>
    </div>
  </div>
)

export default withStyles(styles)(ReportScene)
