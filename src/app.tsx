import { Home } from "./views/home";
import { Providers } from "./providers";
import Logo from "./components/logo";
import "./app.css";

const App = () => (
  <Providers>
    <div className="app">
      <header className="app__header">
        <nav className="app__nav">
          <Logo />
        </nav>
      </header>
      <Home />
    </div>
  </Providers>
);

export default App;
