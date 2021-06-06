import './App.css';
import Routes from "./routes";

function App() {
    return (
        <div className="container flexbox-container">
            <div className="col-xl-7 col-11 d-flex justify-content-center">
                <div className="bg-authentication rounded-0 mb-0">
                    <Routes/>
                </div>
            </div>
        </div>
    );
}

export default App;
