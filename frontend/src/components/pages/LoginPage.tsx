import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Container,
  Title,
  Alert,
  Transition,
} from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';
import classes from './RegisterPage.module.css';
import axios from '../../api/axiosConfig';
import { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Μη έγκυρο email'),
      password: (val) => (val.length < 6 ? 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      const accessToken = response.data?.access_token ?? null;
      if (accessToken) {
        login(accessToken);
      } else {
        login(response.data);
      }

      navigate('/dashboard');
    } catch (err: any) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.detail || 'Προέκυψε ένα άγνωστο σφάλμα.');
      } else {
        setError('Δεν ήταν δυνατή η σύνδεση με τον server.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    // *** Η ΔΙΟΡΘΩΣΗ ΕΙΝΑΙ ΕΔΩ ***
    // Διασφαλίζει ότι δεν θα υπάρξει ποτέ διπλό slash
    const googleLoginUrl = `${backendUrl.replace(/\/$/, '')}/auth/google/login`;
    
    window.location.href = googleLoginUrl;
  };

  return (
    <Transition mounted={mounted} transition="fade" duration={400} timingFunction="ease">
      {(styles) => (
        <Container size={520} my={120} style={styles}>
          <Title ta="center" className={classes.title}>
            Καλώς ήρθες ξανά!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Δεν έχεις λογαριασμό;{' '}
            <Anchor size="sm" component={Link} to="/register" className={classes.link}>
              Εγγραφή
            </Anchor>
          </Text>

          <Paper shadow="xl" p={30} mt={30} radius="md" className={classes.formPanel}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                {error && (
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Σφάλμα Εισόδου"
                    color="red"
                    withCloseButton
                    onClose={() => setError(null)}
                  >
                    {error}
                  </Alert>
                )}

                <Button 
                  leftSection={<GoogleIcon />} 
                  variant="default" 
                  size="xl" 
                  className={classes.googleButton}
                  onClick={handleGoogleLogin}
                >
                  Google
                </Button>

                <Divider label="Ή συνδέσου με email" labelPosition="center" my="lg" />

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
              </Stack>

              <Group justify="space-between" mt="xl">
                <Anchor component={Link} to="/request-password-reset" c="dimmed" size="xs">
                  Ξέχασες τον κωδικό σου;
                </Anchor>
                <Button type="submit" className={classes.submitButton} loading={isSubmitting}>
                  Είσοδος
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}