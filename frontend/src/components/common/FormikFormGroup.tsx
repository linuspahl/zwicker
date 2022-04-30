import { Field, FieldProps } from "formik";
import styled from "styled-components";
import FormGroup from "./FormGroup"
import Input from "./Input";
import Label from "./Label";

const Help = styled.div`
  color: grey;
  line-height: 1rem;
  font-size: 1rem;
  margin-top: 3px;
`

const InputWrapper = styled.div`
  flex: 3;
`

type Props = {
  type?: string,
  name: string,
  label: string,
  help?: string,
}

const FormikFormGroup = ({ type, name, label, help }: Props) => {
  return (
    <FormGroup>
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }: FieldProps) => (
          <>
            <Label htmlFor={name}>{label}</Label>
            <InputWrapper>
              <Input type={type} {...field}/>
              {help && <Help>{help}</Help>}
            </InputWrapper>
          </>
        )}
      </Field>
    </FormGroup>
  );
}

FormikFormGroup.defaultProps = {
  type: 'text',
}

export default FormikFormGroup;
