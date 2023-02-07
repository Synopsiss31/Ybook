import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

const ConfirmModal = ({
  show,
  onConfirm,
  onCancel,
}: {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };
  return (
    <Modal
      open={show}
      onClose={onCancel}
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This action cannot be undone.
        </Typography>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
