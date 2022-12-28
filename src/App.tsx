import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"


function App() {
  return(
  <>
    {/* need fragment to be able to render Navbar and container */}
    <Navbar />
    <Container className="mb-4">
      <Routes>
        {/* element corresponds to component render */}
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Container>
  </>
  )
}

export default App
