import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as UserService from './user.service';
import protobuf from 'protobufjs';
import path from 'path';


export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await UserService.createUserService(req.body);
    const { signature, publicKey, ...userResponse } = newUser;
    return res.status(201).json(userResponse);
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ message: 'Error: Email already exists.' });
    }
    console.error('Error in createUser controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserService.findAllUsersService();
    return res.status(200).json(users);
  } catch (error: any) {
    console.error('Error in getUsers controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserByIdService(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    console.error('Error in getUserById controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateUserService(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(updatedUser);
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ message: 'Error: Email already in use.' });
    }
    console.error('Error in updateUser controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const wasDeleted = await UserService.deleteUserService(id);

    if (!wasDeleted) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(204).send();
  } catch (error: any) {
    console.error('Error in deleteUser controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const exportUsersAsProtobuf = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const users = await UserService.findAllUsersService();
    const protoPath = path.resolve(__dirname, '../../proto/user.proto');
    const root = await protobuf.load(protoPath);
    const UserListMessage = root.lookupType('userpackage.UserList');
    
    const usersProtoData = users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    }));
    
    const payload = { users: usersProtoData };
    const errMsg = UserListMessage.verify(payload);
    if (errMsg) {
      throw new Error(`Protobuf verification failed: ${errMsg}`);
    }

    const message = UserListMessage.create(payload);
    const buffer = UserListMessage.encode(message).finish();

    res.setHeader('Content-Type', 'application/x-protobuf');
    res.send(buffer);

  } catch (error: any) {
    console.error('Error exporting users as Protobuf:', error);
    return res.status(500).json({ message: 'Failed to export users.' });
  }
};

export const getUserStats = async (req: Request, res: Response): Promise<Response> => {
  try {
    const stats = await UserService.getUserCreationStatsService();
    return res.status(200).json(stats);
  } catch (error: any) {
    console.error('Error in getUserStats controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

