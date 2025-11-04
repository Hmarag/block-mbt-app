import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// --- ΔΙΟΡΘΩΣΗ ΕΔΩ ---
import { useAuth } from '../../context/AuthContext'; 
// --- ΤΕΛΟΣ ΔΙΟΡΘΩΣΗΣ ---
import { Center, Loader, Text, Stack } from '@mantine/core';

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      console.error('Authentication failed:', error);
      navigate('/login?error=auth_failed');
      return;
    }

    if (token) {
      login(token);
      navigate('/dashboard');
    } else {
      console.error('No token found in callback URL');
      navigate('/login?error=no_token');
    }
  }, [searchParams, navigate, login]);

  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center">
        <Loader />
        <Text mt="md">Ολοκλήρωση σύνδεσης...</Text>
      </Stack>
    </Center>
  );
}