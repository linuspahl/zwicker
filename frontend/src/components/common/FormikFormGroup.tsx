import { Field, FieldProps } from 'formik';
import styled from 'styled-components';
import FormGroup from './FormGroup';
import Input from './Input';
import Label from './Label';

const Help = styled.div`
  color: grey;
  line-height: 1rem;
  margin-top: var(--tiny-spacing);
`;

const InputWrapper = styled.div`
  flex: 3;
`;

type Props = {
  type?: string,
  name: string,
  label: string,
  help?: string,
  autoCapitalize?: boolean,
}

const FormikFormGroup = ({
  type,
  name,
  label,
  help,
  autoCapitalize,
}: Props) => (
  <FormGroup>
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <Label htmlFor={name}>{label}</Label>
          <InputWrapper>
            <Input type={type} autoCapitalize={autoCapitalize ? 'on' : 'off'} {...field} />
            {help && <Help>{help}</Help>}
          </InputWrapper>
        </>
      )}
    </Field>
  </FormGroup>
);

FormikFormGroup.defaultProps = {
  type: 'text',
  help: undefined,
  autoCapitalize: false,
};

export default FormikFormGroup;
