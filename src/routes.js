import { useContext } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import LayoutPublic from './pages/pagesPublic/LayoutPublic';
import Login from './pages/pagesPublic/Login';
import Home from './pages/pagesPublic/Home';

import LayoutPrivate from './pages/pagesPrivate/LayoutPrivate';
import Dashboard from './pages/pagesPrivate/Dashboard';
import Contributors from './pages/pagesPrivate/Contributors';
import NewContributors from './pages/pagesPrivate/NewContributors';
import EditContributors from './pages/pagesPrivate/EditContributors';
import Entities from './pages/pagesPrivate/Entities';
import NewEntities from './pages/pagesPrivate/NewEntities';
import EditEntities from './pages/pagesPrivate/EditEntities';
import Groups from './pages/pagesPrivate/Groups';
import NewGroups from './pages/pagesPrivate/NewGroups';
import EditGroups from './pages/pagesPrivate/EditGroups';
import Families from './pages/pagesPrivate/Families';
import NewFamilies from './pages/pagesPrivate/NewFamilies';
import EditFamilies from './pages/pagesPrivate/EditFamilies';
import NewDependent from './pages/pagesPrivate/NewDependent';
import EditDependent from './pages/pagesPrivate/EditDependent';
import FamilyRequests from './pages/pagesPrivate/FamilyRequests';
import NewFamilyRequest from './pages/pagesPrivate/NewFamilyRequest';
import EditFamilyRequest from './pages/pagesPrivate/EditFamilyRequest';
import Requests from './pages/pagesPublic/Resquests';

import { AuthProvider, AuthContext } from './context/auth';

function PrivateRoute({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

function MainRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayoutPublic />}>
            <Route index element={<Home />} />
            <Route path="/solicitacoes" element={<Requests />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="/adm" element={<PrivateRoute><LayoutPrivate /></PrivateRoute>}>
            <Route
              index
              element={(
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
                        )}
            />

            <Route
              path="colaboradores"
              element={(
                <PrivateRoute>
                  <Contributors />
                </PrivateRoute>
                        )}
            />

            <Route
              path="colaboradores/new"
              element={(
                <PrivateRoute>
                  <NewContributors />
                </PrivateRoute>
                        )}
            />
            <Route
              path="colaboradores/edit/:id"
              element={(
                <PrivateRoute>
                  <EditContributors />
                </PrivateRoute>
                        )}
            />

            <Route
              path="entidades"
              element={(
                <PrivateRoute>
                  <Entities />
                </PrivateRoute>
                        )}
            />

            <Route
              path="entidades/new"
              element={(
                <PrivateRoute>
                  <NewEntities />
                </PrivateRoute>
                        )}
            />
            <Route
              path="entidades/edit/:id"
              element={(
                <PrivateRoute>
                  <EditEntities />
                </PrivateRoute>
                        )}
            />

            <Route
              path="grupos"
              element={(
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>
                        )}
            />

            <Route
              path="grupos/new"
              element={(
                <PrivateRoute>
                  <NewGroups />
                </PrivateRoute>
                        )}
            />
            <Route
              path="grupos/edit/:id"
              element={(
                <PrivateRoute>
                  <EditGroups />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familias"
              element={(
                <PrivateRoute>
                  <Families />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familia/new"
              element={(
                <PrivateRoute>
                  <NewFamilies />
                </PrivateRoute>
                        )}
            />
            <Route
              path="familia/edit/:id"
              element={(
                <PrivateRoute>
                  <EditFamilies />
                </PrivateRoute>
                        )}
            />

            <Route
              path="dependentes/new"
              element={(
                <PrivateRoute>
                  <NewDependent />
                </PrivateRoute>
                        )}
            />

            <Route
              path="dependentes/edit/:id"
              element={(
                <PrivateRoute>
                  <EditDependent />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familias/solicitacoes"
              element={(
                <PrivateRoute>
                  <FamilyRequests />
                </PrivateRoute>
                        )}
            />

            <Route
              path="familias/solicitacoes/edit/:id"
              element={(
                <PrivateRoute>
                  <EditFamilyRequest />
                </PrivateRoute>
                        )}
            />
            <Route
              path="familias/solicitacoes/new"
              element={(
                <PrivateRoute>
                  <NewFamilyRequest />
                </PrivateRoute>
                        )}
            />

          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default MainRoutes;
