'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

export default function Faccebook() {
  const router = useRouter();

  const handleBtn = () => {
    router.push('/');
  };

  return (
    <div>
      Facebook
      <div>
        <Button variant="danger">Test</Button>
        <button onClick={handleBtn}>Back home</button>
      </div>
    </div>
  );
}
