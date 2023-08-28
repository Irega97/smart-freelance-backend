import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

function getAllTasks(req:Request, res:Response): void {
    Task.find().populate('contracts').populate('owner').then((data)=>{
        let status: number = 200;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getTask(req:Request, res:Response): void {
    Task.find({_id: req.params.id}).populate('contracts').populate('owner').then((data)=>{
        let status: number = 200;
        console.log(data);
        return res.status(status).json(data[0]);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getTasksOfUser(req:Request, res:Response): void {
    Task.find({"owner":req.params.walletAddress}).populate('contracts').then((data)=>{
        let status: number = 200;
        console.log(data);
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function createTask(req: Request, res: Response) {
    const task = new Task({
        "name": req.body.name,
        "description": req.body.description,
        "owner": req.body.owner
    });

    // Save the task
    task.save().then((data) => {
        // Update the corresponding user's createdTasks field
        User.findOneAndUpdate(
            { _id: req.body.owner }, // Find the user based on the walletAddress
            { $push: { createdTasks: data._id } }, // Add the created task's _id to the array
            { new: true } // Return the updated user document
        )
        .then((updatedUser) => {
            if (!updatedUser) {
                // Handle case where user wasn't found
                return res.status(404).json({ message: "User not found." });
            }
            return res.status(201).json(data);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    })
    .catch((err) => {
        return res.status(500).json(err);
    });
}


function deleteTask (req:Request,res:Response){
    Task.deleteOne({"_id":req.params.id}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

export default { getAllTasks, getTask, getTasksOfUser, createTask, deleteTask};