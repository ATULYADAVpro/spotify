// Create Custom TryCatch function to avoid repition of trycatch
export default function TryCatch(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            console.log(err.message)
            next(err);
        }
    };
}