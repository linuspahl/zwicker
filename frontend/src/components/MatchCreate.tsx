import { Button, FormikFormGroup, H1, PageContainer } from "./common"
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type MatchFormValues = {
  title: string,
  description?: string,
  password?: string,
}

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
`

const _createMatch = () => {
  return Promise.resolve({ data: { id: 'new-match-id' }})
}

const MatchCreate = () => {
  const navigate = useNavigate();

  const createMatch = (values: MatchFormValues) => {
    _createMatch().then(({ data: { id } }) => {
      navigate(`/matches/lobby/${id}`);
    }).catch((error) => {
      console.error(error); // TODO: display user notification
    })
  };

  return (
    <PageContainer>
      <H1>Erstelle eine Partie</H1>
      <Formik<MatchFormValues> onSubmit={createMatch} initialValues={{ title: '', description: '', password: '' }}>
        <Form>
          <FormikFormGroup name="title" label="Title"/>
          <FormikFormGroup name="password" label="Passwort" help="Optional kannst du den Zugang zur Partie mit einem Passwort schützen."/>

          <FormActions>
            <Button type="submit">Erstellen & zur Lobby</Button>
          </FormActions>
        </Form>
      </Formik>
    </PageContainer>
  )
}

export default MatchCreate
