import { ThemeProvider } from 'styled-components';
import MainRoutes from '../../routes';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <MainRoutes />
    </ThemeProvider>
  );
}
