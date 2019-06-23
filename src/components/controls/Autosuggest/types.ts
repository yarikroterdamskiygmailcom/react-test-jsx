import { ReactNode, RefObject } from 'react'
import { Value } from 'src/redux/app/types'

export interface Fetch {
  value: string,
}

export type Options = {
  containerProps: object,
  children: React.ReactNode,
}

export type Change = {
  newValue: string,
}

export type Suggestion = {
  label: string,
}

export type Part = {
  text: string,
  highlight: boolean,
}

export type RenderSuggestion = {
  query: string,
  isHighlighted: boolean,
}

export type AutosuggestProps = {
  selectProps: {
    classes: {
      popper: string,
      paper: string,
      input: string,
      chip: string,
      chipFocused: string,
      singleValue: string,
      icon: string,
      text: string,
    },
    name: string,
    field: {
      name: string,
    },
    fullWidth?: boolean,
    small?: boolean,
  },
  options: Value[],
  children: ReactNode,
  inputRef: RefObject<HTMLDivElement>,
  innerRef: RefObject<HTMLDivElement>,
  innerProps: object,
  removeProps: {
    onClick: () => void,
  },
  isFocused: boolean,
  isSelected: boolean,
}
