import supabase from "../config/supabase.config.js";

export const borrowedBooksByMember = async (req, res) => {
  const { memberId } = req.params;

  const { data, error } = await supabase
    .from("borrowings")
    .select(
      `
      id,
      borrow_date,
      return_date,
      status,
      books (
        title,
        author
      )
    `,
    )
    .eq("member_id", memberId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: "No borrow records found" });
  }
  res.status(200).json({
    message: "Borrowed books fetched successfully",
    data
  });
};

