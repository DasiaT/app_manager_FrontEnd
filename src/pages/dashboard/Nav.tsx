import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Paper  from '@mui/material/Paper';
import { Item_Menu } from './components/Item_menu';
import { pages_mantenimiento } from './components/Pages_Mantenimiento';

const Bottom_Navigation: React.FC = () => {

  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.ChangeEvent<object>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Paper sx={{ position: 'fixed', top: 0, left: 0, right: 0 }} elevation={3}>
      <Box sx={{ flexGrow: 10 , height:'120px'}}>
      <Grid2 className="Menu">
            <BottomNavigation showLabels value={value} onChange={handleChange}>
              {pages_mantenimiento.map((page, index) => (
                <Grid2 spacing={2} key={index}>
                  <Item_Menu elevation={0}>
                      <NavLink to={page.path} style={{ textDecoration: 'none', fontWeight: 'bold' , width:'100%', height:'100%' }}>
                        <BottomNavigationAction key={index} label={page.label} icon={page.icon} onClick={page.OnClick}/>
                        <br></br>
                        {page.label}
                      </NavLink>
                      <br></br>
                  </Item_Menu>
                </Grid2>
              ))}
            </BottomNavigation>
          </Grid2>
      </Box>
      <Routes>
      {pages_mantenimiento.map((page) => (
        <Route path={page.path} element={page.content} />
      ))}
      </Routes>
      </Paper>
    </Router>
  );
};

export default Bottom_Navigation;
