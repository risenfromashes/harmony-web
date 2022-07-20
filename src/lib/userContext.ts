interface UserContext{
    user: String;
    password: String;
}

const key = "userContext";
const initialValue : UserContext = null;



export { key, initialValue };