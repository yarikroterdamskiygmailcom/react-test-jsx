import React from 'react'
import question from 'src/assets/images/question.png'
import { Avatar, createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'

const styles = createStyles({
  root: {
    marginTop: 15,
    marginBottom: 15,
  },
  flex: {
    ...globalStyles.flexCenter,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 50,
    background: '#ffffff',
    border: '5px solid #f7fafc',
    boxShadow: '0px 21px 38px rgba(22,150,178,0.14)',
    ...globalStyles.alignCenter,
    ...globalStyles.flexCenter,
  },
  img: {
    width: 17,
    height: 24,
    margin: '0 auto',
    ...globalStyles.alignCenter,
  },
  learningTitle: {
    ...globalStyles.alignCenter,
    fontWeight: 500,
    paddingLeft: 15,
  },
})

const Learning = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.flex}>
      <div className={classes.circle}>
        <Avatar alt="question" src={question} className={classes.img} />
      </div>
      <Typography variant="subtitle1" className={classes.learningTitle}>Обучение</Typography>
    </div>
  </div>
)

export default withStyles(styles)(Learning)
