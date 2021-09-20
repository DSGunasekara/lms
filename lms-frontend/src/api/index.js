import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).payload.token
    }`;
  }
  return req;
});

//users auth urls
export const login = (credentials) =>
  axios.post("http://localhost:5000/api/login", credentials);

export const register = (user) =>
  axios.post("http://localhost:5000/api/user", user);

//LMS modules
export const fetchModules = () => API.get("/module");

export const fetchSingleModule = (id) => API.get(`/module/${id}`);

export const createModules = (module) => API.post("/module", module);

export const updateModules = (updateModule) =>
  API.patch(`/module/${updateModule.id}`, updateModule);

export const deleteModule = (id) => API.delete(`module/${id}`);

//LMS users
export const fetchUsers = () => API.get("/user");
export const fetchUser = (id) => API.get(`/user/${id}`);
export const deleteUser = (userID) => API.delete(`/user/${userID}`);
export const updateUser = (user) => API.patch(`/user/${user.id}`, user);
export const updatePassword = (user) => API.patch(`/user/resetPassword/${user.id}`, user);
export const updateProfile= (user) => API.patch(`/user/profile/${user.id}`, user);

//notices
export const fetchNotice = () => API.get("/notice");
export const fetchSingleNotice = (id) => API.get(`/notice/${id}`);
export const createNotice = (notice) => API.post("/notice", notice);
export const updateNotice = (updateNotice) =>
  API.patch(`/notice/${updateNotice.id}`, updateNotice);
export const deleteNotice = (id) => API.delete(`notice/${id}`);


// LMS Lectures
export const uploadLecture = (lecture) => API.post("/lecture", lecture);
export const fetchLectures = () => API.get("/lecture");
export const fetchLecture = (id) => API.get(`/lecture/${id}`);
export const deleteLecture = (id) => API.delete(`lecture/${id}`);
export const updateLecture = (lecture) =>
  API.patch(`/lecture/${lecture.id}`, lecture);

//events
export const fetchEvent = () => API.get("/event");
export const fetchSingleEvent = (id) => API.get(`/event/${id}`);
export const createEvent = (event) => API.post("/event", event);
export const updateEvent = (updateEvent) =>
  API.patch(`/event/${updateEvent.id}`, updateEvent);
export const deleteEvent = (id) => API.delete(`event/${id}`);

//results
export const fetchResults = () => API.get("/results");
export const fetchResult = (id) => API.get(`/results/${id}`);
export const createResult = (result) => API.post("/results", result);
export const updateResult = (result) =>
  API.patch(`/results/${result.id}`, result);
export const deleteResult = (id) => API.delete(`results/${id}`);

//todo
export const fetchTasks = () => API.get("/todo");
export const fetchTask = (id) => API.get(`/todo/${id}`);
export const createTask = (task) => API.post("/todo", task);
export const updateTask = (task) => API.patch(`/todo/${task.id}`, task);

//timetables
export const uploadTimetable = (timetable) => API.post("/timetable", timetable);
export const fetchTimetables = () => API.get("/timetable");
export const fetchTimetable = (id) => API.get(`/timetable/${id}`);
export const deleteTimetable = (id) => API.delete(`timetable/${id}`);
export const updateTimetable = (timetable) =>
  API.patch(`/timetable/${timetable.id}`, timetable);
