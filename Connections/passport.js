import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {db} from '../Connections/mysql.js';



passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:process.env.GOOGLE_CALLBACK,
        },
        
        async (accesstoken,refreshtoken,profile,done)=>{
            const googleid=profile.id;
            const email=profile.emails[0].value;
            const name=profile.displayName;
        db.query(
            'SELECT * FROM users WHERE googleid=?',
            [googleid],
            (err,result)=>{
                if(err){
                    return done(err,null)
                }
                if(result.length > 0){
                    return done(null,result[0])
                }
                
                    db.query(
                        'INSERT INTO users (full_name,email,google_id,auth) VALUES (?,?,?,"google")',
                        [name,email,googleid],
                        (err,insertresult)=>{
                            if(err){
                                return done(null,null);
                            }
                            db.query(
                                'SELECT * FROM users WHERE id = ?',
                                [insertresult.insertId],
                                (err,newuser)=>{
                                    if(err) return done(err,null);
                                    return done(null,newuser[0])
                                }
                            )
                        }
                    )
                }
            
        )
    
        }
    
    )
)