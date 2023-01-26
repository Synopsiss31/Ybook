// eslint-disable-next-line import/no-named-as-default
import Authenticated from '@/layouts/Authenticated';
import { Fabutton } from '../components/fabutton/Fabutton';
import Publication from '../components/publication/Publication';

function publi() {
  return (
    <Authenticated>
      <Publication />
    </Authenticated>
  );
}

export default publi;
