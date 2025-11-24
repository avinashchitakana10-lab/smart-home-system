import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import { listFaces, enrollFaces } from '../api/faces';

function FaceEnrollment() {
  const [photos, setPhotos] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    async function fetchFaces() {
      try {
        const res = await listFaces();
        setEnrolled(res.data?.list || res.list || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFaces();
  }, []);

  const handleFileChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleEnroll = async () => {
    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }
    try {
      await enrollFaces(formData);
      const res = await listFaces();
      setEnrolled(res.data?.list || res.list || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">Face Enrollment</h2></Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="shadow mb-4">
            <Card.Body>
              <Form.Group>
                <Form.Label>Upload Photos for Enrollment</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileChange} />
              </Form.Group>
              <Button className="mt-2" onClick={handleEnroll} variant="primary">Enroll</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow mb-4">
            <Card.Body>
              <Card.Title>Enrolled Faces</Card.Title>
              <Table className="mt-3">
                <thead className="table-dark"><tr><th>ID</th><th>Photos</th></tr></thead>
                <tbody>
                  {enrolled.map((face) => (
                    <tr key={face._id}>
                      <td>{face._id}</td>
                      <td>{face.photos.length} photos</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FaceEnrollment;
