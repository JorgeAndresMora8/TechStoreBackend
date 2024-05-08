export default async function authMiddleware(req, res, next){ 
    const { headers } = req
    if(!headers.token) {
        res.status(403).json({error: 'your unauthenticated, please login or signup'})
    }else next()
    
    

}