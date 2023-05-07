import styled from 'styled-components';
import { Form, Formik } from 'formik';

import { Button, FormikFormGroup } from './common';
import Alert from './common/Alert';

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--spacing);
`;

type LoginFormValues = {
  username?: string,
  password?: string,
}

type Props = {
  onSubmit: (values: LoginFormValues) => void,
  errorMessage: string | undefined,
}

const LoginForm = ({ onSubmit, errorMessage }: Props) => (
  <Formik<LoginFormValues> onSubmit={onSubmit} initialValues={{ username: '', password: '' }}>
    <Form>
      <FormikFormGroup name="username" label="Nutzername" />
      <FormikFormGroup name="password" label="Passwort" type="password" />

      {errorMessage && <Alert type="danger">{errorMessage}</Alert>}

      <FormActions>
        <Button type="submit">Anmelden</Button>
      </FormActions>
    </Form>
  </Formik>
);

export default LoginForm;
