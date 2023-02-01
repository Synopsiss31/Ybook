import { Dialog } from '@mui/material';

// eslint-disable-next-line import/no-cycle
import { Modals, useAppContext } from '@/lib/contexts/AppContext';

import CreatePostModal from './CreatePostModal/CreatePostModal';

const AppContextModal = () => {
  const { state, dispatch } = useAppContext();

  const handleClose = () => {
    dispatch({ type: 'SET_MODAL', payload: Modals.None });
  };

  return (
    <Dialog
      open={state.modal !== Modals.None}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {state.modal === Modals.CreatePublication && <CreatePostModal />}
    </Dialog>
  );
};

export default AppContextModal;