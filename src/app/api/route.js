import { v4 as uuidv4 } from 'uuid';

export async function GET(req,res) {//get all users
    return res.status(200).json(users);
}

export async function POST(req,res){//create new user
    const newUser={
        id:uuidv4(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };
    users.push(newUser);
    return res.status(201).json(newUser);
}

export async function PUT(req,res){//update user
    const {id}=req.query;
    const updateUser=users.find(u=>u.id===id);
    if(!updateUser){
        return res.status(404).json({message:'User not found'});
    }
    updateUser.name = req.body.name || updateUser.name;
    updateUser.email = req.body.email || updateUser.email;
    updateUser.password = req.body.password || updateUser.password;
    return res.status(200).json(updateUser);
}

export async function DELETE(req,res){//delete user
    const { id: deleteId } = req.query;
    const deleteUserIndex = users.findIndex(u => u.id === deleteId);
    if (deleteUserIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const deletedUser = users.splice(deleteUserIndex, 1);
    return res.status(200).json(deletedUser);
}
