
import { Outlet } from "react-router-dom";
import Footer from './components/common/Footer';
import Header from './components/common/Header';


function App() {
  return (<>
    <div className="flex flex-col min-h-screen">

      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
      
    </div>
    </>
  );
}




export default App