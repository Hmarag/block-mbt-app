import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Title, Text, Loader, Button, Alert, Stack } from '@mantine/core';
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext'; // --- ΒΗΜΑ 1: Εισάγουμε το useAuth ---

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth(); // --- ΒΗΜΑ 2: Παίρνουμε τη συνάρτηση login από το context ---
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Δεν βρέθηκε token επιβεβαίωσης. Παρακαλώ προσπαθήστε ξανά από το link στο email σας.');
      return;
    }

    const verifyTokenAndLogin = async () => {
      try {
        const response = await axios.get(`/auth/verify-email?token=${token}`);
        const accessToken = response.data.access_token;

        // --- ΒΗΜΑ 3: Χρησιμοποιούμε τη συνάρτηση login για να ενημερώσουμε όλη την εφαρμογή ---
        login(accessToken);

        setStatus('success');
        setMessage('Ο λογαριασμός σας ενεργοποιήθηκε! Ανακατεύθυνση στο dashboard...');

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } catch (err: any) {
        setStatus('error');
        if (axios.isAxiosError(err) && err.response) {
          setMessage(err.response.data.detail || 'Προέκυψε ένα σφάλμα. Ο σύνδεσμος μπορεί να είναι άκυρος ή να έχει λήξει.');
        } else {
          setMessage('Δεν ήταν δυνατή η επικοινωνία με τον server.');
        }
      }
    };

    verifyTokenAndLogin();
  }, [token, navigate, login]); // Προσθέτουμε το login στις εξαρτήσεις

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <Stack align="center" gap="md">
            <Text size="lg">Γίνεται επιβεβαίωση και σύνδεση...</Text>
            <Loader />
          </Stack>
        );
      case 'success':
        return (
          <Alert icon={<IconCircleCheck size="1.5rem" />} title="Επιτυχία!" color="green" variant="light">
            <Text>{message}</Text>
          </Alert>
        );
      case 'error':
        return (
          <Alert icon={<IconAlertCircle size="1.5rem" />} title="Σφάλμα!" color="red" variant="light">
             <Stack>
              <Text>{message}</Text>
              <Button component={Link} to="/register" fullWidth mt="md" color="red">
                Επιστροφή στην Εγγραφή
              </Button>
            </Stack>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <Container size={520} my={120}>
      <Title ta="center">Ενεργοποίηση Λογαριασμού</Title>
      <Paper withBorder shadow="xl" p={30} mt={30} radius="md">
        {renderContent()}
      </Paper>
    </Container>
  );
}