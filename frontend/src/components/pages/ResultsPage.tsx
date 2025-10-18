import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Title, Text, Loader, Stack, Alert, ActionIcon, Tooltip, Affix, Button, Group } from '@mantine/core';
import axios from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import { IconAlertCircle, IconLayoutDashboard } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classes from './ResultsPage.module.css';

export function ResultsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrGenerateAdvice = async () => {
      if (!token || !projectId) return;

      setIsLoading(true);
      setError(null);

      try {
        const projectDetailsResponse = await axios.get(`/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const existingAdvice = projectDetailsResponse.data.ai_advice;

        if (existingAdvice) {
          setAdvice(existingAdvice);
        } else {
          const generateResponse = await axios.post(
            `/projects/${projectId}/generate-advice`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setAdvice(generateResponse.data.ai_advice);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.detail || 'Παρουσιάστηκε ένα άγνωστο σφάλμα.';
        setError(errorMessage);
        console.error("Error in results page:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrGenerateAdvice();
  }, [projectId, token]);

  return (
    <Container size="lg" my={80}>
      <Affix position={{ top: 20, right: 20 }}>
        <Tooltip label="Επιστροφή στο Dashboard" withArrow position="left">
          <ActionIcon size="xl" radius="xl" variant="filled" onClick={() => navigate('/dashboard')}><IconLayoutDashboard size={24} /></ActionIcon>
        </Tooltip>
      </Affix>

      {/* --- 1η ΑΛΛΑΓΗ: Αφαιρέσαμε το 'withBorder' για να εφαρμοστεί σωστά το custom border --- */}
      <Paper shadow="xl" p="xl" radius="md" className={classes.resultsPaper}>
        {isLoading && (
          <Stack align="center" gap="lg" my="xl">
            <Loader size="xl" />
            <Title order={3}>Η BlockMBT αναλύει τις απαντήσεις σας...</Title>
            <Text c="dimmed">Αυτό μπορεί να διαρκέσει μερικά δευτερόλεπτα.</Text>
          </Stack>
        )}

        {error && (
          <Alert icon={<IconAlertCircle size="1rem" />} title="Σφάλμα" color="red">{error}</Alert>
        )}

        {advice && !isLoading && (
          <div className={classes.markdownContent}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{advice}</ReactMarkdown>
          </div>
        )}

        {/* --- 2η ΑΛΛΑΓΗ: Προσθήκη του κουμπιού επιστροφής --- */}
        {!isLoading && (
          <Group justify="center" mt="xl">
            <Button size="lg" variant="default" onClick={() => navigate('/dashboard')}>
              Επιστροφή στο Dashboard
            </Button>
          </Group>
        )}
      </Paper>
    </Container>
  );
}