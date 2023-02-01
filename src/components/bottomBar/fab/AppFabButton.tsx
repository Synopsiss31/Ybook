import { AddTwoTone } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';

import { Modals, Pages, useAppContext } from '@/lib/contexts/AppContext';

const AppFabButton = () => {
  const { state: appState, dispatch } = useAppContext();

  const handleClick = () => {
    switch (appState.page) {
      // display modal depending on the page
      case Pages.Home:
        // create a new publication
        dispatch({ type: 'SET_MODAL', payload: Modals.CreatePublication });
        break;
      case Pages.Profile:
        break;
      case Pages.Chat:
        // search for a user (to add as a friend)
        break;
      case Pages.Settings:
        break;
      default:
        break;
    }
  };

  // const isHidden =
  //   appState.page === Pages.Profile || appState.page === Pages.Settings;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 'auto',
        right: 'auto',
        p: 1.5,
        m: 1.5,
        backgroundColor: 'background.paper',
        borderRadius: '50%',
        zIndex: 100,
      }}
    >
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddTwoTone />
      </Fab>
    </Box>
  );
};

export default AppFabButton;
