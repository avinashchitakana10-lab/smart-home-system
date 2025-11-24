import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { getDoorLock, setDoorLock } from '../api/cam';

function DoorControl() {
  const [locked, setLocked] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await getDoorLock();
  setLocked(res.data.value);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStatus();
  }, []);

  const toggleLock = async () => {
    try {
      const res = await setDoorLock(!locked);
  setLocked(res.data.value);
    } catch (err) {
      console.error(err);
    }
  };

  if (locked === null) return <p>Loading...</p>;
  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">Door Control</h2></Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <p className="mb-3">Current status: <strong>{locked ? 'Locked' : 'Unlocked'}</strong></p>
              <Button onClick={toggleLock} variant={locked ? 'danger' : 'success'}>{locked ? 'Unlock' : 'Lock'}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DoorControl;
