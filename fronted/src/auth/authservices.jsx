import { Auth } from "./Auth"
const WEB_API = "http://localhost:3000/api/";

const SignUpUser = (userItems) => {
    const form = new FormData();
    const endpoint = WEB_API + (userItems.isAdmin ? 'admin/createadmins' : 'customer/createclient');
    console.log("endpoint", endpoint)
    form.append('name', userItems.name);
    form.append('email', userItems.email);
    form.append('password', userItems.password);
    if (!userItems.isAdmin) {
        form.append('contact_number', userItems.contact);
    }
   return Auth(form, endpoint);
}

const userLogin = (userItems) => {
    const form = new FormData();
    const endpoint = WEB_API + (userItems.isAdmin ? 'admin/adminlogin' : 'customer/clientlogin');
    console.log("endpoint", endpoint)
    form.append('email', userItems.email);
    form.append('password', userItems.password);
   return Auth(form, endpoint);
}

export default {
    SignUpUser,
    userLogin
}