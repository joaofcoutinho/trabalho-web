import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, profile_image, bio } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password, profile_image, bio },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};
