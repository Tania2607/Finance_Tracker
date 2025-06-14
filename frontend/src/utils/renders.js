// import axios from "axios"
import { axiosClient } from "./axiosClient";
import {toast} from 'react-hot-toast'
// amount , category , date , usersid, type, title
export const getUserEntries = async (userId)=>{
    try {
        const response = await axiosClient.post('/expenses/allEntries',{
            userId
        });
        const exp = response.data.message.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        });
        return exp;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export const createEntry = async (entryInfo) => {
    try {
        const response = await axiosClient.post('/expenses/addEntry', entryInfo);
        // If backend returns error status
        if (response.data.status === 'error' || response.data.statusCode !== 200) {
            toast.error(response.data.message || 'Transaction Failed');
            return false;
        }
        toast.success('Transaction added!');
        // Optionally: window.location.reload();
        return true;
    } catch (e) {
        toast.error('Something went wrong.');
        console.log(e.message);
        return false;
    }
}

export const deleteEntry = async (data)=>{
    try {
        const {entryId,userId} = data ;
        const response = await axiosClient.post('/expenses/deleteEntry',{
            entryId ,
            userId 
        });
        if(response.data.statusCode !== 201)
        {
            toast.error(`${response.data.message}`);
            return;
        }
        window.location.reload();
        return;
    } catch (error) {
        console.log(error.message)   
    }
}

export const getSummary = async (userId) => {
    try {
        const response = await axiosClient.post('/expenses/summary', { userId });
        return response.data.message;
    } catch (error) {
        console.log(error.message);
        return { totalIncome: 0, totalExpense: 0, balance: 0 };
    }
}

export const sendEmail = async (sender , data)=>{
        try {
            const response = await axiosClient.post('/expenses/sendEmail',{
                recipient : sender , 
                body : data
            })
            toast.success("Email Sent");
            return response;
        } catch (e) {
            console.log(e.message)
            return e.message ;
        }
}