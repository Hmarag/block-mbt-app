import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import {
  TextInput,
  Text,
  Paper,
  Button,
  Stack,
  Container,
  Title,
  Alert,
  Transition,
  Anchor,
} from '@mantine/core';
import classes from './RegisterPage.module.css';
import axios from '../../api/axiosConfig';
import { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';

export function RequestPasswordResetPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Μη έγκυρο email'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('/auth/request-password-reset', {
        email: values.email,
      });
      setSuccessMessage(response.data.message || 'Εάν υπάρχει λογαριασμός με αυτό το email, έχει σταλεί ένας σύνδεσμος αλλαγής κωδικού.');
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
            Αλλαγή Κωδικού
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Εισάγετε το email σας για να λάβετε οδηγίες.
          </Text>

          <Paper shadow="xl" p={30} mt={30} radius="md" className={classes.formPanel}>
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

                {successMessage && (
                  <Alert
                    icon={<IconCircleCheck size="1rem" />}
                    title="Επιτυχία"
                    color="green"
                  >
                    {successMessage}
                  </Alert>
                )}

                <TextInput
                  required
                  label="Email"
                  placeholder="Το email σας"
                  {...form.getInputProps('email')}
                  disabled={!!successMessage}
                />
              </Stack>

              <Stack align="center" mt="xl">
                <Button type="submit" className={classes.submitButton} loading={isSubmitting} disabled={!!successMessage}>
                  Αποστολή Email
                </Button>
                <Anchor component={Link} to="/login" c="dimmed" size="xs">
                  Επιστροφή στην Είσοδο
                </Anchor>
              </Stack>
            </form>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}