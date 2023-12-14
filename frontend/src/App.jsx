import React from 'react';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <PageLayout />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
}
