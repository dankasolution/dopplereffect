import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { muiTheme } from '../../themes/muiTheme';
import starplanet from '../../assets/starplanet-red.png';
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
  
export const DopplerEffect = () => {
  const initialvelocity = 30;
  const [velocity, setVelocity] = useState(initialvelocity);
  const styles = useStyles();

  const REDHUE = 0;
  const BLUEHUE = 255;
  const MINSTARVH = 10;
  const MINVELOCITY = -100;
  const MAXVELOCITY = 100;
  const MINBRIGHTNESS = 50;

  const starsize = (MAXVELOCITY-velocity)/100 * 10 + MINSTARVH;

  const maxincfactor = Math.log(MAXVELOCITY-MINVELOCITY);
  let incfactor = Math.log(MAXVELOCITY-velocity);
  if(incfactor < 0) incfactor = 0;

  let huevalue = (MAXVELOCITY-velocity)/(MAXVELOCITY-MINVELOCITY)*BLUEHUE;
  huevalue = incfactor/maxincfactor * huevalue;

  let brightvalue = (incfactor/maxincfactor)*100 + MINBRIGHTNESS;

  const useFilter = makeStyles({
      star:{
        height: `${starsize}vh`,
        filter: `hue-rotate(${huevalue}deg) brightness(${brightvalue}%)`
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
    <Grid container
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
                      step: 1,
                      min: {MINVELOCITY},
                      max: {MAXVELOCITY},
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
                  min={MINVELOCITY}
                  max={MAXVELOCITY}
                  track={false}
                  marks={slidermarks}
                  color= "secondary"
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="velocity-slider"
              />
            </ThemeProvider>
          </Grid>          
      </Grid>
    </Grid>
  );
}