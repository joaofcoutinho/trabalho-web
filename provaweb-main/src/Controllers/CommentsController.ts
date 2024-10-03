import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  const { post_id, user_id, content } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { post_id, user_id, content },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: "Error creating comment" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany({
    include: { user: true, post: true },
  });
  res.status(200).json(comments);
};
