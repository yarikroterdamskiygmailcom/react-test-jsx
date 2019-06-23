import React from 'react'
import { Link } from 'react-router-dom'
import { Card, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { informationLabels } from 'src/constants'
import information from 'src/assets/images/information.png'
import CustomTooltip from 'src/components/common/Tooltip'

const styles = createStyles({
  root: {
    width: 210,
    height: 200,
    color: '#2b2b2b',
  },
  imgRoot: {
    ...globalStyles.flexCenter,
  },
  title: {
    ...globalStyles.flexCenter,
    fontWeight: 'bold',
    marginTop: 18,
    fontSize: 17,
  },
  description: {
    fontSize: 13,
    marginTop: 5,
  },
  informationIcon: {
    textAlign: 'right',
    margin: '10px 10px 0 0'
  }
})

interface Props extends WithStyles<typeof styles> {
  img: string,
  path: string,
  title: string,
  description: string,
  index: number,
}

const ReportCard = ({ classes, img, path, title, description, index }: Props) => (
  <Link to={`report/${path}`}>
    <Card className={classes.root}>
      <div className={classes.informationIcon}>
        <CustomTooltip text={informationLabels[index]}>
          <img src={information} alt={'i'} />
        </CustomTooltip>
      </div>
      <div className={classes.imgRoot}>
        <img alt={img} src={img} />
      </div>
      <Typography variant="subtitle1" color="inherit" align="center" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="inherit" align="center" className={classes.description}>
        {description}
      </Typography>
    </Card>
  </Link>
)

export default withStyles(styles)(ReportCard)
