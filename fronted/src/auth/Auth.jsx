import React from 'react'
import axios from "axios";

export const Auth = async(data, url='') => {
    try {

       const response = await axios({
            url: url,
            method: "POST",
            data: data,
        })
        console.log("response", response);
        
        return response.data;
    } catch (error) {
        console.error('Error in Auth', error);
    }
}