import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check User Exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Response
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",

      token: generateToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAllowed: user.isAllowed,
      },
    });

  } catch (error) {
    console.log("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Login Response
    res.status(200).json({
      success: true,
      message: "Login Successful",

      token: generateToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAllowed: user.isAllowed,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






































// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";


// // Register User

// export const registerUser = async (req, res) => {
//   try {

//     const { name, email, password, role } = req.body;


//     // Check User Exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }


//     // Create User
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//     });


//     // Response
//     res.status(201).json({
//       success: true,
//       message: "User Registered Successfully",

//       token: generateToken(user),

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });


//   } catch (error) {

//     console.log("Register Error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };


// // Login User

// export const loginUser = async (req, res) => {
//   try {

//     const { email, password } = req.body;


//     // Find User
//     const user = await User.findOne({ email });


//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }


//     // Check Password
//     const isMatch = await user.matchPassword(password);


//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }



//     // Login Response
//     res.status(200).json({

//       success: true,

//       message: "Login Successful",

//       token: generateToken(user),


//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },

//     });



//   } catch (error) {

//     console.error("Login Error:", error);


//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };