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

function getUsers(req:Request, res:Response): void {
    User.find({}).populate('tasks').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getUserById(req:Request, res:Response): void {
    User.find({"_id":req.params.id}).populate('tasks').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getUserByName(req:Request, res:Response): void {
    User.find({"name":req.params.name}).populate('tasks').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function postUserDemo (req: Request, res: Response): void {
    const user = new User({
        "name": req.body.name,
        "walletAddress": req.body.walletAddress,
        "tasks": req.body.travels
    });
    user.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function updateUser (req: Request, res: Response){
    const id: string = req.params.id;
    const name: string = req.body.name;
    const walletAddress: string = req.body.walletAddress;
    const tasks: string = req.body.tasks;
    User.updateOne({"_id": id}, {$set: {"name": name, "walletAddress": walletAddress, "tasks": tasks}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

function deleteUser (req:Request,res:Response){
    User.deleteOne({"_id":req.params.id}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

function deleteAll (req:Request,res:Response){
    User.deleteMany().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

export default { getUsers, getUserById, getUserByName, postUserDemo, updateUser, deleteUser, deleteAll };