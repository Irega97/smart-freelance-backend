import { Request, Response } from "express";
import User from "../models/User"

//Hacemos una busqueda en la BBDD de todo lo que hay en demo
//Es una busqueda asincrona, por eso usamos el await
/* export const getUsers = async (req: Request, res: Response) => {
    //El await hace que la siguiente linea no se ejecute
    //hasta que el resultado no se haya obtenido
    const results = await User.find({});
    return res.status(400).json(results);
} */

// function getUsers(req:Request, res:Response): void {
//     User.find({}).populate('tasks').then((data)=>{
//         let status: number = 200;
//         if(data==null) status = 404;
//         console.log(data);
//         return res.status(status).json(data);
//     }).catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//     })
// }

// function getUserById(req:Request, res:Response): void {
//     User.find({"_id":req.params.id}).populate('tasks').then((data)=>{
//         let status: number = 200;
//         if(data==null) status = 404;
//         console.log(data);
//         return res.status(status).json(data);
//     }).catch((err) => {
//         return res.status(500).json(err);
//     })
// }

function getUserByWallet(req:Request, res:Response): void {
    User.find({"walletAddress":req.params.walletAddress}).populate('createdTasks').then((data)=>{
        let status: number = 200;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function postUser(req: Request, res: Response) {
    if (req.body.walletAddress != null) {
        const user = new User({
            "name": req.body.name,
            "fullName": req.body.fullName,
            "userName": req.body.username,
            "email": req.body.email,
            "image": req.body.image,
            "walletAddress": req.body.walletAddress
        });
        user.save().then((data) => {
            return res.status(201).json(data);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    } else {
        return res.status(400).json({ error: 'Bad request: walletAddress cannot be empty.' });
    }
}

// function updateUser (req: Request, res: Response){
//     const id: string = req.params.id;
//     const name: string = req.body.name;
//     const walletAddress: string = req.body.walletAddress;
//     const tasks: string = req.body.tasks;
//     User.updateOne({"_id": id}, {$set: {"name": name, "walletAddress": walletAddress, "tasks": tasks}}).then((data) => {
//         res.status(201).json(data);
//     }).catch((err) => {
//         res.status(500).json(err);
//     })
// }

function deleteUser (req:Request,res:Response){
    User.deleteOne({"walletAddress":req.params.walletAddress}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

function deleteUserV2 (req:Request,res:Response){
    User.deleteOne({"walletAddress":req.params.walletAddress}).then((data) => {
        if(data.deletedCount == 0) {
            res.status(404).send({message: 'Registro no encontrado en base de datos', success: false});
        }
        res.status(200).send({message: 'OK', success: true});
    }).catch((err) => {
        res.status(500).send({message: err, success: false});
    })
}

// function deleteAll (req:Request,res:Response){
//     User.deleteMany().then((data) => {
//         res.status(200).json(data);
//     }).catch((err) => {
//         res.status(500).json(err);
//     })
// }

export default { /* getUsers, getUserById, */ getUserByWallet, postUser, deleteUser/* , updateUser, deleteUser, deleteAll */ };