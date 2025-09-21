import { Routes ,Route} from "react-router";
import Mainlayout from "@/pages/Mainlayout";
import Loginpage from "@/pages/Loginpage";
import Signuppage from "@/pages/Signuppage";
import Allposts from "@/pages/Allposts";


import Homepage from "@/pages/Homepage";

function AppRoutes() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Mainlayout/>}>
           <Route index element={<Homepage/>}/>
           <Route path="login" element={<Loginpage/>}/>
           <Route path="signup" element={<Signuppage/>}/>
           <Route path="all-posts" element={<Allposts/>}/>


        </Route>
    </Routes>
    </>
  )
}

export default AppRoutes


