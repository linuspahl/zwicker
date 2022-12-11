import { Button, FormikFormGroup, H1, PageContainer } from "./common"
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { create as createMatch } from '../actions/matches'
import styled from "styled-components";

type MatchFormValues = {
  title: string,
  password: string | undefined,
}

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
`

const MatchCreate = ({ currentUserId }: { currentUserId: string }) => {
  const navigate = useNavigate();

  const _createMatch = ({ title, password }: MatchFormValues) => {
    return createMatch(Number(currentUserId), title, password).then((response) => {
      console.log({response})
      const matchId = response.data.match.id
      navigate(`/matches/lobby/${matchId}`);
    });
  };

  return (
    <PageContainer>
      <H1>Erstelle ein neues Spiel</H1>
      <Formik<MatchFormValues> onSubmit={_createMatch} initialValues={{ title: '', password: '' }}>
        <Form>
          <FormikFormGroup name="title" label="Title"/>
          <FormikFormGroup name="password" label="Passwort" help="Optional kannst du den Zugang zum Spiel mit einem Passwort schützen."/>

          <FormActions>
            <Button type="submit">Weiter</Button>
          </FormActions>
        </Form>
      </Formik>
    </PageContainer>
  )
}

export default MatchCreate
