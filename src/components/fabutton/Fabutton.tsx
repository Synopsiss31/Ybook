import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import React from 'react';

import style from './fabutton.module.css';

export const Fabutton = () => {
  return (
    <div>
      <Fab className={style.fab} color="primary" size="large">
        <AddIcon />
      </Fab>
    </div>
  );
};
