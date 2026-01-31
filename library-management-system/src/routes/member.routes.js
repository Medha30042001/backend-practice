import express from 'express';
import { deleteMember, 
        registerMember } from '../controllers/member.controller.js';

const router = express.Router();

router.post('/register', registerMember);
router.delete('/:memberId', deleteMember);

export default router;
