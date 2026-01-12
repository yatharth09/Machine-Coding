import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded 
            next()
        } catch (error) {
            console.log('Invalid token');
        }
    } catch (error) {
        console.log(error)
    }

}