import React from 'react'
import { Chip, createStyles, TableCell, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import Comments from 'src/assets/images/comments.png'
import Iconfinder from 'src/assets/images/iconfinder.png'

const styles = createStyles({
  root: {
    ...globalStyles.flexEvenly,
  },
  chip: {
    height: 20,
    fontSize: 11,
    color: 'white',
    marginRight: 3,
    marginBottom: 3,
    background: '#b1b1b1',
  },
  label: {
    paddingTop: 2,
    paddingLeft: 8,
    paddingRight: 8,
  },
  comment: {
    padding: 5,
    marginTop: 3,
    fontSize: 13,
    color: '#313131',
    fontWeight: 500,
  },
  tooltip: {
    ...globalStyles.flexEvenly,
    maxWidth: 220,
    flexWrap: 'wrap',
    borderRadius: 10,
    background: 'white',
    '-webkit-appearance': 'none',
    boxShadow: '0 0 38px rgba(81,174,203,0.2)',
    '-webkit-box-shadow': '0 0 38px rgba(81,174,203,0.2)',
  },
})

interface Props extends WithStyles<typeof styles> {
  data: JournalAnalyticsData,
}

const TagsComment = ({ classes, data }: Props) => (
  <TableCell align="center">
    <div className={classes.root}>
      {data.comment && !!data.comment.length && (
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title={<Typography className={classes.comment}>{data.comment}</Typography>}
        >
          <img alt="comment" src={Comments} />
        </Tooltip>)}

      {data.tags && !!data.tags.length && (
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title={data.tags.map((value, index) =>
            <Chip
              label={value.value}
              className={classes.chip}
              key={value._id || index}
              classes={{ label: classes.label }}
            />)}
        >
          <img alt="tags" src={Iconfinder} />
        </Tooltip>)}
    </div>
  </TableCell>
)

export default withStyles(styles)(TagsComment)
