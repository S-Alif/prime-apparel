import express from 'express'
import userController from '../../controllers/user.controller.js'

const router = express.Router()

router
    .get('/:page/:limit', userController.getAllUsers)
    .get('/:creds', userController.getUserByEmailOrPhone)
    .patch('/:id', userController.updateUserStatus)

export default router