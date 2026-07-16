import API from "./api";

const postData = async (data) => {

    const params = new URLSearchParams();

    Object.keys(data).forEach(key => {
        params.append(key, data[key]);
    });

    const response = await API.post("", params);

    return response.data;
};

// Login
export const loginUser = async (email, password) => {

    return await postData({
        action: "login",
        email,
        password
    });

};

// Submit Task
export const submitTask = async (task) => {

    return await postData({
        action: "submitTask",
        ...task
    });

};

// Employee History
export const getMyTasks = async (email) => {

    return await postData({
        action: "getMyTasks",
        email
    });

};

// Dashboard
export const getDashboard = async () => {

    return await postData({
        action: "dashboard"
    });

};

// Admin Tasks
export const getAllTasks = async () => {

    return await postData({
        action: "getAllTasks"
    });

};

// Update Remarks
export const updateRemarks = async (row, remarks) => {

    return await postData({
        action: "updateRemarks",
        row,
        remarks
    });

};

export const getEmployees = async () => {

    return await postData({

        action: "getEmployees"

    });

};

export const getReports = async () => {

    return await postData({

        action: "getReports"

    });

};