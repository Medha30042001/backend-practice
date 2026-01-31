import { supabase } from "../config/supabase.config.js";
import { validateCustomer } from "../validations/customer.validation.js";

export const createCustomer = async (req, res) => {
  const { full_name, email, phone } = req.body;

  const err = validateCustomer(req.body);
  if (err) {
    return res.status(400).json({ error: err });
  }

  const { data, error } = await supabase
    .from("customers2")
    .insert([{ full_name, email, phone }])
    .select();

  if (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }

  // 23505 → unique violation
  // 23503 → foreign key violation
  // 23502 → not null violation

  res.status(201).json({
    message: "Customer registered",
    customer: data,
  });
};

export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { data, error } = await supabase
    .from("customers2")
    .delete()
    .eq("id", customerId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(200).json({ message: "Customer deleted successfully" });
};
