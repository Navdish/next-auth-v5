import { LoginButton } from '@/components/LoginButton';
import Button from '@mui/material/Button';


export default function Home() {
  return (
    <main >
      <div>
        <h1>Auth</h1>
        <p>Authentication service</p>
      </div>
      <LoginButton>
        <Button variant='contained'>Sign In</Button>
        </LoginButton>
    </main>
  );
}
