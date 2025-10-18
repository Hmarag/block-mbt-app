import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Title,
  Alert,
  Transition,
} from '@mantine/core';
import { GoogleIcon } from './/GoogleIcon';
import classes from './RegisterPage.module.css';
import { IconAlertCircle } from '@tabler/icons-react';

export function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validate: {
      name: (val) => (val.trim().length < 2 ? 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες' : null),
      email: (val) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email'),
      password: (val) => {
        if (val.length < 8) {
          return 'Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες';
        }
        if (!/[A-Z]/.test(val)) {
          return 'Ο κωδικός πρέπει να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα';
        }
        if (!/[a-z]/.test(val)) {
          return 'Ο κωδικός πρέπει να περιέχει τουλάχιστον ένα πεζό γράμμα';
        }
        if (!/\d/.test(val)) {
          return 'Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν αριθμό';
        }
        return null;
      },
      confirmPassword: (val, values) => (val !== values.password ? 'Οι κωδικοί δεν ταιριάζουν' : null),
      terms: (val) => (val ? null : 'Πρέπει να αποδεχτείτε τους όρους και τις προϋποθέσεις'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/auth/register', {
        username: values.name,
        email: values.email,
        password: values.password,
      });

      console.log(response.data);
      alert('Η εγγραφή ήταν επιτυχής! Θα μεταφερθείτε στη σελίδα εισόδου.');
      navigate('/login');

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.detail || 'Προέκυψε ένα άγνωστο σφάλμα.');
      } else {
        setError('Δεν ήταν δυνατή η σύνδεση με τον server.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }; 
 
  return (
    <Transition mounted={mounted} transition="fade" duration={400} timingFunction="ease">
      {(styles) => (
        <Container size={560} my={120} style={styles}>
          <Title ta="center" className={classes.title}>
            Καλώς ήρθατε!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Έχετε ήδη λογαριασμό;{' '}
            <Anchor size="sm" component={Link} to="/login" className={classes.link}>
              Συνδεθείτε
            </Anchor>
          </Text>

          <Paper shadow="xl" p={30} mt={30} radius="md" className={classes.formPanel}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                {error && (
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Σφάλμα Εγγραφής"
                    color="red"
                    withCloseButton
                    onClose={() => setError(null)}
                  >
                    {error}
                  </Alert>
                )}

                <Button leftSection={<GoogleIcon />} variant="default" size="xl" className={classes.googleButton}>
                  Google
                </Button>

                <Divider label="Ή συνεχίστε με email" labelPosition="center" my="lg" />

                <TextInput
                  required
                  label="Όνομα"
                  placeholder="John Doe"
                  {...form.getInputProps('name')}
                />

                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  {...form.getInputProps('email')}
                />

                <PasswordInput
                  required
                  label="Κωδικός"
                  placeholder="Your password"
                  {...form.getInputProps('password')}
                />

                <PasswordInput
                  required
                  label="Επιβεβαίωση Κωδικού"
                  placeholder="Confirm password"
                  {...form.getInputProps('confirmPassword')}
                />

                <Checkbox
                  label="Αποδέχομαι τους όρους και τις προϋποθέσεις"
                  {...form.getInputProps('terms', { type: 'checkbox' })}
                />
              </Stack>

              <Group justify="flex-end" mt="xl">
                <Button type="submit" className={classes.submitButton} loading={isSubmitting}>
                  Εγγραφή
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}