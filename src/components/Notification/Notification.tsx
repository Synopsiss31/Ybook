import MailIcon from '@mui/icons-material/Mail';
import { Badge, Box } from '@mui/material';
import React from 'react';

const Notification = () => {
  const [read, setRead] = React.useState(false);

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
      onClick={() => setRead(true)}
    >
      <Badge badgeContent={read ? 0 : 1} color="primary" variant="dot">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <MailIcon />
          <span>Some Notification</span>
        </Box>
      </Badge>
    </Box>
  );
};

export default Notification;
