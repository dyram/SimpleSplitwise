const model = require("../models");
const Expense = model.Expenses;

Expenses = () => { };

Expenses.addExpense = async (data) => {
    let promise = await Expense.create(data)
    return promise
};

Expenses.getExpense = async () => {
    let promise = await Expense.findAll();
    return promise;
};


module.exports = Expenses;
