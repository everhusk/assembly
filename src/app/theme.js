import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#004EA8',
    },
    secondary: {
      main: '#000000',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        minHeight: '70px',
        backgroundColor: 'white !important',
        color: 'black !important',
        boxShadow: 'none',
        paddingLeft: '10px',
      },
    },
    MuiToolbar: {
      root: {
        minHeight: '70px !important',
      },
    },
    MuiCircularProgress: {
      root: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: '-40px',
        marginTop: '-40px',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        boxShadow: 'none !important',
        borderRadius: '8px',
        minWidth: '164px',
        minHeight: '40px',
        fontWeight: 400,
      },
      sizeLarge: {
        textTransform: 'uppercase',
        minWidth: '140px',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0 0 28px 0 rgba(72, 89, 102, 0.1)',
        padding: '46px 62px',
        borderRadius: '12px',
      },
      elevation2: {
        boxShadow: '0 0 28px 0 rgba(72, 89, 102, 0.3)',
        padding: '36px 52px',
        borderRadius: '12px',
        marginBottom: '110px',
        minHeight: '600px',
      },
      elevation3: {
        boxShadow: '0 0 28px 0 rgba(72, 89, 102, 0.6)',
        width: '181px',
      },
      elevation4: {
        borderRadius: '12px',
        boxShadow: '0 20px 20px 0 rgba(0, 0, 0, 0.07)',
      },
    },
    MuiTypography: {
      subtitle1: {
        color: '#36E3AD',
        fontWeight: '300 !important',
      },
    },
  },
})
