
export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
        const errors = result.error.issues ?? result.error.errors ?? [];

        if (!result.success) {
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