import express from 'express';

const router = express.Router();

router.get("/members/:memberId/borrowed-books", () => {});
router.get('/most-borrowed', () => {})

export default router;