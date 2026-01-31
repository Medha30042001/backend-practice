export const validateCustomer = ({ full_name, email, phone }) => {
  if (!full_name || !email || !phone) {
    return "Fill all fields";
  }
  if(typeof full_name !== 'string'){
    return 'full_name should be a string';
  }
  if(typeof email !== 'string' || !email.includes('@gmail.com')){
    return 'Invalid email format'
  }
  return null;
};
