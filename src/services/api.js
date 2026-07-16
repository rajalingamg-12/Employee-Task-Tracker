import axios from "axios";

const API = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbz8J4vWy7sENeIerzoavtyH0GS3lOzgBBd-GnG8AFI5SjeNLINvQLEH5fRYuE0LVmbM/exec",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export default API;