import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { Home, NotFound, Dashboard, Create } from "pages";
import { ProtectedRoute } from "components";

interface Page {
  path: string;
  component: () => JSX.Element;
  isPublic?: boolean;
}

const routes: Page[] = [
  { path: "/", component: Home, isPublic: true },
  { path: "/dashboard", component: Dashboard },
  { path: "/new", component: Create },
  { path: "*", component: NotFound, isPublic: true },
];

const Routes = () => {
  return (
    <ReactRouterRoutes>
      {routes.map(({ path, component: Item, isPublic }) => {
        if (isPublic) {
          return (
            <Route element={<Item />} path={path} key={`router-link${path}`} />
          );
        }

        return (
          <Route
            element={
              <ProtectedRoute path={path}>
                <Item />
              </ProtectedRoute>
            }
            path={path}
            key={`router-link${path}`}
          />
        );
      })}
    </ReactRouterRoutes>
  );
};

export default Routes;
