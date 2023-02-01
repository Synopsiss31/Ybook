import { Box } from '@mui/material';

import Notification from '@/components/Notification/Notification';

const Notifications = ({ random }: { random: number }) => {
  // return a random number < 10 of notifications
  return (
    <Box>
      {Array.from({ length: random }, (_, index) => (
        <Notification key={index} />
      ))}
    </Box>
  );
};

export default Notifications;
