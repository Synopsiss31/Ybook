// eslint-disable-next-line import/no-named-as-default
import { Fabutton } from '../components/fabutton/Fabutton';
import Publication from '../components/publication/Publication';

function publi() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Publication />
      <Fabutton />
    </div>
  );
}

export default publi;
