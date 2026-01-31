import supabase from "../config/supabase.config.js"
import { validateMember } from "../validations/member.validation.js";

export const registerMember = async (req, res) => {
    const {full_name, email, membership_type} = req.body;

    const err = validateMember(req.body);

    if(err){
        return res.status(400).json({error : err});
    }

    const {data, error} = await supabase
        .from('members')
        .insert([{full_name, email, membership_type}])
        .select();
    if(error){
        if(error === '23505'){
            return res.status(409).json({error : 'Email already exists'})
        }
        return res.status(500).json({error : error.message})
    }

    res.status(201).json({
        message : 'Member registered',
        member : data
    })
}

export const deleteMember = async (req, res) => {
    const {memberId} = req.params;

    const {data, error} = await supabase
        .from('members')
        .delete()
        .eq('id', memberId)
        .select();

    if(error){
        return res.status(500).json({error : error.message})
    }

    if(data.length === 0){
        return res.status(404).json({error : 'Member not found'})
    }

    res.status(200).json({
        message : 'Member deleted'
    })
}