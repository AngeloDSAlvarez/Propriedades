import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { AuthStack } from "./AuthStack";
import { AppTabs } from "./AppTabs";

export const AppNavigator = () => {
  const { usuario } = useAuth();

  return (
    <NavigationContainer>
      {usuario ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
