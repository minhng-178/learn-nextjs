'use client';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

interface IProp {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

function UpdateModal(prop: IProp) {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = prop;
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setContent('');
    setBlog(null);
    setShowModalUpdate(false);
  };

  const handleSubmit = () => {
    if (!title) {
      toast.error('Not empty title!');
      return;
    }

    if (!author) {
      toast.error('Not empty author!');
      return;
    }

    if (!content) {
      toast.error('Not empty content!');
      return;
    }

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          toast.warning('Update Success!');
          mutate('http://localhost:8000/blogs');
          handleClose();
          console.log(res);
        }
      })
      .catch(error => {
        if (error) toast.error('Update failed!');
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={showModalUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
