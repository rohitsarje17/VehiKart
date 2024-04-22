import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import filters from '../styles/Filters.css'
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const carModelsByMaker = {
  "Maruti Suzuki": ["Alto", "WagonR", "Baleno", "Swift", "Dzire"],
  "Tata": ["Harrier", "Safari", "Tiago", "Nexon", "Altroz"],
  "Kia": ["Seltos", "Sonet", "Carnival"],
  "Honda": ["City", "Amaze", "Elevate","WR-V", "CR-V","Civic"],
  "Hyundai": ["Creta", "i20", "Venue", "Verna"],
  "Mahindra": ["Scorpio","Thar", "XUV300","UV500","XUV700","Bolero"],
  "Volkswagen": ["Polo", "Vento", "Tiguan Allspace"],
  "Skoda": ["Octavia", "Superb", "Kushaq"],
  "Mercedes": ["C-Class", "E-Class", "GLC", "GLE"],
  "Audi": ["A4", "A6", "Q3", "Q5"],
  "BMW": ["3 Series", "5 Series", "X1", "X3"],
  "Jeep": ["Compass", "Wrangler", "Grand Cherokee"],
  "Renault": ["Kwid", "Triber", "Kiger","Duster"]
};
const carMakers = [
  "Maruti Suzuki", "Tata","Kia","Honda","Hyundai","Mahindra","Volkswagen","Skoda","Mercedes","Audi","BMW","Jeep","Renault"
]

export default function Filters() {
  const [value, setValue] = React.useState("Cars");
  const minValue = 50000;

  const handleTypeChange = (event) => {
    setValue(event.target.value);
  };

  function valuetext(value) {
    return `${value}`;
  }
  const [maker, setMaker] = React.useState('');
  const [model, setModel] = React.useState('');

  const handleMakerChange = (event) => {
    setMaker(event.target.value);
    setModel('');
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <div className='filters-main-container'>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Vehicle Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleTypeChange}
      >
        <FormControlLabel value="Cars" control={<Radio />} label="Cars" />
        <FormControlLabel value="Bikes" control={<Radio />} label="Bikes" />
      </RadioGroup>
    </FormControl>
    {value === 'Cars' ?
     <div>
        Price Range
        <br></br>
        <span>Minimum Price </span>
        <span>Maximum Price</span>
        <br></br>
        <span>{minValue}</span>
        <span>{valuetext}</span>
     <Slider
        aria-label="Price Range"
        defaultValue={400000}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={10}
        step={50000}
        marks
        min={50000}
        max={8000000}
      />
      <div className='select-box'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Maker</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={maker}
          label="Maker"
          onChange={handleMakerChange}
        >
         {carMakers.map((makerName , index)=>(
          <MenuItem key={index} value={makerName}>{makerName}</MenuItem>
         ))}
        </Select>
      </FormControl></div>
      
      {maker && (
        <div className='select-box'>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-model-label">Model</InputLabel>
          <Select
            labelId="demo-simple-select-model-label"
            id="demo-simple-select-model"
            value={model}
            label="Model"
            onChange={handleModelChange}
          >
            {carModelsByMaker[maker].map((modelName, index) => (
              <MenuItem key={index} value={modelName}>{modelName}</MenuItem>
            ))}
          </Select>
        </FormControl></div>
      )}
    
    <footer className='apply-filters'>
    <Button variant="contained">Apply Filters</Button>
    </footer></div> : <div>Bike filters</div>}
    </div>
  );
}
