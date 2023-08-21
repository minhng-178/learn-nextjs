import Link from 'next/link';
import x from '@/styles/app.module.css';
import y from '@/styles/test.module.css';

export default function Home() {
  return (
    <div>
      <ul>
        <li className={x['red']}>
          <Link href={'/facebook'}>
            <span className={y['red']}>Facebook</span>
          </Link>
        </li>
        <li>
          <a href="/youtube">You tube</a>
        </li>
        <li>
          <a href="/tiktok">Tiktok</a>
        </li>
      </ul>
    </div>
  );
}
