import { SafeAreaView, StyleSheet, StatusBar, Platform, View } from 'react-native';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#18181b" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});