import theme from './theme'

export const globalStyles = {
  fullWidth: {
    width: '100%',
  },

  flexAround: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  flexEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
  },

  alignCenter: {
    alignSelf: 'center',
  },

  input: {
    border: 0,
    fontSize: 16,
    outline: 'none',
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  button: {
    height: 55,
    border: '3px solid #f3f3f3',
    background: '#fff',
    outline: 'none',
    color: '#54c9a7',
    fontSize: 14,
    '&:hover': {
      color: '#fff',
      background: '#337ab7',
      boxShadow: 'none',
      border: 'none',
    },
  },

  headerButton: {
    width: 142,
    height: 54,
    display: 'flex',
    padding: '0 20px',
    justifyContent: 'space-evenly',
    '-webkit-appearance': 'none',
    boxShadow: '0 0 38px rgba(84,84,84,0.23)',
    '-webkit-box-shadow': '0 0 38px rgba(84,84,84,0.23)',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },

  animateOutIn: {
    animation: 'fadeoutin 2s linear forwards',
  },
  animateInOut: {
    animation: 'fadeinout 2s linear forwards',
  },
  '@keyframes fadeinout': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes fadeoutin': {
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
}
