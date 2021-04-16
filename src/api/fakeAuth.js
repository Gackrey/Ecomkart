let Users = [
    {
        email: "abc@mail.com",
        username: "admin",
        password: "admin"
    },
    {
        email:"def@gmail.com",
        username: "gaurav",
        password: "gkd123"
    },
];

const findUserByUserName = (username) => {
    return Users.find((user) => user.username === username);
};

export const fakeAuthApiLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = findUserByUserName(username);
            if (user.password === password) {
                resolve({ success: true, status: 200 });
            }
            reject({ success: false, status: 401 });
        }, 1000);
    });
};

export const fakeAuthApiSignUp = (username, email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user = {username, email, password}
            Users.push(user)
            resolve({ success: true, status: 200 });
        }, 1000);
    });
};
