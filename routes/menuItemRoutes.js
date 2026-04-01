const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menuItem');

router.post('/', async (req,res) => {
    try{
        const newMenuItem = req.body
        const newMenu = new MenuItem(newMenuItem);

        const response = await newMenu.save();
        console.log("New menu item saved.");
        res.status(200).json(response);

    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    } 
});

router.get('/', async (req,res) => {
    try{
        const data = await MenuItem.find();
        console.log("menu item fetched.");
        res.status(200).json(data);
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/:tasteType', async (req,res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'Sweet' || tasteType == 'Spicy' || tasteType == 'Sour'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'Invalid work type'})
        }
    } catch(err){
         console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;