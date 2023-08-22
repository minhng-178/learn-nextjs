'use client';

import useSWR from 'swr';
import TableApp from '../components/app.table';

function BlogsPage() {
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';
  return (
    <div>
      <TableApp blogs={data.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  );
}

export default BlogsPage;
