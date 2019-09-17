const router = require('express').Router();
const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/authentication');
const { multer, sendUploadToGCS } = require('../middlewares/gcs');

router.post('/upload', multer.single('image'), sendUploadToGCS, (req, res, next) => {
    res.status(201).json({
        link: req.file.publicUrl
    })
})

router.post('/signup', multer.single('image'), sendUploadToGCS, UserController.signup);
router.post('/signin', UserController.signin);

router.post('/cart', authentication, UserController.addCart);
router.get('/cart', authentication, UserController.getCart);
router.delete('/cart/:id', authentication, UserController.deleteCart);



module.exports = router;