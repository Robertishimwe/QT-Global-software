import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
   getUserStats,
  exportUsersAsProtobuf
} from './user.controller';
import { createUserValidator, updateUserValidator } from './user.validation';

const router = Router();

//Create a new user
router.post('/', createUserValidator, createUser);

// Get all users
router.get('/', getUsers);

//Export all users in Protobuf format
router.get('/export', exportUsersAsProtobuf);

//Get a single user by ID
router.get('/:id', getUserById);

//  Update an existing user
router.patch('/:id', updateUserValidator, updateUser);

//Delete a user by ID
router.delete('/:id', deleteUser);

// statistic
router.get('/stats/creations-by-day', getUserStats); 

export default router;
