import Authenticated from '@/layouts/Authenticated';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { Box } from '@mui/material';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Authenticated>
        <Box>
          ...
        </Box>
      </Authenticated>
    </Main>
  );
};

export default Index;
