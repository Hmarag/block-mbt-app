import { Link, useNavigate } from 'react-router-dom';
import { Group, Button, Box, Burger, Drawer, Stack, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import classes from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';
import logoSrc from '../assets/logo.svg'; 
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (opened) toggle();

    notifications.show({
      title: 'Αποσύνδεση Επιτυχής',
      message: 'Έχετε αποσυνδεθεί από τον λογαριασμό σας.',
      icon: <IconCheck size={24} />,
      autoClose: 4000,
      // --- Η ΔΙΟΡΘΩΣΗ ΕΙΝΑΙ ΕΔΩ ---
      // Χρησιμοποιούμε CSS variables της Mantine αντί για theme.colorScheme
      styles: (theme) => ({
        root: {
          backgroundColor: 'var(--mantine-color-body)', // Αυτόματα το σωστό χρώμα φόντου
          borderColor: 'var(--mantine-color-text)', // Αυτόματα το σωστό χρώμα κειμένου (μαύρο/άσπρο)
          borderWidth: '3px',
          borderStyle: 'solid',
          padding: theme.spacing.lg,
          minWidth: 400,
          boxShadow: theme.shadows.xl,
        },
        title: {
          fontSize: theme.fontSizes.lg,
          fontWeight: 700,
          color: 'var(--mantine-color-text)', // Αυτόματα το σωστό χρώμα κειμένου
        },
        description: {
          fontSize: theme.fontSizes.md,
          color: 'var(--mantine-color-dimmed)', // Αυτόματα το σωστό "ξεθωριασμένο" χρώμα
        },
        icon: {
          backgroundColor: 'transparent',
          color: theme.colors.teal[6],
          width: 32,
          height: 32,
        },
        closeButton: {
          color: 'var(--mantine-color-text)',
          '&:hover': {
            backgroundColor: 'var(--mantine-color-gray-1)',
          },
        },
      }),
    });

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const navLinks = (
    <>
      <Link 
        to="/" 
        className={classes.link}
        onClick={() => {
          if (window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          if(opened) toggle();
        }}
      >
        Αρχική
      </Link>
      <a href="/#news" className={classes.link} onClick={() => {if(opened) toggle()}}>Νέα</a>
      <Link to="/about" className={classes.link} onClick={() => {if(opened) toggle()}}>Η Εταιρία</Link>
      <Link to="/contact" className={classes.link} onClick={() => {if(opened) toggle()}}>Επικοινωνία</Link>
    </>
  );

  return (
    <header className={classes.header}>
      <Box 
        className={classes.panel} 
        w="95%"
        maw={1200}
      >
        <Group justify="space-between" style={{ width: '100%' }}>
          
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="var(--mantine-color-black)" />
            <img src={logoSrc} className={classes.logo} alt="Company Logo" />
          </Group>

          <Group gap="sm" visibleFrom="md">
            {navLinks}
          </Group>

          <Group gap="sm" visibleFrom="md">
            <ThemeToggle />
            {token ? (
              <>
                <Button component={Link} to="/dashboard" variant="default" className={`${classes.button} ${classes.headerButton}`}>Dashboard</Button>
                <Button onClick={handleLogout} className={classes.headerButton}>Αποσύνδεση</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="default" className={`${classes.button} ${classes.headerButton}`}>Είσοδος</Button>
                <Button component={Link} to="/register" className={classes.headerButton}>Εγγραφή</Button>
              </>
            )}
          </Group>

        </Group>
      </Box>

      <Drawer 
        opened={opened} 
        onClose={toggle} 
        title={<img src={logoSrc} className={classes.logo} alt="Company Logo" />} 
        hiddenFrom="md" 
        size="md"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        classNames={{ 
          body: classes.drawerBody,
          header: classes.drawerHeader
        }}
      >
        <Stack>
          {navLinks}
          {token ? (
            <>
              <Button component={Link} to="/dashboard" variant="default" className={classes.button} fullWidth onClick={toggle}>Dashboard</Button>
              <Button onClick={handleLogout} fullWidth>Αποσύνδεση</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" variant="default" className={classes.button} fullWidth onClick={toggle}>Είσοδος</Button>
              <Button component={Link} to="/register" fullWidth onClick={toggle}>Εγγραφή</Button>
            </>
          )}
        </Stack>

        <Center mt="xl">
          <ThemeToggle />
        </Center>
      </Drawer>
    </header>
  );
}