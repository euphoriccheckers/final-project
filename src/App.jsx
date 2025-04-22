import { Routes, Route } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import EditPage from "./pages/EditPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={ < HomePage /> }></Route>
      <Route path="/create" element={< CreatePage />}></Route>
      <Route path="/post/:id" element={< PostPage />}></Route>
      <Route path="/edit/:id" element={<EditPage />}></Route>
    </Routes>
  )
}

export default App;