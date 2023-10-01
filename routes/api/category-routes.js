const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{model:Product}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async(req, res) => {
  try{
    const categoriesById=await Category.findByPk(req.params.id,{
      include: [{model:Product}]
    })
    if (!categoriesById){
      res.status(404).json({message: 'Category not found!'})
    }
    res.status(200).json(categoriesById)
  }
  catch(err){
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async(req, res) => {
   try{
    const createCategory=await Category.create({
      category_name:req.body.category_name,
    })
    res.status(200).json(createCategory);
   }
   catch(err){
    res.status(500).json(err);
   }
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
