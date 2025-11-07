import { Routes, Route } from "react-router";
import Mainlayout from "@/pages/Mainlayout";
import Loginpage from "@/pages/Loginpage";
import Signuppage from "@/pages/Signuppage";
import Allposts from "@/pages/Allposts";
import Addposts from "@/pages/Addposts";
import Editpost from "@/pages/Editpost";
import Post from "@/pages/Post";
import RequireAuth from "@/pages/RequireAuth";


import Homepage from "@/pages/Homepage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Public */}
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="signup" element={<Signuppage />} />
          <Route path="all-posts" element={<Allposts />} />
          <Route path="post/:slug" element={<Post />} />

          {/* Protected */}
          <Route element={<RequireAuth/>}>
          <Route path="add-posts" element={<Addposts/>}/>
          <Route path="edit-post/:slug" element={<Editpost/>}/>
           
          </Route>


        </Route>

      </Routes>
    </>
  )
}

export default AppRoutes


