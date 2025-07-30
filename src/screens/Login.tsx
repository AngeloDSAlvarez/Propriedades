import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Simula um token de login
    login('Angelo', "Ang22");
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};
