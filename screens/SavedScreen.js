import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { useFinds } from '../FindsContext';

export default function SavedScreen() {
  const { saved } = useFinds();

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.count}>{saved.length} FINDS</Text>
        <Text style={styles.title}>Your Collection</Text>
      </View>
      {saved.length === 0 ? (
        <Text style={styles.empty}>Nothing saved yet — scan your first find.</Text>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 20, gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.range}>${item.rangeLow}–${item.rangeHigh}</Text>
              </View>
              <View style={styles.tag}><Text style={styles.tagLabel}>{item.call}</Text></View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.bg },
  header: { paddingTop: 60, paddingHorizontal: 22 },
  count: { fontSize: 11, letterSpacing: 1, color: colors.accent700, marginBottom: 8 },
  title: { fontSize: 26, color: colors.text },
  empty: { textAlign: 'center', marginTop: 60, color: colors.neutral500, fontStyle: 'italic' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12,
    borderWidth: 1, borderColor: colors.neutral300, borderRadius: 4, backgroundColor: '#fff',
  },
  thumb: { width: 50, height: 50, borderRadius: 4, backgroundColor: colors.neutral200, borderWidth: 1, borderColor: colors.neutral300 },
  name: { fontSize: 16, color: colors.text, marginBottom: 2 },
  range: { fontSize: 12.5, color: colors.neutral500 },
  tag: { borderWidth: 1, borderColor: colors.accent, borderRadius: 99, paddingVertical: 4, paddingHorizontal: 10 },
  tagLabel: { color: colors.accent700, fontSize: 12, fontWeight: '600' },
});
