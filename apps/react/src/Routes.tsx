import { Routes as ReactRouter, Route } from "react-router-dom";
import { Home, NotFound } from "pages";

const routes = [
  { path: "/", el: Home },
  { path: "*", el: NotFound },
];

const Routes = () => {
  return (
    <ReactRouter>
      {routes.map(({ path, el: Item }) => {
        return (
          <Route element={<Item />} path={path} key={`router-link${path}`} />
        );
      })}
    </ReactRouter>
  );
};

export default Routes;
