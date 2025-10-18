import { Container, Paper, Title, Stack, Text, Button, Group, Transition, ActionIcon, Affix, Tooltip, Radio, Checkbox, Textarea } from '@mantine/core';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import classes from './FormPage.module.css';
import { questionnaires } from '../../data/questionnaireData';
import type { Question, Chapter, Option, SubQuestion } from '../../data/questionnaireData';
import { IconLayoutDashboard, IconInfoCircle } from '@tabler/icons-react';

export function FormPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const projectType = location.state?.projectType || 'new';

  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isChapterVisible, setIsChapterVisible] = useState(true);
  const [highestChapterReached, setHighestChapterReached] = useState(0);

  const questionnaireData: Chapter[] = questionnaires[projectType as keyof typeof questionnaires] || questionnaires.new;

  const calculateHighestChapter = (fetchedAnswers: { [key: string]: any }, data: Chapter[]) => {
    let highestIndex = 0;
    if (Object.keys(fetchedAnswers).length === 0) {
      return 0;
    }

    data.forEach((chapter, index) => {
      const chapterHasAnswer = chapter.questions.some(question => {
        if (question.type === 'group' && question.subQuestions) {
          return question.subQuestions.some(subQ => fetchedAnswers.hasOwnProperty(subQ.id));
        }
        return fetchedAnswers.hasOwnProperty(question.id);
      });

      if (chapterHasAnswer) {
        highestIndex = Math.max(highestIndex, index);
      }
    });
    
    return Math.min(highestIndex + 1, data.length - 1);
  };


  useEffect(() => {
    setIsMounted(true);
    const fetchAnswers = async () => {
      if (!token || !projectId) return;
      try {
        const response = await axios.get(`/projects/${projectId}/answers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedAnswers = response.data || {};
        setAnswers(fetchedAnswers);
        
        const calculatedHighestChapter = calculateHighestChapter(fetchedAnswers, questionnaireData);
        setHighestChapterReached(calculatedHighestChapter);

      } catch (error) {
        console.error("Αποτυχία φόρτωσης απαντήσεων:", error);
      }
    };
    fetchAnswers();
  }, [token, projectId, questionnaireData]);

  const handleAnswerChange = (questionId: string, value: string, type: 'radio' | 'checkbox' | 'textarea') => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      if (type === 'checkbox') {
        const currentValues = (newAnswers[questionId] as string[] || []);
        if (currentValues.includes(value)) {
          newAnswers[questionId] = currentValues.filter((v) => v !== value);
        } else {
          newAnswers[questionId] = [...currentValues, value];
        }
      } else {
        newAnswers[questionId] = value;
      }
      return newAnswers;
    });
  };

  const saveProgress = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`/projects/${projectId}/answers`, { answers }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error('Αποτυχία αποθήκευσης προόδου:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 1η ΑΛΛΑΓΗ ΕΔΩ ---
  const changeChapter = (newIndex: number) => {
    if (isSubmitting) return;
    setHighestChapterReached(prev => Math.max(prev, newIndex));
    setIsChapterVisible(false);
    // Αυξήσαμε το timeout για να ταιριάζει με τη νέα, μεγαλύτερη διάρκεια του transition
    setTimeout(() => {
      setCurrentChapterIndex(newIndex);
      window.scrollTo(0, 0);
      setIsChapterVisible(true);
    }, 400);
  };

  const isLastChapter = currentChapterIndex === questionnaireData.length - 1;

  const handleNext = async () => {
    await saveProgress();
    if (isLastChapter) {
      navigate(`/project/${projectId}/results`);
    } else {
      changeChapter(currentChapterIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      changeChapter(currentChapterIndex - 1);
    }
  };

  const renderQuestion = (question: Question | SubQuestion) => {
    const { id, type, options } = question;

    const renderOption = (option: Option, questionId: string, inputType: 'radio' | 'checkbox') => {
      const isSelected = inputType === 'radio'
        ? answers[questionId] === option.value
        : (answers[questionId] as string[] || []).includes(option.value);

      return (
        <div key={option.value} className={classes.optionWrapper}>
          <label className={`${classes.optionLabel} ${isSelected ? classes.optionLabelSelected : ''}`}>
            <input
              type={inputType}
              name={questionId}
              value={option.value}
              checked={isSelected}
              onChange={() => handleAnswerChange(questionId, option.value, inputType)}
              className={classes.optionInput}
            />
            <div className={inputType === 'radio' ? classes.radioBullet : classes.checkboxSquare}></div>
            <span className={classes.optionText}>{option.value}</span>
          </label>
          {option.info && (
            <Tooltip
              label={option.info}
              withArrow
              multiline
              style={{ width: 220 }}
              events={{ hover: true, focus: true, touch: true }}
            >
              <ActionIcon variant="subtle" radius="xl" className={classes.infoIcon}>
                <IconInfoCircle style={{ width: '80%', height: '80%' }} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      );
    };

    switch (type) {
      case 'radio':
        return (
          <Radio.Group key={id} value={(answers[id] as string) || ''} name={id}>
            <Stack gap="sm">{options?.map(opt => renderOption(opt, id, 'radio'))}</Stack>
          </Radio.Group>
        );
      case 'checkbox':
        return (
          <Checkbox.Group key={id} value={(answers[id] as string[]) || []}>
            <Stack gap="sm">{options?.map(opt => renderOption(opt, id, 'checkbox'))}</Stack>
          </Checkbox.Group>
        );
      case 'textarea':
        const { placeholder } = question as Question;
        return (
          <Textarea
            key={id}
            placeholder={placeholder}
            value={(answers[id] as string) || ''}
            onChange={(e) => handleAnswerChange(id, e.currentTarget.value, 'textarea')}
            autosize
            minRows={4}
          />
        );
      case 'group':
        const groupQuestion = question as Question;
        return (
          <Stack gap="lg">
            {groupQuestion.subQuestions?.map(subQ => (
              <div key={subQ.id} className={classes.subQuestionBlock}>
                <Text fw={500} mb="xs">{subQ.text}</Text>
                {renderQuestion(subQ)}
              </div>
            ))}
          </Stack>
        );
      default:
        return null;
    }
  };

  const currentChapter = questionnaireData[currentChapterIndex];
  if (!currentChapter) return <Container><Text>Φόρτωση ερωτηματολογίου...</Text></Container>;

  return (
    <Transition mounted={isMounted} transition="fade" duration={500} timingFunction="ease">
      {(styles) => (
        <Container size="md" my="xl" style={{ ...styles, position: 'relative' }}>
          <Affix position={{ top: 20, right: 20 }}>
            <Tooltip label="Επιστροφή στο Dashboard" withArrow position="left">
              <ActionIcon size="xl" radius="xl" variant="filled" onClick={() => navigate('/dashboard')}><IconLayoutDashboard size={24} /></ActionIcon>
            </Tooltip>
          </Affix>

          <Paper shadow="xl" p={{ base: 20, sm: 36 }} radius="md" className={classes.formPaper}>
            {/* --- 2η ΑΛΛΑΓΗ ΕΔΩ --- */}
            <Transition mounted={isChapterVisible} transition="fade" duration={350} timingFunction="ease-in-out">
              {(innerStyles) => (
                <div style={innerStyles}>
                  <Stack gap="xl">
                    <Title order={2} className={classes.formTitle}>{currentChapter.title}</Title>
                    <Group justify="center" mb="lg" wrap="wrap" className={classes.chapterNav}>
                      {questionnaireData.map((_, index) => (
                        index <= highestChapterReached && (
                          <ActionIcon key={index} variant={currentChapterIndex === index ? 'filled' : 'outline'} onClick={() => changeChapter(index)} size="lg" radius="xl">{index + 1}</ActionIcon>
                        )
                      ))}
                    </Group>
                    {currentChapter.questions.map((question) => (
                      <div key={question.id} className={classes.questionBlock}>
                        <Text fw={700} size="1.5rem" mb="md">{question.text}</Text>
                        {renderQuestion(question)}
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
            </Transition>
            <Group mt="xl" justify="space-between">
              <Button size="lg" variant="default" onClick={handlePrevious} disabled={currentChapterIndex === 0 || !isChapterVisible}>Προηγούμενο</Button>
              <Button size="lg" onClick={handleNext} loading={isSubmitting} disabled={!isChapterVisible}>{isLastChapter ? 'Ολοκλήρωση & Ανάλυση' : 'Επόμενο Κεφάλαιο'}</Button>
            </Group>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}