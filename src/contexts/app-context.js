
import React from 'react';

export const AppContext = React.createContext(undefined);

export function useAppContext() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error('useAppContext는 <AppContext.Provider> 내부에서만 사용해야 합니다.');
  return ctx;
}
