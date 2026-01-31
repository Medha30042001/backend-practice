export const validateBook = ({ title, author, category, available_copies}) => {
    
    if( !title || !author || !category || available_copies === undefined){
        return 'All fields required'
    }

    if(available_copies < 0){
        return 'Available copies cannot be negative'
    }
    
    return null;
}