import User from "../model/userModel.js"
import{generateToken} from "../utils/jwtToken.js"

// export const patientRegister = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Check if the necessary fields are provided
//       if (!email || !password) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill full form",
//         });
//       }
  
//       // Check if the user is already registered
//       let user = await User.findOne({ email });
//       if (user) {
//         return res.status(400).json({
//           success: false,
//           message: "User Already Registered",
//         });
//       }
  
//       // Create new user
//       user = await User.create({
//         email,
//         password,
//       });
  
//       // Generate token and send response
//       generateToken(user, "User Registered Successfully", 200, res);
//     } catch (error) {
//       // Handle any server errors
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   };
  
export const create = async (req, res) => {
    try {
      const userData = new User(req.body);
  
      if (!userData) {
        return res.status(404).json({ msg: "User data not found" });
      }
  
      const savedData = await userData.save();
  
      // Remove this res.status(200).json() since generateToken will handle the response
      // Pass the saved user data to the generateToken function
      generateToken(savedData, "User Registered Successfully", 200, res);
  
    } catch (error) {
      // Send error response if any exception occurs
      res.status(500).json({ error: error.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate request body
      if (!email || !password ) {
        return res.status(400).json({
          success: false,
          message: "Please Provide All Details!",
        });
      }
  

      // Check if the user exists
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found!",
        });
      }
  
      // Compare provided password with the stored password
      const isPasswordMatched = await user.compareUserPassword(password);
      if (!isPasswordMatched) {
        return res.status(400).json({
          success: false,
          message: "Invalid Password!",
        });
      }
      // Generate token and send response
      generateToken(user, `User Logged In Successfully`, 200, res);
    } catch (error) {
      // Catch any other errors and send a server error response
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  export const logoutUser = (req, res) => {
    try {
      // Clear the patient token cookie and send the response
      res
        .status(201)
        .cookie("UserToken", "", {
          httpOnly: true,
          expires: new Date(Date.now()),
        })
        .json({
          success: true,
          message: "User Logged Out Successfully!",
        });
    } catch (error) {
      // Catch any unexpected errors and send a server error response
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
  

export const getAll = async(req , res)=>{
    try {

        const userData = await User.find()
        if(!userData){
            res.status(404).json({msg:"Users Data not found"})
        }
        res.status(200).json(userData)
        
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export const getOne = async(req , res)=>{
    try {

        const id = req.params.id
        const userExist = await User.findById(id)
        if(!userExist){
            return res.json.status(404).json({msg:"User not found"})
        }
        res.status(200).json(userExist)
    } catch (error) {
        res.status(200).json({error:error})
    }
}

export const update = async(req , res)=>{
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if(!userExist){
            return res.status(401).json({msg:"User not found"})
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body , {new:true})
       res.status(200).json({
        msg:"User Updated Successfully",
        updatedData
       })

    } catch (error) {
        res.status(500).json({error:error})
        
    }
}
export const deleteuser = async (req , res)=>{
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if(!userExist){
            return res.status(404).json({msg:"User not found"})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg:"user deleted successfully"})


        
    } catch (error) {
        res.status(500).json({error:error})
    }
}