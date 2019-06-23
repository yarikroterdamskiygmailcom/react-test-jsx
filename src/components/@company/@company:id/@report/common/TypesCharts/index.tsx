import React from 'react'
import { createStyles, Divider, withStyles, WithStyles } from '@material-ui/core'
import PieCharts from 'src/assets/images/pie-chart-outline.png'
import LineChart from 'src/assets/images/line-chart.png'
import { globalStyles } from 'src/styles/global-styles'

const styles = createStyles({
  root: {
    ...globalStyles.flexCenter,
    height: '100%',
    marginRight: 15,
    padding: '0 5px',
    borderRadius: 10,
    background: 'white',
    width: 'max-content',
    border: '1px solid #b6b9aa',
    '@media (max-width: 800px)': {
      marginTop: 10,
    },
  },
  button: {
    padding: 7,
    cursor: 'pointer',
    ...globalStyles.alignCenter,
  },
  divider: {
    height: 15,
    width: 1,
    ...globalStyles.alignCenter,
  },
})

interface Props extends WithStyles<typeof styles> {
  handleClick: (value: string) => () => void,
}

const TypesCharts = ({ classes, handleClick }: Props) => (
  <div className={classes.root}>
    <div onClick={handleClick('line')} className={classes.button}>
      <img src={LineChart} alt="line-charts" />
    </div>

    <Divider color="#f7fafc" className={classes.divider} />

    <div onClick={handleClick('pie')} className={classes.button}>
      <img src={PieCharts} alt="pie-charts" />
    </div>
  </div>
)

export default withStyles(styles)(TypesCharts)
