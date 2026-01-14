import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body

    // Check if user already exist
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExist) {
        return res.status(400).json({ error: "User already exist with this email" })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

// Generate JWT
    const token = generateToken(user.id, res)

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            }
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Email Control
    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!user) {
        return res.status(401).json({ error: "Wrong email " });
    }

    // Password Control
    console.log("Login Request Body:", req.body);
    console.log("Stored Hash:", user.password);

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password input:", password);
    console.log("Is Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Wrong  password" });
    }

// Generate JWT
    const token = generateToken(user.id, res)

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: email
            },
            token : token
        }
    });

}


const logout = async (req, res)=> {
    res.cookie("jwt", " ", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        status: "success", 
        message: "Logged out succesfully"
    });
};

export { register, login , logout};