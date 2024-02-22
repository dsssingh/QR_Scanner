import React, { createContext, useState } from 'react';

const ScanHistoryContext = createContext();

export const ScanHistoryProvider = ({ children }) => {
  const [scanHistory, setScanHistory] = useState([]);

  const addToScanHistory = (scanData) => {
    setScanHistory([...scanHistory, scanData]);
  };

  return (
    <ScanHistoryContext.Provider value={{ scanHistory, addToScanHistory }}>
      {children}
    </ScanHistoryContext.Provider>
  );
};

export default ScanHistoryContext;
