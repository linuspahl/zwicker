import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { create as createMatchAction } from '../actions/matches';
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
  margin-top: 18px;
`;

const MatchCreate = ({ currentUserId }: { currentUserId: string }) => {
  const navigate = useNavigate();

  const createMatch = ({ title, password }: MatchFormValues) => createMatchAction(
    Number(currentUserId),
    title,
    password,
  ).then((response) => {
    const matchId = response.data.match.id;
    navigate(`/matches/lobby/${matchId}`);
  });

  return (
    <PageContainer>
      <H1>Erstelle ein neues Spiel</H1>
      <Formik<MatchFormValues> onSubmit={createMatch} initialValues={{ title: '', password: '' }}>
        <Form>
          <FormikFormGroup name="title" label="Title" />
          <FormikFormGroup name="password" label="Passwort" help="Optional kannst du den Zugang zum Spiel mit einem Passwort schützen." />

          <FormActions>
            <Button type="submit">Weiter</Button>
          </FormActions>
        </Form>
      </Formik>
    </PageContainer>
  );
};

export default MatchCreate;
