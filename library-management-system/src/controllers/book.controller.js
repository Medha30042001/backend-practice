import supabase from "../config/supabase.config.js";
import { validateBook } from "../validations/book.validation.js";

export const addBook = async (req, res) => {
  const { title, author, category, available_copies } = req.body;

  const err = validateBook(req.body);
  if(err){
    return res.status(400).json({error : err});
  }
  const { data, error } = await supabase
    .from("books")
    .insert([{ title, author, category, available_copies }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message : 'Added book',
    book : data
  })
};

export const deleteBook = async (req, res) => {
    const {bookId} = req.params;

    const {data, error} = await supabase
        .from('books')
        .delete()
        .eq('id', bookId)
        .select();

    if(error){
        return res.status(500).json({error : error.message})
    }

    if(data.length === 0){
        return res.status(404).json({error : 'Book not found'})
    }

    res.status(200).json({
        message : 'Book deleted'
    })
}