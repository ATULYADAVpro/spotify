// this custom trycatch function making for to avoide repition
export default async function TryCatch(handler) {
    try {
        await handler(req, res, next);
    } catch (error) {
        next(error)
    }
}