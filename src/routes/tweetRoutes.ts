import { Router } from "express";

const router = Router();


//Create Tweet
router.post('/', (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});


//list Tweet
router.get('/', (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});


//get one Tweet
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implemented: ${id}` });
});


//update one Tweet
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implemented: ${id}` });
});


//delete one Tweet
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `Not Implemented: ${id}` });
});


export default router;