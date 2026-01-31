export const validateMember = ({ full_name, email, membership_type }) => {
  if (!full_name || !email || !membership_type) {
    return "Fill all fields";
  }
  if (!['standard', 'premium'].includes(membership_type)) {
    return "Membership should be either standard or premium";
  }
  return null;
};
