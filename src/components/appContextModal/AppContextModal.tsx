import { Box, Modal } from '@mui/material';

// eslint-disable-next-line import/no-cycle
import { Modals, useAppContext } from '@/lib/contexts/AppContext';

import CreatePostModal from './CreatePostModal/CreatePostModal';
import FriendsModal from './FriendsModal/FriendsModal';

const AppContextModal = () => {
  const { state, dispatch } = useAppContext();

  const handleClose = () => {
    dispatch({ type: 'SET_MODAL', payload: Modals.None });
  };

  return (
    <Modal
      open={state.modal !== Modals.None}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        {state.modal === Modals.CreatePublication && <CreatePostModal />}
        {state.modal === Modals.Friends && <FriendsModal />}
      </Box>
    </Modal>
  );
};

export default AppContextModal;
