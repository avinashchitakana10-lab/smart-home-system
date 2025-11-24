import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { getNotificationSettings, updateNotificationSettings } from '../api/notifications';

function Notifications() {
  const [settings, setSettings] = useState({ sms: false, email: false, push: false, buzzer: false });

  useEffect(() => {
  async function fetchSettings() {
    try {
      const res = await getNotificationSettings();
      const data = res.data || res;

      // Fallback defaults to avoid uncontrolled component warnings
      setSettings({
        sms: data.sms ?? false,
        email: data.email ?? false,
        push: data.push ?? false,
        buzzer: data.buzzer ?? false,
      });
    } catch (err) {
      console.error(err);
    }
  }
  fetchSettings();
}, []);


  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const saveSettings = async () => {
    try {
      await updateNotificationSettings(settings);
      alert('Settings updated.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col><h2 className="fw-bold text-primary">Notification Settings</h2></Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Form>
                <Form.Check 
                  type="switch" label="SMS Alerts" name="sms"
                  checked={settings.sms} onChange={handleToggle} />
                <Form.Check 
                  type="switch" label="Email Alerts" name="email"
                  checked={settings.email} onChange={handleToggle} />
                <Form.Check 
                  type="switch" label="Push Notifications" name="push"
                  checked={settings.push} onChange={handleToggle} />
                <Form.Check 
                  type="switch" label="Buzzer Alarm" name="buzzer"
                  checked={settings.buzzer} onChange={handleToggle} />
                <Button className="mt-2" onClick={saveSettings} variant="primary">Save</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Notifications;
