'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import UpdateModal from './update.modal';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

interface IProps {
  blogs: IBlog[];
}

function TableApp(props: IProps) {
  const { blogs } = props;

  const router = useRouter();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const handleShow = () => setShowModal(true);
  const handleShowUpdate = (item: any) => {
    setBlog(item);
    setShowModalUpdate(true);
  };
  const handleViewDetail = (id: number) => router.push(`/blogs/${id}`);

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Do you want to delete this blog (id = ${id})`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            toast.error('Delete Success!');
            mutate('http://localhost:8000/blogs');
            console.log(res);
          }
        })
        .catch(error => {
          if (error) toast.error('Delete failed!');
          console.log(error);
        });
    }
  };

  return (
    <>
      <div
        className="my-3"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Table Blogs</h3>
        <Button variant="success" onClick={handleShow}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Button onClick={() => handleViewDetail(item.id)}>
                    View
                  </Button>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => handleShowUpdate(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBlog(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModal showModal={showModal} setShowModal={setShowModal} />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
}

export default TableApp;
