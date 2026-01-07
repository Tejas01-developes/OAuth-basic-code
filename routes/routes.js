import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router=express.Router();


router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
}))

router.get("/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"/login-failed"
}),
(req,resp)=>{

try{
const user=req.user;

const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      auth: user.auth,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
resp.redirect(
    `http://localhost:5173/home?token=${token}`
)



}catch (err) {
    return resp.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
}

)


router.get("/login-failed", (req, resp) => {
    resp.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  });


  export default router;