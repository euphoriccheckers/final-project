import { Routes, Route } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={ < HomePage /> }></Route>
      <Route path="/create" element={< CreatePage />}></Route>
      <Route path="/post/:id" element={< PostPage />}></Route>
    </Routes>
  )
}

export default App;