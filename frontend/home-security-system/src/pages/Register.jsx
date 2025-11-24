import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth'; // adjust path if different
import './Auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card shadow-lg border-0">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="auth-title mb-1">Create account</h2>
            <p className="text-muted mb-0">Join Smart Home Security</p>
          </div>

          {error && <Alert variant="danger" className="py-2">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="username" className="mb-3">
              <Form.Label className="auth-label">Username</Form.Label>
              <Form.Control
                type="text"
                autoComplete="username"
                placeholder="Choose username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="auth-input"
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="auth-label">Email</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="auth-label">Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="new-password"
                placeholder="Choose password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Button variant="primary" type="submit" className="auth-primary-btn">
                Register
              </Button>

              <Button
                variant="outline-secondary"
                type="button"
                className="auth-secondary-btn"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
