import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "./navigation/RootNavigator";
import { QueryProvider } from "./providers/QueryProvider";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <RootNavigator />
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
