import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useActionRequest from '../hooks/useActionRequest';
import { Match } from '../types/types';
import {
  Button, FormikFormGroup, H1, PageContainer,
} from './common';

type MatchFormValues = {
  title: string,
  password: string | undefined,
}

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--extra-large-spacing);
`;

const MatchCreate = () => {
  const navigate = useNavigate();
  const { data: createdMatch, performAction: createMatch } = useActionRequest<Match>('create', 'match');

  useEffect(() => {
    if (createdMatch) {
      navigate(`/matches/lobby/${createdMatch.id}`);
    }
  }, [createdMatch, navigate]);

  return (
    <PageContainer>
      <H1>Erstelle ein neues Spiel</H1>
      <Formik<MatchFormValues> onSubmit={({ title, password }: MatchFormValues) => createMatch({ title, password })} initialValues={{ title: '', password: '' }}>
        <Form>
          <FormikFormGroup name="title" label="Title" required />
          <FormikFormGroup
            name="password"
            label="Passwort"
            help="Optional kannst du den Zugang zum Spiel mit einem Passwort schützen."
          />

          <FormActions>
            <Button type="submit">Weiter</Button>
          </FormActions>
        </Form>
      </Formik>
    </PageContainer>
  );
};

export default MatchCreate;
