import express from 'express';
import { createCustomer, 
        deleteCustomer } from '../controllers/customer.controllers.js';

const router = express.Router();

router.post('/register', createCustomer);
router.delete('/:customerId', deleteCustomer)

export default router;

// | Scenario         | Code |
// | ---------------- | ---- |
// | Validation error | 400  |
// | Duplicate email  | 409  |
// | Not found        | 404  |
// | Success create   | 201  |
// | Server error     | 500  |
