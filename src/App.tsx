import React from 'react';

import { ThemeProvider } from '@mui/material';

import Tree from './components/Tree/Tree';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Tree />
    </ThemeProvider>
  );
}

export default App;
