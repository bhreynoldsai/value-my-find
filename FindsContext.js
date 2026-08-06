import React, { createContext, useContext, useState } from 'react';

const FindsContext = createContext(null);

export function FindsProvider({ children }) {
  const [saved, setSaved] = useState([
    { id: 1, name: 'Brass heron pair', rangeLow: 60, rangeHigh: 95, call: 'BUY' },
  ]);
  const saveFind = (find) => {
    setSaved((s) => (s.some((f) => f.id === find.id) ? s : [find, ...s]));
  };
  return (
    <FindsContext.Provider value={{ saved, saveFind }}>{children}</FindsContext.Provider>
  );
}

export function useFinds() {
  return useContext(FindsContext);
}
