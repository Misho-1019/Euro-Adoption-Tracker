
export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
        
        if (!result.success) {
            const errors = result.error.issues ?? result.error.errors ?? [];
            
            return res.status(400).json({
                errors: errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                }))
            })
        }

        req.body = result.data;

        next();
    }
}