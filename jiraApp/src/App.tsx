import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Project from "./component/project/detailProject";
import DetailIssue from "./component/issue/createIssue";
import Projects from "./component/project/projects";
import Layout from "./layouts/Layout";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import UpdateProject from "./component/project/updateProject";
import NotFound from "./pages/notFound";
import EditIssue from "./component/issue/detailIssue";
import PrivateLayout from "./layouts/privateLayout";
import VerifyOtp from "./component/verifyOtp";
import ProductPage from "./pages/productPage";
import OutletDynamic from "./pages/outLetDynamic";
import ListPage from "./component/listPage";
import CreatePage from "./pages/createPage";

function App() {
    return <div className="App">
        <Routes>
            <Route path="/" 
            element={
                <PrivateLayout>
                    <Layout/>
                </PrivateLayout>
            }>
                <Route index element={<Navigate to ="projects-management"/>} />
                <Route path="page-viewer" element={  <OutletDynamic />}/>
                <Route path="list-page" element={  <ListPage />}/>
                <Route path="create-page" element={  <CreatePage />}/>
                {/*  */}
                <Route path="projects-management" element={ <Projects /> }/>
                <Route path="projects-management/:id/update" element={ <UpdateProject/>}/>
                <Route path="projects-management/:id" element={ <Project /> }/>
                <Route path="projects-management/:id/issue/:idissue/detail" element={ <EditIssue/> }/>
            </Route>
            <Route path="verify-otp" element={ <VerifyOtp /> }/>
            <Route path="signin" element={ <SignIn/> }/>
            <Route path="signup" element={ <SignUp/> }/>
            <Route path="*" element={ <NotFound/> }/>

        </Routes>

    </div>;
}

export default App;
