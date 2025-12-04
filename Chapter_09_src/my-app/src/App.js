import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import UserForm from "./UserForm"; // <-- your add/edit page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />

        {/* ADD USER PAGE */}
        <Route path="/add-user" element={<UserForm />} />

        {/* EDIT USER PAGE */}
        <Route path="/edit-user/:id" element={<UserForm />} />

        {/* fallback */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
