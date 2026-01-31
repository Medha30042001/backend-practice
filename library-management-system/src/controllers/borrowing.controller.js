import supabase from "../config/supabase.config.js";

export const createBorrow = async (req, res) => {
  const { member_id, book_id } = req.body;

  const { data: book, error: bookError } = await supabase
    .from("books")
    .select("available_copies")
    .eq("id", book_id)
    .single();

  if (bookError || !book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (book.available_copies <= 0) {
    return res.status(400).json({ error: "Book unavailable" });
  }

  await supabase
    .from("books")
    .update({ available_copies: book.available_copies - 1 })
    .eq("id", book_id);

  const { data, error } = await supabase
    .from("borrowings")
    .insert([{ member_id, book_id, borrow_date: new Date() }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "borrow added",
    borrow: data,
  });
};

export const returnBook = async (req, res) => {
  const { borrowId } = req.params;

  const { data: borrow, error  } = await supabase
    .from("borrowings")
    .select("book_id, status")
    .eq("id", borrowId)
    .single();

 if (error || !borrow) {
    return res.status(404).json({ error: "Borrow record not found" });
  }

  if (borrow.status === "returned") {
    return res.status(400).json({ error: "Book already returned" });
  }

  await supabase
    .from("borowings")
    .update({ status: "returned", return_date: new Date() })
    .eq("id", borrowId);

  //   await supabase.rpc("increment_book_copies", {
  //     book_id_input: borrow.book_id,
  //   });

  const { data: book, error: bookError } = await supabase
    .from("books")
    .select("available_copies")
    .eq("id", borrow.book_id)
    .single();


  await supabase
    .from("books")
    .update({ available_copies: book.available_copies + 1 })
    .eq("id", borrow.book_id);

  res.status(200).json({ message: "Book returned" });

  
};
//
//   import { supabase } from "../config/supabase.js";

// export const returnBook = async (req, res) => {
//   const { borrowId } = req.params;

//   // 1️⃣ Get borrow record
//   const { data: borrow, error: borrowError } = await supabase
//     .from("borrowings")
//     .select("book_id, status")
//     .eq("id", borrowId)
//     .single();

//   if (borrowError || !borrow) {
//     return res.status(404).json({ error: "Borrow record not found" });
//   }

//   if (borrow.status === "returned") {
//     return res.status(400).json({ error: "Book already returned" });
//   }

//   // 2️⃣ Get current available copies of the book
//   const { data: book, error: bookError } = await supabase
//     .from("books")
//     .select("available_copies")
//     .eq("id", borrow.book_id)
//     .single();

//   if (bookError || !book) {
//     return res.status(404).json({ error: "Book not found" });
//   }

//   // 3️⃣ Update borrow record
//   await supabase
//     .from("borrowings")
//     .update({
//       status: "returned",
//       return_date: new Date()
//     })
//     .eq("id", borrowId);

//   // 4️⃣ Increment available copies by 1
//   await supabase
//     .from("books")
//     .update({
//       available_copies: book.available_copies + 1
//     })
//     .eq("id", borrow.book_id);

//   res.status(200).json({ message: "Book returned successfully" });
// };