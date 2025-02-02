const express = require('express')
const { addTransaction,getAllTransactions,editTransactions,deleteTransactions } = require('../controllers/transactionCtrl')
//router object
const router = express.Router()
//routes
//add transaction
router.post('/add-transaction',addTransaction )
//edit transaction post method
router.post('/edit-transaction',editTransactions );
//delete transaction 
router.post('/delete-transaction',deleteTransactions );

//get transactions
router.post('/get-transaction',getAllTransactions); 

module.exports = router 