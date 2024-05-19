const express = require('express');
const router = express.Router();
const { ContentType } = require('../models');

// Create new content type

router.post('/', async (req, res) => {
    const { name, schema } = req.body;
    try{
        const existingActiveType = await ContentType.findOne({
            where: {
                name: name,
                isActive: true
            }
        });

        if(existingActiveType){
            return res.status(400).send('Entity already exists');
        }

        const contentType = await ContentType.create({ name, schema, isActive: true });
        res.status(201).json(contentType);
    } catch(error){
        console.error('Failed to create Content type:', error);
        res.status(500).send(`Server Error : ${error.message}`);
    }
});

//Get all content Types 

router.get('/', async (req, res) => {
    try{
        const contentTypes = await ContentType.findAll({
             where: { isActive: true}
        });
        res.json(contentTypes);
    } catch(error){
        console.error('Failed to retreive Content types:', error);
        res.status(500).send(`Server Error : ${error.message}`);
    }
});

//Update a content type
router.put('/:id', async (req, res) => {
    try {
        const { name, schema } = req.body;
        const result = await ContentType.update({ name, schema }, {
            where: { id: req.params.id }
        });
        if (result[0] > 0) {
            res.send('Content type updated');
        } else {
            res.status(404).send('Content type not found');
        }
    } catch (error) {
        console.error('Failed to update content type:', error);
        res.status(500).send('Server error');
    }
});

// Delete a Content type 
router.put('/deactivate/:id', async (req, res) => {
    try {
        const result = await ContentType.update(
           { isActive: false },
           { where: { id: req.params.id } }
        );
        if (result[0] > 0) {
            res.send('Content type deactivated');
        } else {
            res.status(404).send('Content type not found');
        }
    } catch (error) {
        console.error('Failed to deactivate content type:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;



