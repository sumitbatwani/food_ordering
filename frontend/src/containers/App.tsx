import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const App = () => {
  return (
    <main className="mx-auto h-full relative">
      <Layout>
        <Outlet />
      </Layout>
    </main>
  );
};

export default App;
