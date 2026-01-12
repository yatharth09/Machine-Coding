import bcrypt from 'bcryptjs';


const users = []

export const signUp = async (req, res) => {
    try {
        const { email, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = {
            id: users.length + 1,
            email,
            passwordHash
        }

        users.push(newUser)
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = users.find(u => u.email === email);
        const isMatch = await bcrypt.compare(password, user.passwordHash)

        const token = jwt.sign({},JWT_SECRET, {expiresIn: '1h'})    
        res.json({token})
    } catch (error) {
        
    }
}