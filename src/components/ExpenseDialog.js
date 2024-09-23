import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebase/firestore'; // Adjust import path as necessary
import { useAuth } from '../context/AuthContext';

const ExpenseDialog = () => {
  const [date, setDate] = useState('');
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useAuth();

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to add an expense.');
      return;
    }
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `expenses/${user.uid}/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const expenseRef = collection(firestore, 'expenses');
      if (isEditing && currentExpenseId) {
        const expenseDocRef = doc(firestore, 'expenses', currentExpenseId);
        await updateDoc(expenseDocRef, {
          date,
          locationName,
          address,
          items,
          amount,
          imageUrl,
          userId: user.uid, // Associate expense with user
          updatedAt: new Date()
        });
        setIsEditing(false);
        setCurrentExpenseId(null);
      } else {
        await addDoc(expenseRef, {
          date,
          locationName,
          address,
          items,
          amount,
          imageUrl,
          userId: user.uid, // Associate expense with user
          createdAt: new Date()
        });
      }

      console.log('Expense added/updated successfully!');
      // Optionally reset form fields
      setDate('');
      setLocationName('');
      setAddress('');
      setItems('');
      setAmount('');
      setImage(null);
      // Fetch expenses again to update the table
      fetchExpenses();
    } catch (error) {
      setError(error.message);
      console.error('Error adding/updating expense:', error);
    }
  };

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      const expenseQuery = query(collection(firestore, 'expenses'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(expenseQuery);
      const expensesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter expenses based on selected date range
      const filteredExpenses = expensesList.filter(expense => {
        const expenseDate = new Date(expense.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (!startDate || expenseDate >= start) && (!endDate || expenseDate <= end);
      });

      setExpenses(filteredExpenses);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(firestore, 'expenses', expenseId));
      fetchExpenses();
      console.log('Expense deleted successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = (expense) => {
    setDate(expense.date);
    setLocationName(expense.locationName);
    setAddress(expense.address);
    setItems(expense.items);
    setAmount(expense.amount);
    setImage(null);
    setIsEditing(true);
    setCurrentExpenseId(expense.id);
  };

  useEffect(() => {
    fetchExpenses();
  }, [user, startDate, endDate]);

  const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '10px' }}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          name="expense-date"
          style={{ padding: '8px', marginBottom: '10px', fontSize: '1rem' }}
        />

        <label style={{ marginBottom: '10px' }}>Location Name:</label>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
          name="expense-location"
          style={{ padding: '8px', marginBottom: '10px', fontSize: '1rem' }}
        />

        <label style={{ marginBottom: '10px' }}>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          name="expense-address"
          style={{ padding: '8px', marginBottom: '10px', fontSize: '1rem' }}
        />

        <label style={{ marginBottom: '10px' }}>Items Purchased:</label>
        <input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
          name="expense-items"
          style={{ padding: '8px', marginBottom: '10px', fontSize: '1rem' }}
        />

        <label style={{ marginBottom: '10px' }}>Amount Spent:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          name="expense-amount"
          style={{ padding: '8px', marginBottom: '10px', fontSize: '1rem' }}
        />

        <label style={{ marginBottom: '10px' }}>Upload Bill:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          name="expense-image"
          style={{ marginBottom: '10px', fontSize: '1rem' }}
        />

        <button
          type="submit"
          name="submit-expense"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>

      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Expense History</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <label style={{ marginRight: '10px' }}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            name="start-date"
            style={{ padding: '8px', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name="end-date"
            style={{ padding: '8px', fontSize: '1rem' }}
          />
        </div>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Items</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bill</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.date}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.locationName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.address}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.items}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.amount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {expense.imageUrl && (
                  <a href={expense.imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                    View Bill
                  </a>
                )}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleEditExpense(expense)} name="edit-expense" style={{ marginRight: '10px' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteExpense(expense.id)} name="delete-expense">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default ExpenseDialog;
