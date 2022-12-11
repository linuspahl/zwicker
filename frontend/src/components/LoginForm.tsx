import styled from 'styled-components';
import { Form, Formik } from 'formik';

import { Button, FormikFormGroup } from './common';

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
`;

type LoginFormValues = {
  username?: string,
  password?: string,
}

function LoginForm({ onSubmit }: { onSubmit: (values: LoginFormValues) => void }) {
  return (
    <Formik<LoginFormValues> onSubmit={onSubmit} initialValues={{ username: '', password: '' }}>
      <Form>
        <FormikFormGroup name="username" label="Nutzername" />
        <FormikFormGroup name="password" label="Passwort" type="password" />

        <FormActions>
          <Button type="submit">Anmelden</Button>
        </FormActions>
      </Form>
    </Formik>
  );
}

export default LoginForm;
