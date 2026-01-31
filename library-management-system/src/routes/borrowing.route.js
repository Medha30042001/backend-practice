import express from "express";

const router = express.Router();

router.post("/add-borrow", () => {});
router.put("/return/:borrowId", () => {});
router.delete("/:borrowId", () => {});

export default router;
