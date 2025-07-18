import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import Modal from "../../components/Modal.jsx";
import AddIncomeForm from "../../components/Income/AddIncomeForm.jsx";
import toast from "react-hot-toast";

const Income = () => {
    const [incomeData,setIncomeData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null,
    });

    const [OpenAddIncomeModal,setOpenAddIncomeModal]=useState(false);

    const fetchIncomeDetails = async () => {
        if(loading) return;
        setLoading(true);
        try{
            const response=await axiosInstance.get(
                `${API_PATHS.INCOME.GET_ALL_INCOME}`
            );
            if(response.data){
                setIncomeData(response.data);
            }
        }
        catch(error){
            console.log("Something went wrong.Please try again.",error);
        }finally{
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        const {source,amount,date,icon}=income;

        if(!source.trim()){
            toast.error("Source is required");
            return;
        }
        if(!amount || isNaN(amount) || Number(amount)<=0){
            toast.error("Amount should be a valid number grater than 0.");
            return;
        }
        if(!date){
            toast.error("Date is required");
            return;
        }
        try{
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
                source,
                amount,
                date,
                icon
            });
            setOpenAddIncomeModal(false);
            toast.success("Income added successfully");
            fetchIncomeDetails();
        }catch(error){
            console.error(
                "error adding income:",
                error.response?.data?.message || error.message
            );
        }
        // if(!icon){
        //     toast.error("Icon is required");
        // }
    };

    const deleteIncome = async (id) => {};

    const handleDownloadIncomeDetails = async () => {};

    useEffect(() => {
        fetchIncomeDetails();
        return ()=>{};
    },[])

    return(
        <DashboardLayout activeMenu="Dashoard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={()=>setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>

                <Modal
                    isOpen={OpenAddIncomeModal}
                    onClose={()=>setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>
            </div>
        </DashboardLayout>
    )
}
export default Income;