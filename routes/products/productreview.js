const express = require('express');
const router = express.Router();
const ProductReviewController = require('../../controllers/ProductReviewController');

module.exports = (io) => {
    io.on('connection', socket => {
        
        // Product Review Routes
        router.post('/addreview', async (req,res,next) => ProductReviewController.addReview(req,res,next,socket));
        router.post('/addreply', async (req,res,next) => ProductReviewController.addReply(req,res,next,socket));
        router.delete('/deletereview', async (req,res,next) => ProductReviewController.deleteReview(req,res,next,socket));
        router.delete('/deletereply', async (req,res,next) => ProductReviewController.deleteReply(req,res,next,socket));
        router.patch('/editreview', async (req,res,next) => ProductReviewController.editReview(req,res,next,socket));
        router.patch('/editreply', async (req,res,next) => ProductReviewController.editReply(req,res,next,socket));
        
    });
    router.get('/getreviews', ProductReviewController.getReviews);
    
    return router;
}
