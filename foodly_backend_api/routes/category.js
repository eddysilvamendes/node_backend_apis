const router = require('express').Router();
const categoryController = require('../controller/categoriesController')
const {verifyAdmin} = require('../middleware/verifyToken')

router.post('/',verifyAdmin,verifyAndAuthorization,categoryController.createCategory)
router.post('/:image/:id',verifyAdmin,categoryController.patchCategoryImage)
router.put('/:id',verifyAdmin,categoryController.updateCategory)
router.delete('/:id',verifyAdmin,categoryController.deleteCategory)
router.get('/',categoryController.getAllCategory)
router.get('/random',categoryController.getRandomCategory)




module.exports = router;