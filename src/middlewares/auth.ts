export const authMiddleware = (handler : any) => {
    // return async (req, res) => {
    //     const token = req.cookies.token;
    //
    //     if (!token) {
    //         return res.status(401).json({ message: 'Authentication required' });
    //     }
    //
    //     try {
    //         const decoded = jwt.verify(token, JWT_SECRET);
    //         req.user = decoded;
    //         return handler(req, res);
    //     } catch (err) {
    //         return res.status(401).json({ message: 'Invalid token' });
    //     }
    // }
}

export default authMiddleware;
