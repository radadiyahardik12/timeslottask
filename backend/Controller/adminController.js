import Adminuser from '../Modal/adminuser.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createadmin = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const isadmin = await Adminuser.findOne({ email});

        if(isadmin) {
            return res.status(200).json({status : 0,  massage : "Admin already exists", data : []});
        }
        const passwordencode = await bcrypt.hash(password, 15)
        const admin = new Adminuser({name, email, password: passwordencode});
        await admin.save();
         
        res.status(200).json({massage : "admin is created successfully", status : 1, data : []})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const adminLogin = async(req, res) => {
    const {email, password } = req.body;
    try {
        const getadmin = await Adminuser.findOne({email});
        if(!getadmin) {
            return res.status(200).json({status : 0, data : [],massage : "No admin found"});
        }
        const isMatch = await bcrypt.compare(password, getadmin.password);
        if (!isMatch) {
            return res.status(200).json({status : 0, data : [],massage : "Password does not right"});
        }

        const token = jwt.sign({ id: getadmin._id }, process.env.SECRETE_KEY, { expiresIn: '1h' });

        res.status(200).json({status : 1, data : getadmin, token, massage : "data found", is_admin : true});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}