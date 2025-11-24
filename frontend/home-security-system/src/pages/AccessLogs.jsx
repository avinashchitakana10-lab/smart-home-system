import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { getAccessLogs } from '../api/access';

function AccessLogs() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ from: '', to: '', result: '', method: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await getAccessLogs(filters);
      // axios responses put payload in res.data — be defensive
      const payload = res?.data || res;
      const list = Array.isArray(payload?.logs) ? payload.logs : (Array.isArray(payload) ? payload : []);
      setLogs(list);
    } catch (err) {
      console.error('getAccessLogs error', err?.response?.data || err.message || err);
      setError(err?.response?.data?.error || 'Failed to fetch access logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchLogs();
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '-';
    const d = new Date(ts);
    return isNaN(d.getTime()) ? '-' : d.toLocaleString();
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">Access Logs</h2></Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Form className="mb-3">
                <Row className="g-2">
                  <Col md={2}>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control type="date" name="from" value={filters.from} onChange={handleFilterChange} />
                  </Col>
                  <Col md={2}>
                    <Form.Label>To Date</Form.Label>
                    <Form.Control type="date" name="to" value={filters.to} onChange={handleFilterChange} />
                  </Col>
                  <Col md={2}>
                    <Form.Label>Result</Form.Label>
                    <Form.Control type="text" name="result" value={filters.result} onChange={handleFilterChange} placeholder="success/failed/unknown" />
                  </Col>
                  <Col md={2}>
                    <Form.Label>Method</Form.Label>
                    <Form.Control type="text" name="method" value={filters.method} onChange={handleFilterChange} placeholder="camera/keypad/admin" />
                  </Col>
                  <Col md={2} className="align-self-end d-flex align-items-end">
                    <Button onClick={applyFilters} disabled={loading} variant="primary">
                      {loading ? <><Spinner animation="border" size="sm"/> Loading</> : 'Filter'}
                    </Button>
                  </Col>
                </Row>
              </Form>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="table-responsive">
                <Table striped bordered hover className="mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>Timestamp</th>
                      <th>User</th>
                      <th>Method</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.length === 0 && !loading ? (
                      <tr><td colSpan={4} className="text-center">No logs found</td></tr>
                    ) : (
                      logs.map((log, idx) => (
                        <tr key={log._id || idx}>
                          <td>{formatTimestamp(log.timestamp)}</td>
                          <td>{log.userId?.name || log.userId?.email || 'Unknown'}</td>
                          <td>{log.method || '-'}</td>
                          <td>{log.result || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccessLogs;
