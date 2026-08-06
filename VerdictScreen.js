import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useFinds } from '../FindsContext';

export default function VerdictScreen({ find, onScanAnother }) {
  const { saveFind } = useFinds();

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.photoWrap}>
        {find.photoUri ? (
          <Image source={{ uri: find.photoUri }} style={styles.photo} />
        ) : (
          <View style={[styles.photo, styles.photoPlaceholder]} />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.kicker}>{find.name.toUpperCase()}</Text>
          <View style={styles.confRow}>
            <Ionicons name="checkmark-circle" size={13} color={colors.accent700} />
            <Text style={styles.confText}>{find.confidence}</Text>
          </View>
        </View>
        <Text style={styles.price}>${find.rangeLow}–${find.rangeHigh}</Text>
        <View style={styles.buyPill}>
          <Ionicons name="checkmark-circle" size={15} color={colors.accent800} />
          <Text style={styles.buyLabel}>{find.call}</Text>
          <Text style={styles.buySub}> — pay up to ${find.maxPay}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statGrid}>
          <Stat label="BEST PLATFORM" value={find.platform} />
          <Stat label="TIME TO SELL" value={find.sellTime} />
          <Stat label="COMPS USED" value={`${find.comps.length} recent sales`} />
          <Stat label="MARGIN" value={find.margin} />
        </View>
        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>RECENT COMPARABLE SALES</Text>
        {find.comps.map((c, i) => (
          <View key={i} style={styles.compRow}>
            <View style={styles.compThumb} />
            <Text style={{ flex: 1 }}>Sold ${c.price} · {c.source}</Text>
            <Text style={styles.compWhen}>{c.when}</Text>
          </View>
        ))}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => { saveFind(find); onScanAnother(); }}>
            <Text style={styles.primaryLabel}>Save to collection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={onScanAnother}>
            <Text style={styles.secondaryLabel}>Scan another</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={{ width: '50%', marginBottom: 16 }}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: colors.bg },
  photoWrap: { marginTop: 56, marginHorizontal: 20, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: colors.neutral300 },
  photo: { width: '100%', aspectRatio: 4 / 3 },
  photoPlaceholder: { backgroundColor: colors.neutral200 },
  content: { padding: 22 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  kicker: { color: colors.accent700, fontSize: 11.5, letterSpacing: 1, flex: 1, marginRight: 8 },
  confRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  confText: { fontSize: 11, color: colors.neutral600 },
  price: { fontSize: 44, color: colors.text, marginBottom: 12 },
  buyPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: colors.accent400, borderRadius: 99, paddingVertical: 9, paddingHorizontal: 16,
  },
  buyLabel: { color: colors.accent800, fontWeight: '600' },
  buySub: { color: colors.accent800, opacity: 0.7 },
  divider: { height: 1, backgroundColor: colors.neutral300, marginVertical: 20 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  statLabel: { fontSize: 10.5, letterSpacing: 0.5, color: colors.neutral500, marginBottom: 3 },
  statValue: { fontSize: 13.5, color: '#2d2b2b' },
  sectionLabel: { fontSize: 11, letterSpacing: 1, color: colors.neutral500, marginBottom: 10 },
  compRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 11,
    borderWidth: 1, borderColor: colors.neutral300, borderRadius: 4, backgroundColor: '#fff', marginBottom: 8,
  },
  compThumb: { width: 34, height: 34, borderRadius: 4, backgroundColor: colors.neutral200 },
  compWhen: { color: colors.neutral500, fontSize: 12 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 22 },
  primaryBtn: { flex: 1, borderWidth: 1, borderColor: colors.accent, borderRadius: 6, paddingVertical: 13, alignItems: 'center' },
  primaryLabel: { color: colors.accent700, fontWeight: '600' },
  secondaryBtn: { flex: 1, borderWidth: 1, borderColor: colors.neutral300, borderRadius: 6, paddingVertical: 13, alignItems: 'center' },
  secondaryLabel: { color: colors.text },
});
