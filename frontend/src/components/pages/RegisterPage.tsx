import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';

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
  Modal,
  ScrollArea,
  List,
} from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';
import classes from './RegisterPage.module.css';
import { IconAlertCircle } from '@tabler/icons-react';

export function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [opened, { open, close }] = useDisclosure(false); // State για το Modal

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
        const errors = [];
        if (val.length < 8) {
          errors.push('τουλάχιστον 8 χαρακτήρες');
        }
        if (!/[A-Z]/.test(val)) {
          errors.push('ένα κεφαλαίο γράμμα');
        }
        if (!/[a-z]/.test(val)) {
          errors.push('ένα πεζό γράμμα');
        }
        if (!/\d/.test(val)) {
          errors.push('έναν αριθμό');
        }

        if (errors.length > 0) {
          return `Ο κωδικός πρέπει να περιέχει: ${errors.join(', ')}.`;
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
    
    const googleLoginUrl = `${backendUrl.replace(/\/$/, '')}/auth/google/login`;
    
    window.location.href = googleLoginUrl;
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={3}>Όροι Χρήσης Ιστοσελίδας</Title>}
        centered
        size="lg"
        scrollAreaComponent={ScrollArea.Autosize}
        styles={{
          content: {
            border: '2px solid black',
          },
        }}
      >
        <Stack gap="md">
          <Title order={5}>1. Εισαγωγή</Title>
          <Text size="sm">Η παρούσα ιστοσελίδα (εφεξής «Ιστοσελίδα») ανήκει και λειτουργεί από την εταιρεία Block MBT. Με την πρόσβαση και χρήση της Ιστοσελίδας, ο χρήστης συμφωνεί με τους παρόντες Όρους Χρήσης. Εάν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιείτε την Ιστοσελίδα.</Text>
          
          <Title order={5}>2. Σκοπός της Ιστοσελίδας</Title>
          <Text size="sm">Η Ιστοσελίδα παρέχει πληροφορίες, εργαλεία και ψηφιακές/αυτοματοποιημένες συμβουλευτικές υπηρεσίες για νεοφυείς επιχειρήσεις. Το περιεχόμενο έχει ενημερωτικό χαρακτήρα και δεν υποκαθιστά επαγγελματική ή νομική συμβουλή.</Text>

          <Title order={5}>3. Χρήση της Ιστοσελίδας</Title>
          <Text size="sm">Οι χρήστες οφείλουν:</Text>
          <List size="sm" withPadding>
            <List.Item>να χρησιμοποιούν την Ιστοσελίδα νόμιμα,</List.Item>
            <List.Item>να μην παρεμβαίνουν στη λειτουργία της,</List.Item>
            <List.Item>να μην επιχειρούν μη εξουσιοδοτημένη πρόσβαση σε συστήματα ή δεδομένα,</List.Item>
            <List.Item>να μην χρησιμοποιούν αυτοματοποιημένα μέσα (bots, scrapers) χωρίς άδεια.</List.Item>
          </List>

          <Title order={5}>4. Λογαριασμοί Χρηστών</Title>
          <Text size="sm">Για την πρόσβαση σε ορισμένες υπηρεσίες μπορεί να απαιτείται δημιουργία λογαριασμού. Ο χρήστης είναι υπεύθυνος για την ακρίβεια των δεδομένων του, οφείλει να διατηρεί το απόρρητο του κωδικού πρόσβασής του και ενημερώνει άμεσα την εταιρεία για τυχόν μη εξουσιοδοτημένη χρήση του λογαριασμού του. Η εταιρεία μπορεί να αναστείλει ή να διαγράψει λογαριασμούς σε περίπτωση παραβίασης των Όρων.</Text>

          <Title order={5}>5. Παρεχόμενες Υπηρεσίες</Title>
          <Text size="sm">Η εταιρεία μπορεί να προσφέρει δωρεάν υπηρεσίες (free plan), ψηφιακά εργαλεία, αυτοματοποιημένες συμβουλευτικές προτάσεις μέσω τεχνητής νοημοσύνης και συνδρομητικές υπηρεσίες. Η εταιρεία διατηρεί το δικαίωμα προσθήκης, τροποποίησης ή κατάργησης υπηρεσιών χωρίς προηγούμενη ειδοποίηση.</Text>

          <Title order={5}>6. Περιορισμός Ευθύνης</Title>
          <Text size="sm">Η εταιρεία καταβάλλει κάθε προσπάθεια για την ορθή λειτουργία της Ιστοσελίδας, ωστόσο δεν εγγυάται την αδιάλειπτη λειτουργία και δεν φέρει ευθύνη για οικονομικές απώλειες, αποφάσεις ή ζημιές που προκύπτουν από τη χρήση των υπηρεσιών. Οι αυτοματοποιημένες συμβουλευτικές υπηρεσίες παρέχονται «ως έχουν». Ο χρήστης χρησιμοποιεί τις υπηρεσίες με δική του ευθύνη.</Text>

          <Title order={5}>7. Πνευματική Ιδιοκτησία</Title>
          <Text size="sm">Όλο το περιεχόμενο της Ιστοσελίδας (κείμενα, γραφικά, λογότυπα, λογισμικό) αποτελεί πνευματική ιδιοκτησία της εταιρείας ή τρίτων. Απαγορεύεται η αντιγραφή, αναπαραγωγή, διανομή ή τροποποίηση χωρίς έγγραφη άδεια.</Text>

          <Title order={5}>8. Προστασία Προσωπικών Δεδομένων</Title>
          <Text size="sm">Η χρήση της Ιστοσελίδας διέπεται από την Πολιτική Απορρήτου, την οποία ο χρήστης οφείλει να διαβάζει και να αποδέχεται.</Text>

          <Title order={5}>11. Τροποποιήσεις των Όρων</Title>
          <Text size="sm">Η εταιρεία διατηρεί το δικαίωμα να τροποποιεί τους Όρους Χρήσης ανά πάσα στιγμή. Η συνέχιση της χρήσης θεωρείται αποδοχή των αλλαγών.</Text>

          <Title order={5}>12. Δίκαιο και Δικαιοδοσία</Title>
          <Text size="sm">Οι παρόντες Όροι διέπονται από το Ελληνικό Δίκαιο. Αρμόδια για την επίλυση διαφορών είναι τα δικαστήρια.</Text>

          <Title order={5}>13. Επικοινωνία</Title>
          <Text size="sm">Για οποιαδήποτε απορία μπορείτε να επικοινωνήσετε στο email: support@blockmbt.com</Text>
        </Stack>
      </Modal>

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

                  <Button
                    leftSection={<GoogleIcon />}
                    variant="default"
                    size="xl"
                    className={classes.googleButton}
                    onClick={handleGoogleLogin}
                  >
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
                    label={
                      <>
                        Αποδέχομαι τους{' '}
                        <Anchor
                          component="button"
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            open();
                          }}
                          size="sm"
                        >
                          όρους και τις προϋποθέσεις
                        </Anchor>
                      </>
                    }
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
    </>
  );
}