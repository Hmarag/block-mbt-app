import { useState, useEffect } from 'react';
import { Container, Title, Text, Paper, TextInput, Textarea, Button, Group, SimpleGrid, Transition } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from '../../api/axiosConfig';
import classes from './ContactPage.module.css';

export function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Το όνομα είναι πολύ μικρό' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Μη έγκυρη διεύθυνση email'),
      subject: (value) => (value.trim().length === 0 ? 'Το θέμα δεν μπορεί να είναι κενό' : null),
      message: (value) => (value.trim().length < 10 ? 'Το μήνυμα είναι πολύ μικρό' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await axios.post('/contact', values);
      notifications.show({
        title: 'Ευχαριστούμε!',
        message: 'Το μήνυμά σας έχει σταλεί με επιτυχία. Θα επικοινωνήσουμε μαζί σας σύντομα.',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 6000,
      });
      form.reset();
    } catch (error) {
      notifications.show({
        title: 'Σφάλμα',
        message: 'Παρουσιάστηκε ένα πρόβλημα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά.',
        color: 'red',
        icon: <IconX size={18} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition mounted={mounted} transition="fade" duration={500} timingFunction="ease">
      {(styles) => (
        <Container size="lg" my={80} style={styles}>
          {/* --- Η ΑΛΛΑΓΗ ΕΙΝΑΙ ΕΔΩ: Αφαιρέσαμε το 'withBorder' --- */}
          <Paper shadow="xl" p="xl" radius="md" className={classes.contactPaper}>
            <Title order={2} ta="center" mb="lg">
              Επικοινωνήστε Μαζί Μας
            </Title>
            <Text c="dimmed" ta="center" mb="xl">
              Έχετε κάποια ερώτηση ή χρειάζεστε βοήθεια; Συμπληρώστε τη φόρμα και θα σας απαντήσουμε το συντομότερο δυνατό.
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <TextInput
                  label="Ονοματεπώνυμο"
                  placeholder="Το όνομά σας"
                  required
                  classNames={{ input: classes.input, label: classes.label }}
                  {...form.getInputProps('name')}
                />
                <TextInput
                  label="Email"
                  placeholder="Το email σας"
                  required
                  classNames={{ input: classes.input, label: classes.label }}
                  {...form.getInputProps('email')}
                />
              </SimpleGrid>

              <TextInput
                label="Θέμα"
                placeholder="Θέμα μηνύματος"
                required
                mt="lg"
                classNames={{ input: classes.input, label: classes.label }}
                {...form.getInputProps('subject')}
              />

              <Textarea
                label="Μήνυμα"
                placeholder="Γράψτε το μήνυμά σας εδώ..."
                required
                mt="lg"
                minRows={5}
                classNames={{ input: classes.input, label: classes.label }}
                {...form.getInputProps('message')}
              />

              <Group justify="center" mt="xl">
                <Button type="submit" size="lg" loading={loading} className={classes.control}>
                  Αποστολή Μηνύματος
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}