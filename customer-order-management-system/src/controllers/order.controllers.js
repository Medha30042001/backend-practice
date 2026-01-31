import { supabase } from "../config/supabase.config.js";
import { validateOrders } from "../validations/order.validation.js";

export const createOrder = async (req, res) => {
  const { product_name, quantity, price, customer_id } = req.body;

  const err = validateOrders(req.body)
  if (err) {
    return res.status(400).json({ error: err });
  }
  const { data, error } = await supabase
    .from("orders2")
    .insert([{ product_name, quantity, price, customer_id }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Order added",
    order: data,
  });
};

export const getCustomerOrders = async (req, res) => {
  const { customerId } = req.params;

  const {data : customer, error : customerError} = await supabase
        .from('customers2')
        .select('id')
        .eq('id', customerId)
        .single();

    if(customerError){
        return res.status(404).json({error : 'Customer not found'})
    }

  const { data, error } = await supabase
    .from("orders2")
    .select()
    .eq("customer_id", customerId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({
    message: "Fetched order by customer Id",
    order: data,
  });
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from("orders2")
    .update(updates)
    .eq("id", orderId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if(data.length === 0){
    return res.status(404).json({error : 'Order not found'})
  }

  res.status(200).json({
    message: "Order updated",
    order: data,
  });
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { data, error } = await supabase
    .from("orders2")
    .delete()
    .eq("id", orderId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json({
    message: "Order deleted",
  });
};
