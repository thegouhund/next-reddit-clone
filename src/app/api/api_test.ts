import axios from "axios"
import { PostModel, SubbeditModel, UserModel } from "../types/model";

// axios.get("http://localhost:3000/api/user/2").then((res) => {
//     console.log(res.data);
// })

// post with body
// axios.post("http://localhost:3000/api/user", {
//     username: "John Doe2",
//     email: "johndoe2@example.com",
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err.response.data)
// })

// let user: UserModel = {
//     username: "gouhun1dasss1stsesssssts2",
//     email: "gouhund@ex1saaas1mpssslses.2coms",
// }

// axios.post("http://localhost:3000/api/user", user).then((res) => {
//     user = res.data.data;
//     console.log("User Id: " + user.id);
// }).catch((err) => {
//     console.log(err.response.data)
// })

let subbedit: SubbeditModel = {
    name: "diary",
}

axios.post("http://localhost:3000/api/subbedit", subbedit).then((res) => {
    subbedit = res.data.data
    console.log(subbedit);
}).catch((err) => {
    console.log(err.response.data)
})

let post: PostModel = {
    body: "Hello, this is my second post in Borderlands2!",
    userId: 1,
}

axios.post("http://localhost:3000/api/subbedit/1/post", post).then((res) => {
    post = res.data.data;
    console.log(post)
}).catch((err) => {
    console.log(err.response.data)
})
