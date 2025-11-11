import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Container, Title, Text, Stack, Button, SimpleGrid, Card, List, ThemeIcon, Group, Divider, Transition, useMantineColorScheme } from '@mantine/core';
import { IconCircleCheck, IconTool } from '@tabler/icons-react';
import { useIntersection } from '@mantine/hooks';
import classes from './Hero.module.css';
import logoDark from '../assets/logo_2.svg';
import logoLight from '../assets/logo_3.svg';

interface ListBlock {
  title: string;
  subtitle: string;
  type: 'list';
  items: string[];
  price: string;
  buttonText: string;
}

const blockContent: {
  idea: ListBlock;
  strategy: ListBlock;
  partner: ListBlock;
} = {
  idea: {
    title: 'IDEA BLOCK',
    subtitle: 'Διαμορφώστε την ιδέα σας σε ένα βασικό πλάνο',
    type: 'list',
    items: [
      'Δημιουργία βασικού business plan σε λίγα λεπτά',
      'Ερωτήσεις πολλαπλής επιλογής',
      'Αυτόματο executive summary',
      'Δωρεάν, χωρίς δέσμευση',
    ],
    price: '$  Free',
    buttonText: 'Start Free',
  },
  strategy: {
    title: 'Strategy Block',
    subtitle: 'Δημιουργήστε ένα λεπτομερές οικονομικό και λειτουργικό πλάνο',
    type: 'list',
    items: [
      'Όλα τα features του Free Plan',
      'Αναλυτικά οικονομικά στοιχεία & προβλέψεις (12 - 36 μήνες)',
      'Εξαγωγή σε PDF, Word & Excel',
      'Αποθήκευση & επεξεργασία πολλαπλών σχεδίων',
    ],
    price: '$  29',
    buttonText: 'Get Started',
  },
  partner: {
    title: 'Partner Block',
    subtitle: 'Προσωπική καθοδήγηση από εξειδικευμένο σύμβουλο',
    type: 'list',
    items: [
      'Όλα τα features του Pro Plan',
      '1:1 συνεδρίες με εξειδικευμένο σύμβουλο',
      'Προσαρμοσμένο business plan στη δική σας αγορά',
      'Στρατηγικές συστάσεις & προσωπική υποστήριξη',
    ],
    price: '  Custome',
    buttonText: 'Contact Us',
  },
};

type BlockType = 'idea' | 'strategy' | 'partner';


export function Hero() {
  const [activeBlock, setActiveBlock] = useState<BlockType | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const blocksGridRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  const logoSrc = colorScheme === 'dark' ? logoLight : logoDark;

  const { ref: intersectionRef, entry } = useIntersection({
    root: null,
    threshold: 0.15,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [entry?.isIntersecting, hasAnimated]);

  useEffect(() => {
    if (activeBlock && blocksGridRef.current) {
      const timer = setTimeout(() => {
        if (blocksGridRef.current) {
          const elementPosition = blocksGridRef.current.getBoundingClientRect().top + window.scrollY;
          
          // *** Η ΜΟΝΗ ΑΛΛΑΓΗ ΕΙΝΑΙ ΕΔΩ ***
          // Αυξάνουμε το offset για να σταματήσει το scroll πιο ψηλά.
          // Μπορείς να παίξεις με αυτόν τον αριθμό (π.χ., 120, 150).
          const offset = 200; 

          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [activeBlock]);

  const handleBlockClick = (blockType: BlockType) => {
    setActiveBlock(prev => (prev === blockType ? null : blockType));
  };

  const containerPaddingBottom = activeBlock ? '0px' : '100px';

  return (
    <Container size="lg" style={{ paddingTop: '150px', paddingBottom: containerPaddingBottom }}>
      
      <Stack align="center" gap="lg">

        <Title order={1} ta="center" className={classes.titleContainer}>
          <span className={classes.titleBlock}>BLOCK</span>
          <span className={classes.titleSubtitle}>Το βασικό εργαλείο για την επιχείρηση</span>
        </Title>

        <Text size="xl" c="dimmed" ta="center">Ο ψηφιακός σύμβουλος που χρειάζεσαι.<br />Για να χτίσεις, να οργανώσεις και να αναπτυχθείς.</Text>
        <Button size="lg" mt="lg" className={classes.ctaButton} onClick={() => handleBlockClick('idea')}>Ξεκινήστε</Button>
        
        <img src={logoSrc} alt="Company Logo" className={classes.companyLogo} />

        <div ref={intersectionRef} style={{ height: '1px', width: '100%' }} />

        <Transition mounted={hasAnimated} transition="slide-up" duration={800} timingFunction="ease">
          {(styles) => (
            <SimpleGrid 
              ref={blocksGridRef}
              cols={{ base: 1, sm: 3 }} 
              spacing="xl" 
              mt={0} 
              w="100%" 
              className={classes.blocksGrid}
              style={styles}
            >
              <Card shadow="sm" padding="lg" radius="md" className={classes.blockCard}>
                <Stack align="center" justify="space-between" h="100%">
                  <Title order={3} ta="center" className={classes.blockTitle}>Free Plan</Title>
                  <Button size="lg" mt="lg" className={classes.ctaButton} onClick={() => handleBlockClick('idea')}>Ξεκινήστε</Button>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className={classes.blockCard}>
                <Stack align="center" justify="space-between" h="100%">
                  <Title order={3} ta="center" className={classes.blockTitle}>Pro Plan</Title>
                  <Button size="lg" mt="lg" className={classes.ctaButton} onClick={() => handleBlockClick('strategy')}>Ξεκινήστε</Button>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className={classes.blockCard}>
                <Stack align="center" justify="space-between" h="100%">
                  <Title order={3} ta="center" className={classes.blockTitle}>Consulting Plan</Title>
                  <Button size="lg" mt="lg" className={classes.ctaButton} onClick={() => handleBlockClick('partner')}>Ξεκινήστε</Button>
                </Stack>
              </Card>
            </SimpleGrid>
          )}
        </Transition>

        {activeBlock && (
          <Card ref={panelRef} key={activeBlock} shadow="sm" padding="xl" radius="md" mt="xl" w="100%" className={`${classes.blockCard} ${classes.expandedPanel}`}>
            <Stack justify="space-between" h="100%">
              <div>
                <Title order={2}>{blockContent[activeBlock].title}</Title>
                
                {(() => {
                  if (activeBlock === 'strategy' || activeBlock === 'partner') {
                    return (
                      <Stack align="center" justify="center" gap="md" style={{ padding: '40px 20px' }}>
                        <ThemeIcon variant="light" color="dark" size={80} radius={80}>
                          <IconTool style={{ width: '50%', height: '50%' }} />
                        </ThemeIcon>
                        <Title order={3} ta="center">Coming Soon!</Title>
                        <Text c="dimmed" ta="center" size="lg">
                          Δουλεύουμε εντατικά για να σας προσφέρουμε σύντομα αυτό το πακέτο.
                          <br />
                          Μείνετε συντονισμένοι!
                        </Text>
                      </Stack>
                    );
                  }

                  const currentBlock = blockContent[activeBlock];

                  if (currentBlock.type === 'list') {
                    return (
                      <>
                        <Group justify="space-between" align="center" mt="xs" style={{ paddingRight: '20px' }}>
                          <Text c="dimmed" size="lg">{currentBlock.subtitle}</Text>
                          <Text fz={32} fw={700} style={{ borderBottom: '3px solid var(--mantine-color-text)', paddingBottom: '2px', lineHeight: '1', paddingRight: '50px' }}>{currentBlock.price}</Text>
                        </Group>
                        <Divider my="md" />
                        <List
                          spacing="sm"
                          size="lg"
                          icon={
                            <ThemeIcon color="dark" size={20} radius="xl">
                              <IconCircleCheck style={{ width: 14, height: 14 }} />
                            </ThemeIcon>
                          }
                        >
                          {currentBlock.items.map((item, index) => (
                            <List.Item key={index}>{item}</List.Item>
                          ))}
                        </List>
                      </>
                    );
                  }

                  return null;
                })()}
              </div>

              {activeBlock === 'idea' && blockContent[activeBlock].type === 'list' && (
                <Group justify="flex-end" mt="xl">
                  <Button component={Link} to="/register" size="lg" className={classes.ctaButton}>
                    {(blockContent[activeBlock] as ListBlock).buttonText}
                  </Button>
                </Group>
              )}
            </Stack>
          </Card>
        )}

      </Stack>
    </Container>
  );
}