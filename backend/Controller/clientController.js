import Clientuser from '../Modal/clientuser.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createClient = async(req, res) => {
    try {
        const { name, email, password, contact_number} = req.body;
        const isclient = await Clientuser.findOne({ email});

        if(isclient) {
            return res.status(200).json({massage : "client already exists", status : 0, data : []});
        }
        const passwordencode = await bcrypt.hash(password, 15)
        const admin = new Clientuser({name, email, contact_number, password: passwordencode});
        await admin.save();
         
        res.status(200).json({massage : "client is created successfully", status : 1, data : []})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const clientLogin = async(req, res) => {
    const {email, password } = req.body;
    try {
        const getclient = await Clientuser.findOne({email});
        if(!getclient) {
            return res.status(200).json({status : 0, data : [],massage : "No client found"});
        }
        const isMatch = await bcrypt.compare(password, getclient.password);
        if (!isMatch) {
            return res.status(404).json({status : 0, data : [], massage : "Password does not right"});
        }

        const token = jwt.sign({ id: getclient._id }, process.env.SECRETE_KEY, { expiresIn: '1h' });

        res.status(200).json({status : 1,token, data: getclient, massage : 'data found', is_admin : false});
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}