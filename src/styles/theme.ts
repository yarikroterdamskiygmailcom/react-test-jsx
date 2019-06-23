import { createMuiTheme } from '@material-ui/core/styles'

const colors = {
  palette: {
    primary: {
      light: '#57de8b',
      main: '#00b384',
      dark: '#55d498',
    },
    secondary: {
      light: '#f0f0f0',
      main: '#fff',
      dark: '#313131',
    },
    error: {
      main: '#ff0033',
    },
    white: '#ffffff',
    black: '#000000',
  },
}

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 14,
    fontFamily: 'Gotham Pro, sans-serif',
    subtitle1: {
      fontSize: 16,
      color: colors.palette.secondary.dark,
    },
    subtitle2: {
      fontSize: 26,
      fontWeight: 600,
      color: colors.palette.secondary.dark,
    },
    caption: {
      fontSize: 11.5,
      color: colors.palette.secondary.light,
    },
    body1: {
      fontSize: 15,
      color: '#000000',
      lineHeight: 1.47,
      letterSpacing: -0.5,
    },
  },

  overrides: {
    MuiCard: {
      root: {
        borderRadius: 10,
        '&:hover': {
          cursor: 'pointer',
          '-webkit-appearance': 'none',
          boxShadow: '0 0 38px rgba(81,174,203,0.41)',
          '-webkit-box-shadow': '0 0 38px rgba(81,174,203,0.41)',
        },
      },
    },
    MuiButton: {
      root: {
        border: 0,
        height: 55,
        fontSize: 16,
        color: 'white',
        borderRadius: 10,
        fontWeight: 'bold',
        textTransform: 'none',
        fontFamily: 'Gotham Pro, Helvetica, sans-serif',
        transition: 'box-shadow .3s ease, transform .4s ease',
        background: 'linear-gradient(to bottom, rgb(87,222,139) 0%, rgb(22,149,178) 100%)',
        '&$disabled': {
          color: 'white',
          background: '#cee4f2',
        },
        '&:hover': {
          transform: 'translateY(-5px)',
          '-webkit-appearance': 'none',
          boxShadow: '0 10px 20px rgba(86, 213, 150, 0.38)',
          '-webkit-box-shadow': '0 10px 20px rgba(86, 213, 150, 0.38)',
        },
      },
      outlined: {
        border: 0,
        height: 50,
        borderRadius: 0,
        color: '#313131',
        background: 'transparent',
        '&:hover': {
          transform: 'none',
          background: 'transparent',
          '-webkit-appearance': 'none',
          boxShadow: '0 10px 20px rgba(86, 213, 150, 0.38)',
          '-webkit-box-shadow': '0 10px 20px rgba(86, 213, 150, 0.38)',
        },
      },
    },
    MuiTableCell: {
      body: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: '16px',
        textAlign: 'center',
        color: colors.palette.secondary.dark,
      },
      root: {
        paddingRight: 0,
        paddingLeft: 0,
        textAlign: 'center',
        color: colors.palette.secondary.dark,
        '&:last-child': {
          paddingRight: 0,
        },
      },
    },
  },

  ...colors,
})

export default theme
