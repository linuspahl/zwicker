import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  :not(:last-child) {
    margin-bottom: 12px;
  }

  @media only screen and (min-device-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export default FormGroup;
