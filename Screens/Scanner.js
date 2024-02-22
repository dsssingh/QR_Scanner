import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScanHistoryContext from '../ScanHistoryContext';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const { addToScanHistory, scanHistory } = useContext(ScanHistoryContext);

  // Asking permission when loaded
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function call when barcode scans
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData({ type, data });
    addToScanHistory({ type, data });
  };

  const openLinkInBrowser = () => {
    if (barcodeData && barcodeData.data) {
      Linking.openURL(barcodeData.data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {scanned && (
        <View style={styles.scanResultContainer}>
          <Text style={styles.text}>Bar CODE with type {barcodeData.type}</Text>
          <Text style={styles.text}>and data {barcodeData.data}</Text>
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
          <Button title="Open Link in Chrome" onPress={openLinkInBrowser} />
        </View>
      )}

      <View style={styles.historyContainer}>
        <Text style={styles.historyHeader}>Scan History</Text>
        {scanHistory.map((scan, index) => (
          <View key={index} style={styles.scanItem}>
            <Text style={styles.scanType}>Type: {scan.type}</Text>
            <Text style={styles.scanData}>Data: {scan.data}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scanResultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  historyContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
  },
  historyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scanItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  scanType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanData: {
    fontSize: 14,
  },
});
