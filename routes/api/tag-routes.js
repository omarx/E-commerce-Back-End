const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const getTags=await Tag.findAll({
      include:[{model:Product}]
    })
    res.status(200).json(getTags);
  }
  catch(error){
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async(req, res) => {
  try{
    const getTags=await Tag.findByPk(req.params.id,{
      include:[{model:Product}]
    })
    res.status(200).json(getTags);
  }
  catch(error){
    res.status(500).json(error);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/',async (req, res) => {
  try{
    const createTag=await Tag.create({
      tag_name:req.body.tag_name,
    })
    res.status(200).json(createTag)
  }catch(error){
    res.status(500).json(error)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{
    const updateTag=await Tag.update(
      {
      tag_name:req.body.tag_name,
    },{
      where:{
        id:req.params.id,
      }
    });
    if(!updateTag){
      res.status(404).json({message:'Tag not found!'})
    }
    res.status(200).json(updateTag);
  }catch(err){
    res.status(500).json(err)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async(req, res) => {
  try{
    const deleteTag=await Tag.destroy({
      where:{
        id:req.params.id 
      }
    });
    if (!deleteTag){
      res.status(404).json({message:"Tag not found!"});
    }
    res.status(200).json({message:"Tag deleted sucessfully!"})
  }catch(err){
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
