import React, {useEffect, useState} from 'react';
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview.jsx";
import Modal from "../../components/Modal.jsx";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
import ExpenseList from "../../components/Expense/ExpenseList.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";


const Expense = () => {
    useUserAuth()
    const [expenseData,setExpenseData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null,
    });

    const [OpenAddExpenseModal,setOpenAddExpenseModal]=useState(false);

    const fetchExpenseDetails = async () => {
        if(loading) return;
        setLoading(true);
        try{
            const response=await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );
            if(response.data){
                setExpenseData(response.data);
            }
        }
        catch(error){
            console.log("Something went wrong.Please try again.",error);
        }finally{
            setLoading(false);
        }
    };

    const handleAddExpense = async (expense) => {
        const {category, amount, date, icon} = expense;

        if (!category.trim()) {
            toast.error("Category is required");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number grater than 0.");
            return;
        }
        if (!date) {
            toast.error("Date is required");
            return;
        }
        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon
            });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "error adding expense",
                error.response?.data?.message || error.message
            );
        }
    };
    const deleteExpense = async (id) => {
        try{
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            setOpenDeleteAlert({show:false,data:null});
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        }catch(error){
            console.error(
                "error deleting Expense:",
                error.response?.data?.message || error.message
            );
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try{
            const response=await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                {
                    responseType:"blob",
                }
            );
            const url=window.URL.createObjectURL(new Blob([response.data]));
            const link=document.createElement("a");
            link.href=url;
            link.setAttribute("download","expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
        catch(error){
            console.error(
                "error downloading expense details:",
                error.response?.data?.message || error.message
            );
            toast.error("Something went wrong.Please try again.");
        }
    };

    useEffect(() => {
        fetchExpenseDetails()
    }, []);

    return(
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={()=>setOpenAddExpenseModal(true)}
                        />
                    </div>
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={({id})=>{
                            setOpenDeleteAlert({show:true,data:id});
                        }}
                        onDownload={handleDownloadExpenseDetails}
                    />
                </div>

                <Modal
                    isOpen={OpenAddExpenseModal}
                    onClose={()=>setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense details?"
                        onDelete={()=>deleteExpense(openDeleteAlert.data)}
                    />

                </Modal>


            </div>
        </DashboardLayout>
    );
};
export default Expense;