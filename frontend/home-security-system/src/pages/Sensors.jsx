import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import { getSensors } from '../api/sensors';

function Sensors() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSensors();
        setSensors(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">Sensors</h2></Col>
      </Row>
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Table striped bordered hover responsive className="mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map((s) => (
                    <tr key={s._id}>
                      <td>{s._id}</td>
                      <td>{s.status}</td>
                      <td>{new Date(s.updatedAt).toLocaleString()}</td>
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

export default Sensors;
