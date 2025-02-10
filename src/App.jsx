import "./App.css";
import MainApp from "./Layout/MainApp";
import { ProviderContext } from "./context/context";

function App() {
  return (
    <ProviderContext>

      <MainApp />
    </ProviderContext>
  );
}

export default App;
