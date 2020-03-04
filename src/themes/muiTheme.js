import { createMuiTheme } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({
    overrides:{
      MuiSlider: {
        thumb:{
          color: 'darkorange'
        },
        track: {
          color: 'gold'
        },
        rail: {
          color: 'gold'
        },
        mark:{
          color: 'gold'
        },
        markLabel: {
          color: 'gold'
        },
        markLabelActive: {
          color: 'red'
        }
      },
      MuiInputBase: {
        input: {
          background: '#cfcfcf',
          color: 'black',
          textAlign: 'right',
          padding: 8
        }
      }
    }
  });