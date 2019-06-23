import React from 'react'
import { Button, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { iconSize } from 'src/constants'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      ...globalStyles.flexCenter,
      marginBottom: 10,
    },
  },
  button: {
    ...globalStyles.flexCenter,
    background: '#919191',
    padding: '10px 14px',
    marginTop: 10,
    minWidth: 'auto',
    height: 'auto',
    color: 'white',
    fontSize: 14,
    '&:hover': {
      background: '#919191',
      transform: 'none',
      boxShadow: 'none',
      '-webkit-box-shadow': 'none',
    },
  },
  deleteIcon: {
    ...globalStyles.alignCenter,
    marginBottom: 2,
  },
  iconFilter: {
    ...globalStyles.alignCenter,
    marginRight: 5,
  },
})

interface Props extends WithStyles<typeof styles> {
  journalData: JournalAnalyticsData | null | boolean,
  onDelete: () => void,
}

const DeleteTransation = ({ classes, journalData, onDelete }: Props) => (
  <div className={classes.root}>
    {journalData && (
      <Button className={classes.button} onClick={onDelete}>
        <DeleteIcon size={iconSize} color="white" className={classes.deleteIcon} />
      </Button>)}

    {/*<Button className={classes.button}>   TODO: Добавить логику после релиза */}
    {/*  <ImageFilterNoneIcon size={iconSize} color="white" className={classes.iconFilter} />*/}
    {/*  Дублировать*/}
    {/*</Button>*/}
  </div>
)

export default withStyles(styles)(DeleteTransation)
