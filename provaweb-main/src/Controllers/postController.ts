import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  const { user_id, content, image_url } = req.body;
  try {
    const post = await prisma.post.create({
      data: { user_id, content, image_url },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: "Error creating post" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { comments: true, user: true },
  });
  res.status(200).json(posts);
};
