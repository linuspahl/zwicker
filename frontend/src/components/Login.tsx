import LoginForm from './LoginForm';
import { H1, PageContainer } from './common';

type Props = {
  onSubmit: (values: { username?: string, password?: string }) => void
}

const Login = ({ onSubmit }: Props) => (
  <PageContainer>
    <H1>
      Zwicker
    </H1>
    <LoginForm onSubmit={onSubmit} />
  </PageContainer>
);

export default Login;
