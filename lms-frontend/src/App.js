import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import { ROLES } from "./constants/constant";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import Login from "./Components/Auth/Login";
import NotFound from "./Components/Common/NotFound";
import modulePage from "./Pages/modulePage";
import Register from "./Components/Auth/Register";
import CreateModuleForm from "./Components/module/CreateModuleForm";
import Users from "./Components/Users/Users";
import UserProfile from "./Components/Users/UserProfile";
import EditUser from "./Components/Users/EditUser";
import SingleModule from "./Components/module/SingleModule";
import AddNotice from "./Components/Notices/AddNotice";
import NoticeAdmin from "./Components/Notices/NoticeAdmin";
import EditNotice from "./Components/Notices/EditNotice";
import EditSingleModule from "./Components/module/EditModule";
import AddEditLecture from "./Components/Lectures/AddEditLectures";
import Lectures from "./Components/Lectures/Lectures";
import AddEvent from "./Components/Events/AddEvent";
import EventAdmin from "./Components/Events/EventAdmin";
import EditEvent from "./Components/Events/EditEvent";
import AddEditResult from "./Components/Results/AddEditResult";

import { Show_all_users } from "./Components/students_display_users/Show_all_users";
import AcademicSingleUser from "./Components/students_display_users/AcademicSingleUser";

import TodoList from "./Components/todoList/TodoList";
import AddEditTimetable from "./Components/Timetables/AddEditTimetables";
import Timetables from "./Components/Timetables/Timetables";

import "antd/dist/antd.css";
import "./index.css";
import { Layout } from "antd";
import Results from "./Components/Results/Results";
import ViewResult from "./Components/Results/ViewResult";
import NavBar from "./Components/Layout/navBar/NavBar";
import Dashboard from "./Components/Dashboard/Dashboard";

const { Header, Content } = Layout;

function App() {
  const headerBar = {
    backgroundColor: "#278ea5",
    display: "flex",
    marginLeft: "10px",
  };

  const headerText = {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Besley",
    padding: 0,
    margin: 0,
  };

  return (
    <div>
      <BrowserRouter>
        <ToastProvider>
          <Layout>
            <NavBar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <div className="row">
                  <div className="col" style={headerBar}>
                    <p style={headerText}>
                      Institute of Science and Technology
                    </p>
                  </div>
                </div>
              </Header>
              <Content
                className="site-layout-background"
                style={{ margin: "24px 16px 0", overflow: "initial" }}
              >
                <Switch>
                  <Route path={"/"} exact component={Login}></Route>
                  <ProtectedRoute
                    path={"/users"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={Users}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/dashboard"}
                    exact
                    roles={[ROLES.STUDENT]}
                    component={Dashboard}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/register"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={Register}
                  />
                  <ProtectedRoute
                    path={"/updateUser/:id"}
                    roles={[ROLES.ADMIN]}
                    component={EditUser}
                  />
                  <ProtectedRoute
                    path={"/profile/:id"}
                    roles={[ROLES.ADMIN, ROLES.LAB_INSTRUCTOR, ROLES.LECTURER, ROLES.STUDENT]}
                    component={UserProfile}
                  />
                  {/* <ProtectedRoute path={'/login'} roles={[ROLES.ADMIN]} exact component={Login} /> */}
                  <ProtectedRoute
                    path={"/modulePage"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={modulePage}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/createModule"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={CreateModuleForm}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/singleModulePage"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={SingleModule}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/addNoticeForm"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={AddNotice}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/noticeAdmin"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={NoticeAdmin}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/editNotice/:id"}
                    roles={[ROLES.ADMIN]}
                    component={EditNotice}
                  ></ProtectedRoute>

                  <ProtectedRoute
                    path={"/lecture/add"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={AddEditLecture}
                  />
                  <ProtectedRoute
                    path={"/lecture/edit/:id"}
                    roles={[ROLES.ADMIN]}
                    component={AddEditLecture}
                  />
                  <ProtectedRoute
                    path={"/lectures"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={Lectures}
                  />

                  <ProtectedRoute
                    path={"/modulePage"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={modulePage}
                  />
                  <ProtectedRoute
                    path={"/createModule"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={CreateModuleForm}
                  />
                  <ProtectedRoute
                    path={"/viewModule/:id"}
                    roles={[ROLES.ADMIN, ROLES.STUDENT]}
                    component={SingleModule}
                  />
                  <ProtectedRoute
                    path={"/editModule/:id"}
                    roles={[ROLES.ADMIN]}
                    component={EditSingleModule}
                  />

                  <ProtectedRoute
                    path={"/addEvent"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={AddEvent}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/eventAdmin"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={EventAdmin}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/editEvent/:id"}
                    roles={[ROLES.ADMIN]}
                    component={EditEvent}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/results"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={Results}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/results/add"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={AddEditResult}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/results/view/:id"}
                    roles={[ROLES.ADMIN]}
                    component={ViewResult}
                  ></ProtectedRoute>
                  <ProtectedRoute
                    path={"/results/edit/:id"}
                    roles={[ROLES.ADMIN]}
                    component={AddEditResult}
                  ></ProtectedRoute>

                  <ProtectedRoute
                    path={"/timetable/add"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={AddEditTimetable}
                  />
                  <ProtectedRoute
                    path={"/timetable/edit/:id"}
                    roles={[ROLES.ADMIN]}
                    component={AddEditTimetable}
                  />
                  <ProtectedRoute
                    path={"/timetables"}
                    exact
                    roles={[ROLES.ADMIN]}
                    component={Timetables}
                  />

                  <Route
                    path={"/student/academicStaff"}
                    exact
                    component={Show_all_users}
                  ></Route>
                  <Route
                    path={"/student/academicStaff/:id"}
                    component={AcademicSingleUser}
                  ></Route>

                  <Route path={"/todoList"} exact component={TodoList}></Route>

                  <Route path="" component={NotFound} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
          {/* <Footer/> */}
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
