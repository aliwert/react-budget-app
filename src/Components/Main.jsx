import React, { useState } from "react";
import '../index.css';

const Main = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productTitleError, setProductTitleError] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenditureValue, setExpenditureValue] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleTotalAmountButton = () => {
    const tempAmount = parseFloat(totalAmount);
    if (isNaN(tempAmount) || tempAmount < 0) {
      setErrorMessage("Value cannot be empty or negative");
    } else {
      setErrorMessage("");
      setAmount(tempAmount);
      setBalanceValue(tempAmount - expenditureValue);
      setTotalAmount("");
    }
  };

  const handleCheckAmountButton = () => {
    if (!userAmount || !productTitle) {
      setProductTitleError("Values cannot be empty");
      return;
    }

    const expenditure = parseInt(userAmount);
    const sum = expenditureValue + expenditure;
    setExpenditureValue(sum);
    const totalBalance = amount - sum;
    setBalanceValue(totalBalance);

    const newExpense = { title: productTitle, amount: userAmount };
    setExpenses([...expenses, newExpense]);

    setUserAmount("");
    setProductTitleError("");
  };

  const handleEditExpense = (index) => {
    const expenseToEdit = expenses[index];
    setUserAmount(expenseToEdit.amount);
    setTotalAmount(expenseToEdit.title);
    const remainingExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(remainingExpenses);
  };

  const handleDeleteExpense = (index) => {
    const remainingExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(remainingExpenses);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="sub-container">
          <div className="total-amount-container">
            <h3>Budget</h3>
            <p className="hide error">{errorMessage}</p>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Enter Total Amount"
            />
            <button className="submit" onClick={handleTotalAmountButton}>
              Set Budget
            </button>
          </div>

          <div className="user-amount-container">
            <h3>Expenses</h3>
            <p className="hide error">{productTitleError}</p>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Enter Title of Product"
            />
            <input
              type="number"
              value={userAmount}
              onChange={(e) => setUserAmount(e.target.value)}
              placeholder="Enter Cost of Product"
            />
            <button className="submit" onClick={handleCheckAmountButton}>
              Check Amount
            </button>
          </div>
        </div>

        <div className="output-container flex-space">
          <div>
            <p>Total Budget</p>
            <span id="amount">{amount}</span>
          </div>
          <div>
            <p>Expenses</p>
            <span id="expenditure-value">{expenditureValue}</span>
          </div>
          <div>
            <p>Balance</p>
            <span id="balance-amount">{balanceValue}</span>
          </div>
        </div>
      </div>

      <div className="list">
        <h3>Expense List</h3>
        <div className="list-container" id="list">
          {expenses.map((expense, index) => (
            <div key={index} className="sublist-content flex-space">
              <p className="product">{expense.title}</p>
              <p className="amount">{expense.amount}</p>
              
              <button
                className="fa-solid fa-trash-can delete"
                onClick={() => handleDeleteExpense(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
