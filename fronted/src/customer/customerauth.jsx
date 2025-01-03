import React from 'react'
import axios from "axios";

export const Api = async(data, url='') => {
    try {

       const response = await axios({
            url: url,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json",
                "authorization" : "Bearer "+ localStorage.getItem("token")
            }
        })
        console.log("response", response);
        
        return response.data;
    } catch (error) {
        console.error('Error in Auth', error);
    }
}