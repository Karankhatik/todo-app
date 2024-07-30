const zod = require('zod');

const todoSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string().min(1),
    completed: zod.boolean().default(false)
});

const validate = async (req, res, next) => {
    const {error} = todoSchema.safeParse(req.body);
    if(error) {
        return res.status(400).json({message: error, success: false});
    }
    next();
}