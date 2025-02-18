import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Container from "./containers/Container";
import "./index.css";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Container />
  </Provider>
);
