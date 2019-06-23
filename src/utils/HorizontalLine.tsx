import React, { FC } from 'react'

export const HorizontalLine: FC<{}> = () => (
  <hr
    style={{
      width: '100%',
      marginLeft: 5,
      color: '#DFDFDF',
      backgroundColor: '#DFDFDF',
      border: '1px solid #DFDFDF',
      height: 0
    }}
  />
)
