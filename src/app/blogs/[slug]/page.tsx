'use client';
import useSWR, { Fetcher } from 'swr';
import { Card } from 'react-bootstrap';

function ViewDetailBlog({ params }: { params: { slug: string } }) {
  const fetcher: Fetcher<IBlog | any, string> = (url: string) =>
    fetch(url).then(res => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.slug}`,
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
    <Card className="mt-3">
      <Card.Header> {data.title} </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{data.content}</p>
          <footer className="blockquote-footer">
            <cite title="Source Title"> {data.author}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default ViewDetailBlog;
