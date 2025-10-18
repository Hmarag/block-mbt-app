import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Paper, Stack, Button, Modal, TextInput, Card, Group, ThemeIcon, Transition } from '@mantine/core';
import { IconPencil, IconTrash, IconPlus, IconFilesOff, IconChartBar } from '@tabler/icons-react';
import axios from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import classes from './DashboardPage.module.css';

interface Project {
  id: number;
  name: string;
  type: 'existing' | 'new';
  ai_advice: string | null;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameModalOpened, setNameModalOpened] = useState(false);
  const [typeModalOpened, setTypeModalOpened] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return;
      try {
        const response = await axios.get('/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Αποτυχία φόρτωσης projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addProject = async (projectType: 'existing' | 'new') => {
    if (!newProjectName.trim() || !projectType) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        '/projects',
        { name: newProjectName.trim(), type: projectType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const newProject = response.data;
      setNewProjectName('');
      setNameModalOpened(false);
      setTypeModalOpened(false);
      navigate(`/project/${newProject.id}`, { state: { projectType: newProject.type } });

    } catch (error) {
      console.error('Αποτυχία δημιουργίας project:', error);
      alert('Παρουσιάστηκε σφάλμα κατά τη δημιουργία του project.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    const confirmed = window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το project; Αυτή η ενέργεια δεν αναιρείται.');
    if (!confirmed) return;

    try {
      await axios.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((p) => p.filter((x) => x.id !== id));
    } catch (error) {
      console.error('Αποτυχία διαγραφής project:', error);
      alert('Παρουσιάστηκε σφάλμα κατά τη διαγραφή του project.');
    }
  };

  const nameModalContent = (
    <Stack>
      <Title order={3} ta="center">Νέο Project</Title>
      <TextInput
        label="Όνομα Project"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.currentTarget.value)}
        placeholder="Π.χ. Καφετέρια Κέντρο"
        size="lg"
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={() => setNameModalOpened(false)}>Άκυρο</Button>
        <Button
          onClick={() => {
            if (newProjectName.trim()) {
              setNameModalOpened(false);
              setTypeModalOpened(true);
            }
          }}
          style={{ minWidth: 120 }}
        >
          Συνέχεια
        </Button>
      </Group>
    </Stack>
  );

  const typeModalContent = (
    <Stack>
      <Title order={3} ta="center">Τι είδος επιχείρηση έχετε;</Title>
      <Text c="dimmed" ta="center" mt={5}>Επιλέξτε μια από τις παρακάτω επιλογές:</Text>
      <Stack mt="xl" mb="md" gap="lg">
        <Button variant="outline" size="xl" loading={isLoading} onClick={() => addProject('existing')} className={classes.modalButton}>Υπάρχουσα</Button>
        <Button variant="outline" size="xl" loading={isLoading} onClick={() => addProject('new')} className={classes.modalButton}>Μη Υπάρχουσα / Νεοφυής</Button>
      </Stack>
    </Stack>
  );

  return (
    <Transition mounted={mounted} transition="fade" duration={500} timingFunction="ease">
      {(styles) => (
        <Container size="xl" my={80} style={styles}>
          <Paper shadow="xl" p={36} radius="md" className={classes.dashboardPaper}>
            <Stack gap={22}>
              <Group justify="space-between">
                <div>
                  <Title order={2} style={{ fontSize: 30 }}>Block Επιχειρήσεων</Title>
                  <Text c="dimmed" mt={6}>Εδώ θα μπορείς να διαχειρίζεσαι τα business plans σου.</Text>
                </div>
                <Button onClick={() => { setNewProjectName(''); setNameModalOpened(true); }} size="lg" leftSection={<IconPlus size={22} />} className={classes.createButton}>Δημιουργία νέου project</Button>
              </Group>
              <Title order={4} mt={8}>Τα Projects σου :</Title>
              {isLoading ? (<Text>Φόρτωση projects...</Text>) : projects.length === 0 ? (
                <Stack align="center" justify="center" gap="md" className={classes.emptyState}>
                  <ThemeIcon variant="light" size={80} radius={80}><IconFilesOff style={{ width: '50%', height: '50%' }} /></ThemeIcon>
                  <Title order={3} ta="center">Κανένα Project Ακόμα;</Title>
                  <Text c="dimmed" ta="center" size="lg">Πατήστε "Δημιουργία νέου project" για να ξεκινήσετε το πρώτο σας business plan!</Text>
                </Stack>
              ) : (
                <Stack gap={18}>
                  {projects.map((project) => (
                    <Card key={project.id} shadow="sm" withBorder radius="md" className={classes.projectCard}>
                      <Group justify="space-between">
                        <div style={{ flex: 1 }}>
                          <Text fw={800} size="lg">{project.name}</Text>
                          <Text c="dimmed" mt={4}>{project.type === 'existing' ? 'Υπάρχουσα Επιχείρηση' : 'Νέα Ιδέα'}</Text>
                        </div>
                        <Group gap="sm">
                          {project.ai_advice && (
                            <Button size="sm" variant="light" leftSection={<IconChartBar size={16} />} onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.id}/results`); }}>Αποτελέσματα</Button>
                          )}
                          <Button size="sm" variant="light" leftSection={<IconPencil size={16} />} onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.id}`, { state: { projectType: project.type } }); }}>Επεξεργασία</Button>
                          <Button size="sm" color="red" variant="outline" leftSection={<IconTrash size={16} />} onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}>Διαγραφή</Button>
                        </Group>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              )}
            </Stack>
          </Paper>
          <Modal opened={nameModalOpened} onClose={() => { setNameModalOpened(false); }} centered size="lg" radius="md" classNames={{ content: classes.modalContent }}>{nameModalContent}</Modal>
          <Modal opened={typeModalOpened} onClose={() => { setTypeModalOpened(false); }} centered size="xl" radius="md" classNames={{ content: classes.modalContent }}>{typeModalContent}</Modal>
        </Container>
      )}
    </Transition>
  );
}