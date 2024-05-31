import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'poppins-regular': require("../assets/fonts/Poppins-Regular.ttf"),
    'poppins-medium': require("../assets/fonts/Poppins-Medium.ttf"),
    'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
  })


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
