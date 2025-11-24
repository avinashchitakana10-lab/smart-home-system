import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { getSettings, updateSettings } from '../api/settings';
import { getProfile, updateProfile } from '../api/auth';

function Settings() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [systemSettings, setSystemSettings] = useState({ alertsEnabled: false });
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const user = await getProfile();
        setProfile({
          username: user.username ?? user.name ?? '',
          email: user.email ?? ''
        });
      } catch (err) {
        console.error('profile load', err);
      }

      try {
        const s = await getSettings();
        // if backend returned array convert
        if (Array.isArray(s)) {
          const map = {};
          s.forEach(it => { if (it.key) map[it.key] = it.value; });
          setSystemSettings(prev => ({ ...prev, ...map }));
        } else {
          setSystemSettings(prev => ({ ...prev, ...s }));
        }
      } catch (err) {
        console.error('settings load', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (e) => {
    e?.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await updateProfile({ username: profile.username, email: profile.email });
      setProfile({ username: updated.username, email: updated.email });
      alert('Profile saved.');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const saveSystemSettings = async () => {
    setSavingSettings(true);
    try {
      // send the object once
      const updated = await updateSettings(systemSettings);
      setSystemSettings(prev => ({ ...prev, ...updated }));
      alert('System settings saved.');
    } catch (err) {
      console.error(err);
      alert('Failed to save system settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading) return <div className="p-4"><Spinner animation="border" /> Loading...</div>;

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">User Profile</h2></Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Body>
              <Form onSubmit={saveProfile}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" value={profile.username} onChange={onProfileChange} />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" value={profile.email} onChange={onProfileChange} />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={savingProfile}>
                  {savingProfile ? 'Saving...' : 'Save Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Body>
              <h4 className="mb-3">System Settings</h4>
              <Form>
                <Form.Check
                  type="switch"
                  id="alertsSwitch"
                  label="Enable System Alerts"
                  checked={!!systemSettings.alertsEnabled}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, alertsEnabled: e.target.checked }))}
                />
                <div className="mt-3">
                  <Button variant="primary" onClick={saveSystemSettings} disabled={savingSettings}>
                    {savingSettings ? 'Saving...' : 'Save System Settings'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
