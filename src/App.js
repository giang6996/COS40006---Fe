// App.js
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext'; // Import NotificationProvider
import NotificationsPage from './views/notification/NotificationPage';

import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const RegisterInfo = React.lazy(() => import('./views/pages/register/RegisterInfo'));
const RegisterMedia = React.lazy(() => import('./views/pages/register/RegisterMedia'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotificationProvider> {/* Wrap the app with NotificationProvider */}
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/registerInfo" element={<RegisterInfo />} />
            <Route path="/registerMedia" element={<RegisterMedia />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />

            {/* Protected Routes */}
            <Route
              path="*"
              element={
                <ProtectedRoute component={DefaultLayout} />
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;
