import LoginForm from './LoginForm';
import { PageContainer, H1 } from '../components/common';

function Login({ onSubmit }: { onSubmit: (values: { username?: string, password?: string }) => void }) {
  return (
    <PageContainer>
      <H1>
        Zwicker
      </H1>
      <LoginForm onSubmit={onSubmit} />
    </PageContainer>
  );
}

export default Login;
