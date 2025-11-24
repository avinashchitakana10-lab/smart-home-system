import React, { useState } from 'react';
import { Container, Row, Col, Alert, Form, Button, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';

function Cam() {
  const [nodeId, setNodeId] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAuthHeader = () => {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const fetchCam = async (e) => {
    e && e.preventDefault();
    setError('');
    setStreamUrl('');
    if (!nodeId) return setError('Please enter a camera nodeId');
    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_BASE}/api/cam/status/${encodeURIComponent(nodeId)}`, { headers: getAuthHeader() });
      const cam = res.data;
      const url = cam?.value?.streamUrl || '';
      if (!url) setError('No streamUrl available for this camera');
      setStreamUrl(url);
    } catch (err) {
      console.error('fetchCam error', err?.response?.data || err.message);
      setError(err?.response?.data?.error || 'Failed to fetch camera');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">ESP32-CAM Feed</h2></Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Form onSubmit={fetchCam}>
                <Form.Group controlId="nodeId">
                  <Form.Label>Camera nodeId</Form.Label>
                  <Form.Control value={nodeId} onChange={e => setNodeId(e.target.value)} placeholder="e.g. cam-1" />
                </Form.Group>
                <div className="mt-2">
                  <Button type="submit" disabled={loading} variant="primary">
                    {loading ? <><Spinner animation="border" size="sm" /> Fetching...</> : 'Fetch Camera'}
                  </Button>
                </div>
              </Form>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {streamUrl
            ? <Card className="shadow"><Card.Body><iframe src={streamUrl} title="ESP32-CAM" width="100%" height="480" style={{ border: 'none' }} /></Card.Body></Card>
            : !error && <Alert variant="info">No live feed available. Enter a nodeId and press Fetch Camera.</Alert>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Cam;
