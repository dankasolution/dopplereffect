import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import starplanet from '../../assets/starplanet-glow.png';
import spacebg from '../../assets/spacebg.jpg';

const useStyles = makeStyles({
    controlbar: {      
        color: 'white',
        margin: 0
    },
    displaycontainer:{
        height: '50vh',
        minHeight: '400px',
        borderRadius: '10px',
        backgroundImage: `url(${spacebg})`
    },
    slider:{
      width:250
    },
    input: {
      width: 100,
      color: 'white'      
    }
  });

  const muiTheme = createMuiTheme({
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

const valueLabelFormat = (value) => {
    const [coefficient, exponent] = value
        .toExponential()
        .split('e')
        .map(item => Number(item));
    
    return `${Math.round(coefficient)}e^${exponent}`;
}
  
export const DopplerEffect = () => {
  const [velocity, setVelocity] = useState(0);

  const hue = velocity>0? 300 : 170 ;
  const saturate = Math.abs(velocity)/100 *500;
  const starsize = (100-velocity)/100 * 10 + 10;

  const styles = useStyles();
  const useFilter = makeStyles({
      star:{
        height: `${starsize}vh`,
        filter: `invert(0%) sepia(100%) saturate(${saturate}%) hue-rotate(${hue}deg) brightness(100%) contrast(110%)`
      }
    }
  );
  const filter = useFilter();

  const handleSliderChange = (event, newVelocity) => {
    setVelocity(newVelocity);
  };

  const handleInputChange = event => {
    let val = event.target.value === '' ? '' : Number(event.target.value);
    val = (val > 100) ? val = 100 : (val<-100)? val = -100 : val; 
    setVelocity(val);
  };

  const handleBlur = () => {
    if (velocity < -100) {
      setVelocity(-100);
    } else if (velocity > 100) {
      setVelocity(100);
    }
  };
  
  const slidermarks = [
    {
      value: -100,
      label: '-100',
    },
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    }
  ];

  return (
    <Grid container xs={12}
          className="App-interaction">
      <Grid container
            alignItems="center"
            justify="center" 
            className={styles.displaycontainer}>
            <Grid item>
              <img  src={starplanet} alt="starplanet" 
                    className={filter.star}
                    />
            </Grid>
      </Grid>          
      <Grid container
            direction='row'
            spacing={5} 
            alignItems="center"
            justify="center" 
            className={styles.controlbar}>
          <Grid item>
            <Typography id="velocity-slider">
              Velocity (km/s):
            </Typography>
          </Grid>
          <Grid item>
            <ThemeProvider theme={muiTheme}>
              <Input
                  autoFocus={true}
                  className={styles.input}
                  color='primary'
                  value={velocity}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                      step: 10,
                      min: -100,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'velocity-slider',
                  }}
              />
            </ThemeProvider>
          </Grid>
          <Grid item>
            <ThemeProvider theme={muiTheme}>
              <Slider
                  className={styles.slider}
                  value={typeof velocity === 'number' ? velocity : 0}
                  min={-100}
                  max={100}
                  // scale={x => x**10}
                  track={false}
                  marks={slidermarks}
                  color= "secondary"
                  onChange={handleSliderChange}
                  getAriaValueText={valueLabelFormat}
                  valueLabelFormat={valueLabelFormat}
                  valueLabelDisplay="auto"
                  aria-labelledby="velocity-slider"
              />
            </ThemeProvider>
          </Grid>          
      </Grid>
    </Grid>
  );
}