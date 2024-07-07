import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClusterProvider } from './cluster/cluster-data-access';
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import { SolanaProvider } from './solana/solana-provider';
import { ColorModeContext, useMode } from './theme';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Calendar from "./scenes/calendar";
import Message from "./scenes/message";
import Patient from "./scenes/patient";
import Dashboard from './dashboard';
// export Dashboard from './Dashboard';


const client = new QueryClient();

export function App () {
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
                <Topbar />
                  <Routes>
                    {/* <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/calendar" element={<Calendar />}></Route>
                    <Route path="/request" element={<Request />}></Route>*/}
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/message" element={<Message />}></Route>
                    <Route path="/calendar" element={<Calendar />}></Route>
                    <Route path="/patient" element={<Patient />}></Route>
                  </Routes>
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
