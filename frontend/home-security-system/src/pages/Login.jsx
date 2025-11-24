import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import './Auth.css'; // 👈 add this import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card shadow-lg border-0">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="auth-title mb-1">Welcome back</h2>
            <p className="text-muted mb-0">Sign in to Smart Home Security</p>
          </div>

          {error && <Alert variant="danger" className="py-2">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="auth-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="auth-input"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="auth-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="auth-input"
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Button variant="primary" type="submit" className="auth-primary-btn">
                Login
              </Button>

              <Button
                variant="outline-secondary"
                type="button"
                className="auth-secondary-btn"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
