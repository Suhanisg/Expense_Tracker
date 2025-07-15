const path = require("path");
const xlsx = require("xlsx");
const Income = require("../models/Income");


//Add income Source
exports.addIncome =async (req, res) => {
    const userId=req.user.id;
    try{
        const {icon,source,amount,date} = req.body;

        if(!source || !amount || !date){
            return res.status(400).json({msg:"All fields are required"});
        }
        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(201).json({newIncome});
    }
    catch(error){
        res
            .status(500)
            .json({msg:"Server Error"});
    }
}

//get income source
exports.getAllIncome = async (req, res) => {
    const userId=req.user.id;

    try{
        const income=await Income.find({userId}).sort({date:-1});
        res.json(income);
    }
    catch{
        res.status(500).json({msg:"Server Error"});

    }
}

//delete income source
exports.deleteIncome = async (req, res) => {

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully "});
    }
    catch(error){
        res.status(500).json({msg:"Server Error"});
    }
}

//download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toLocaleDateString(),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const filePath = path.join(__dirname, "../income_details.xlsx");
        xlsx.writeFile(wb, filePath);
        res.download(filePath);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};