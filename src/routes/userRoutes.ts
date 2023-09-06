import { Router } from "express";

const router = Router();


//Create User
router.post('/', (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});


//list User
router.get('/', (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});
    

//get one User
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implemented: ${id}` });
});


//update one User
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implemented: ${id}` });
});


//delete one User
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implemented: ${id}` });
});


export default router;