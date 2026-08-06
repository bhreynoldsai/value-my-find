import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../theme';
import { scanItem } from '../api/mockApi';
import VerdictScreen from './VerdictScreen';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [phase, setPhase] = useState('camera'); // camera | scanning | verdict
  const [find, setFind] = useState(null);
  const camRef = useRef(null);

  const handleShutter = async () => {
    setPhase('scanning');
    let photoUri = null;
    try {
      const photo = await camRef.current?.takePictureAsync?.({ quality: 0.5 });
      photoUri = photo?.uri;
    } catch (e) { /* simulator / permission denied fallback */ }
    const result = await scanItem(photoUri);
    setFind(result);
    setPhase('verdict');
  };

  const scanAnother = () => { setFind(null); setPhase('camera'); };

  if (phase === 'verdict' && find) {
    return <VerdictScreen find={find} onScanAnother={scanAnother} />;
  }

  if (!permission) return <View style={styles.dark} />;
  if (!permission.granted) {
    return (
      <View style={[styles.dark, styles.center]}>
        <Text style={styles.helper}>Camera access is needed to appraise your finds.</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={{ color: colors.camDark, fontWeight: '600' }}>Grant access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.dark}>
      {phase === 'camera' && (
        <CameraView ref={camRef} style={StyleSheet.absoluteFill} facing="back" />
      )}
      <View style={styles.brandbar}><Text style={styles.wordmark}>VALUE MY FIND</Text></View>
      <View style={styles.viewfinder} pointerEvents="none">
        {['tl', 'tr', 'bl', 'br'].map((c) => <View key={c} style={[styles.corner, styles['corner_' + c]]} />)}
      </View>
      {phase === 'camera' && (
        <>
          <View style={styles.center}>
            <Text style={styles.helper}>Frame your find, then tap to appraise</Text>
          </View>
          <View style={styles.shutterWrap}>
            <TouchableOpacity style={styles.shutterOuter} onPress={handleShutter}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {phase === 'scanning' && (
        <View style={styles.center}>
          <Text style={styles.scanningTitle}>Appraising your find</Text>
          <Text style={styles.helper}>Matching against recent sales…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dark: { flex: 1, backgroundColor: colors.camDark },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  brandbar: { paddingTop: 60, alignItems: 'center' },
  wordmark: { color: 'rgba(255,255,255,0.92)', letterSpacing: 2, fontSize: 15 },
  helper: { color: 'rgba(250,203,141,0.7)', fontSize: 16, textAlign: 'center' },
  scanningTitle: { color: '#f3ecdf', fontSize: 20, marginBottom: 8 },
  shutterWrap: { alignItems: 'center', paddingBottom: 40 },
  shutterOuter: {
    width: 74, height: 74, borderRadius: 37, borderWidth: 2.5, borderColor: colors.accent400,
    alignItems: 'center', justifyContent: 'center',
  },
  shutterInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.accent400 },
  permBtn: { marginTop: 16, backgroundColor: colors.accent400, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  viewfinder: { position: 'absolute', top: 110, left: 20, right: 20, bottom: 140 },
  corner: { position: 'absolute', width: 26, height: 26, borderColor: colors.accent400 },
  corner_tl: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 },
  corner_tr: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 },
  corner_bl: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 },
  corner_br: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 },
});
