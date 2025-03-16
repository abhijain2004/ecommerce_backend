const express = require('express');
const router = express.Router();
const personController = require('../Controller/controller');
const feedbackController = require('../Controller/feedback');
const { jwtAuthMiddleware } = require('../jwt');


router.post('/signup',personController.signUp)
      .post('/login',personController.logIn)
      .post('/feedback',jwtAuthMiddleware,feedbackController.form)
      .get('/validate',jwtAuthMiddleware,personController.validate)
      .get('/products',jwtAuthMiddleware,personController.getProducts)
      .get('/product/:type',jwtAuthMiddleware,personController.getData)     
      .get('/item/:id',jwtAuthMiddleware,personController.getProduct)      
      .get('/cumfy/:title',jwtAuthMiddleware,personController.getdataByTitle)  
      .delete('/cart/:id',jwtAuthMiddleware,personController.deleteCart)
      .get('/cart',jwtAuthMiddleware,personController.getCart)
      .post('/cart',jwtAuthMiddleware,personController.cartData)
      .post("/wish",jwtAuthMiddleware,personController.wishData)
      .delete('/wish/:id',jwtAuthMiddleware,personController.deleteWish)
      .get("/wish",jwtAuthMiddleware,personController.getWish);



exports.router=router;