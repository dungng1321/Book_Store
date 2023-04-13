import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { Fragment, ReactElement } from "react";

function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Page = route.component;
        let Layout: React.ElementType = DefaultLayout;

        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
