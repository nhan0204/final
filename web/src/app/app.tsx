import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './app-routes';
import { ClusterProvider } from './cluster/cluster-data-access';
import { SolanaProvider } from './solana/solana-provider';
import { ColorModeContext, useMode } from './theme';
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";

const client = new QueryClient();

export function App() {
  const [theme, colorMode] = useMode();

  return (
    <QueryClientProvider client={client}>
      <ClusterProvider>
        <SolanaProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
              <Sidebar>
                <main className="content">
                {/* <Topbar />
                  <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/patient" element={<Patient />}></Route>
                    <Route path="/calendar" element={<Calendar />}></Route>
                    <Route path="/request" element={<Request />}></Route>
                    <Route path="/message" element={<Message />}></Route>
                  </Routes> */}
                </main>
              </Sidebar>
              </CssBaseline>
              {/* <AppRoutes /> */}
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SolanaProvider>
      </ClusterProvider>
    </QueryClientProvider>
  );
}
