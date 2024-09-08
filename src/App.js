import './App.scss';
import Header from './components/Header/Header';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        <button>
          <Link to="/admins">Go to the admin page </Link>
        </button>
        <button>
          <Link to="/users">Go to the user page </Link>
        </button>
      </div>
    </div>
  );
}
export default App;
