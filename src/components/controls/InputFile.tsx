import React, { ChangeEvent, Component } from 'react'
import { Avatar, createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import Clip from 'src/assets/images/metal-paper-clip.png'
import shortenFileName from 'src/utils/shortenFileName'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  fileInput: {
    opacity: 0,
    position: 'absolute',
  },
  fileName: {
    fontSize: 14,
    marginTop: 2,
    marginLeft: 10,
    marginRight: -55,
    textAlign: 'right',
    textDecoration: 'underline',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  clip: {
    width: 22,
    height: 20,
    borderRadius: 0,
  },
})

interface Props extends WithStyles<typeof styles> {}

interface State {
  file: File | null,
  fileName: string,
}

class InputFile extends Component<Props, State> {
  public fileInput: null | HTMLInputElement = null

  public state = {
    file: null,
    fileName: ''
  }

  public handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]

    this.setState({
      file,
      fileName: file.name,
    })
  }

  public handleClickInput() {
    if (this.fileInput) this.fileInput.click()
  }

  public render() {
    const { classes } = this.props
    const { fileName } = this.state

    return (
      <div className={classes.root}>
        <Avatar alt="clip" src={Clip} className={classes.clip} />
        <input
          type="file"
          className={classes.fileInput}
          onChange={this.handleChange}
          ref={input => this.fileInput = input}
        />
        <Typography variant="subtitle1" className={classes.fileName} onChange={this.handleClickInput}>
          {fileName ? `Файл "${shortenFileName(fileName)}"` : 'Выберите файл'}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(InputFile)
