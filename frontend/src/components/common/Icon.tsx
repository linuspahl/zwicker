import styled from 'styled-components';

import { ReactComponent as LockSVG } from '../../images/icons/lock.svg';
import { ReactComponent as StarSVG } from '../../images/icons/star.svg';
import { ReactComponent as DeleteSVG } from '../../images/icons/delete.svg';

const icons = {
  lock: LockSVG,
  delete: DeleteSVG,
  star: StarSVG,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 27px;
  }
`;

const Icon = ({ name }: { name: keyof typeof icons }) => {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    // eslint-disable-next-line no-console
    console.error(`Icon SVG with name ${name} not found.`);

    return null;
  }

  return (
    <Container>
      <SvgIcon />
    </Container>
  );
};

export default Icon;
