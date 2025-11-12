import { useForm } from '@mantine/form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  PasswordInput,
  Text,
  Paper,
  Button,
  Stack,
  Container,
  Title,
  Alert,
  Transition,
} from '@mantine/core';
import classes from './RegisterPage.module.css';
import axios from '../../api/axiosConfig';
import { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';

export function ResetPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    setMounted(true);
    if (!token) {
      setError('Μη έγκυρος ή ελλιπής σύνδεσμος αλλαγής κωδικού.');
    }
  }, [token]);

  const form = useForm({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (val) => (val.length < 6 ? 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες' : null),
      confirmPassword: (val, values) => (val !== values.newPassword ? 'Οι κωδικοί δεν ταιριάζουν' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('/auth/reset-password', {
        token: token,
        new_password: values.newPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 4000); // Ανακατεύθυνση μετά από 4 δευτερόλεπτα
    } catch (err: any) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.detail || 'Προέκυψε ένα άγνωστο σφάλμα.');
      } else {
        setError('Δεν ήταν δυνατή η σύνδεση με τον server.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition mounted={mounted} transition="fade" duration={400} timingFunction="ease">
      {(styles) => (
        <Container size={520} my={120} style={styles}>
          <Title ta="center" className={classes.title}>
            Ορίστε Νέο Κωδικό
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Εισάγετε τον νέο σας κωδικό πρόσβασης.
          </Text>

          <Paper shadow="xl" p={30} mt={30} radius="md" className={classes.formPanel}>
            {success ? (
              <Alert icon={<IconCircleCheck size="1rem" />} title="Επιτυχία!" color="green">
                Ο κωδικός σας άλλαξε επιτυχώς. Θα μεταφερθείτε στη σελίδα εισόδου σε λίγα δευτερόλεπτα.
              </Alert>
            ) : (
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                  {error && (
                    <Alert
                      icon={<IconAlertCircle size="1rem" />}
                      title="Σφάλμα"
                      color="red"
                      withCloseButton
                      onClose={() => setError(null)}
                    >
                      {error}
                    </Alert>
                  )}

                  <PasswordInput
                    required
                    label="Νέος Κωδικός"
                    placeholder="Ο νέος σας κωδικός"
                    {...form.getInputProps('newPassword')}
                    disabled={!token}
                  />
                  <PasswordInput
                    required
                    label="Επιβεβαίωση Κωδικού"
                    placeholder="Επιβεβαιώστε τον κωδικό"
                    {...form.getInputProps('confirmPassword')}
                    disabled={!token}
                  />
                </Stack>

                <Stack align="center" mt="xl">
                  <Button type="submit" className={classes.submitButton} loading={isSubmitting} disabled={!token}>
                    Αλλαγή Κωδικού
                  </Button>
                </Stack>
              </form>
            )}
          </Paper>
        </Container>
      )}
    </Transition>
  );
}