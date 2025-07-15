const path = require("path");
const xlsx = require("xlsx");
const Expense = require("../models/Expense");


//Add expense Source
exports.addExpense =async (req, res) => {
    const userId=req.user.id;
    try{
        const {icon,category,amount,date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({msg:"All fields are required"});
        }
        const newExpense=new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        });
        await newExpense.save();
        res.status(201).json({newExpense});
    }
    catch(error){
        res
            .status(500)
            .json({msg:"Server Error"});
    }
}

//get expense source
exports.getAllExpense = async (req, res) => {
    const userId=req.user.id;

    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }
    catch{
        res.status(500).json({msg:"Server Error"});

    }
}

//delete expense source
exports.deleteExpense = async (req, res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully "});
    }
    catch(error){
        res.status(500).json({msg:"Server Error"});
    }
}

//download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toLocaleDateString(),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const filePath = path.join(__dirname, "../expense_details.xlsx");
        xlsx.writeFile(wb, filePath);
        res.download(filePath);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};