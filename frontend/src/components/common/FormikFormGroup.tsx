import { Field, FieldProps } from 'formik';
import styled from 'styled-components';
import FormGroup from './FormGroup';
import Input from './Input';

const Help = styled.div`
  color: grey;
  line-height: 1rem;
  margin-top: var(--tiny-spacing);
`;

const InputWrapper = styled.div`
  flex: 3;
`;

type Props = {
  autoCapitalize?: boolean,
  help?: string,
  label: string,
  name: string,
  placeholder?: string,
  required?: boolean,
  type?: string,
}

const FormikFormGroup = ({
  autoCapitalize,
  help,
  label,
  name,
  placeholder,
  required,
  type,
}: Props) => (
  <FormGroup>
    <Field name={name}>
      {({ field }: FieldProps) => (
        <InputWrapper>
          <Input
            type={type}
            placeholder={placeholder}
            label={label}
            withAsterisk={required}
            autoCapitalize={autoCapitalize ? 'on' : 'off'}
            {...field}
          />
          {help && <Help>{help}</Help>}
        </InputWrapper>
      )}
    </Field>
  </FormGroup>
);

FormikFormGroup.defaultProps = {
  autoCapitalize: false,
  help: undefined,
  placeholder: undefined,
  required: false,
  type: 'text',
};

export default FormikFormGroup;
