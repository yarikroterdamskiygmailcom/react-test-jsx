import React, { Component } from 'react'
import { User } from 'src/redux/app/auth/types'

interface Props {
  user: User | null,
  history: {
    push: (url: string) => void,
  },
}

class IndexScene extends Component<Props> {
  public componentDidMount(): void {
    const { user, history } = this.props
    if (!user) history.push('/auth/login')
  }

  public render() {
    return (
      <div>
        Finmap
      </div>
    )
  }
}

export default IndexScene
