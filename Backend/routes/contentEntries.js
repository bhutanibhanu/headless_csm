const express = require('express');
const router  = express.Router();
const { ContentType, ContentEntry } = require('../models');

// Create a new content entry
router.post('/', async (req, res) => {
    try {
        const { contentTypeId, data } = req.body;
        const contentType = await ContentType.findByPk(contentTypeId);
        if (!contentType) {
            return res.status(404).send('Content type not found');
        }
        const contentEntry = await ContentEntry.create({ contentTypeId, data });
        res.status(201).json(contentEntry);
    } catch (error) {
        console.error('Failed to create content entry:', error);
        res.status(500).send('Server error');
    }
});

// Get all content entries
router.get('/', async (req, res) => {
    try {
        const contentEntries = await ContentEntry.findAll();
        res.json(contentEntries);
    } catch (error) {
        console.error('Failed to retrieve content entries:', error);
        res.status(500).send('Server error');
    }
});

// get particular content entry
router.get('/:contentTypeId', async (req, res) => {
    try {
        const { contentTypeId } = req.params;
        const contentEntries = await ContentEntry.findAll({
            where: { contentTypeId }
        });
        if (contentEntries.length > 0) {
            res.json(contentEntries);
        } else {
            res.status(404).send('No entries found for the given content type ID.');
        }
    } catch (error) {
        console.error('Failed to retrieve content entries:', error);
        res.status(500).send('Server error');
    }
});


// Update a content entry
router.put('/:id', async (req, res) => {
    try {
        const { data } = req.body;
        const result = await ContentEntry.update({ data }, {
            where: { id: req.params.id }
        });
        if (result[0] > 0) {
            res.send('Content entry updated');
        } else {
            res.status(404).send('Content entry not found');
        }
    } catch (error) {
        console.error('Failed to update content entry:', error);
        res.status(500).send('Server error');
    }
});

// Delete a content entry
router.delete('/:id', async (req, res) => {
    try {
        const result = await ContentEntry.destroy({
            where: { id: req.params.id }
        });
        if (result > 0) {
            res.send('Content entry deleted');
        } else {
            res.status(404).send('Content entry not found');
        }
    } catch (error) {
        console.error('Failed to delete content entry:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;