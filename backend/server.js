import cors from 'cors';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { config as configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import db from './routes/db.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const app = express();
const saltRounds = 10;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '@' + file.originalname);
    }
});
const upload = multer({ storage: storage });

configDotenv();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: 'name',
    secret: 'helloworld',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 1000,
    }
}));
app.use('/uploads', express.static('uploads'));
app.use(express.static('/public'));

//FORGOT PASSWORD
app.post('/api/forgot-password', (req, res) => {
    console.log("Hello");
   const { email } = req.body;
   console.log(email);
   const resetToken = crypto.randomBytes(32).toString('hex');

    req.session.resetToken = resetToken;

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    sendResetEmail(email, resetLink);

    res.status(200).json({ message: 'Reset link sent to email.' });
});

function sendResetEmail(email, resetLink) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '19104099@usc.edu.ph',
            pass: '08083008_Poi'
        },
        secure: true,
    })

    const mailOptions = {
        from: '19104099@usc.edu.ph',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

//HOMEPAGE POST AND GET, AND LOGOUT
app.get('/', (req, res) => {
    if(req.session.user) {
        return res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(200).json({ loggedIn: false });
    }
});
app.post('/logout', (req, res) => {
    if (req.session && req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ Message: 'Error in logging out. ' + err })
            } else {
                if (req.cookies['name']) {
                    res.clearCookie('name');
                }
                return res.status(200).json({ Message: 'Logout was Successful.', loggedIn: false });
            }
        });
    } else {
        return res.status(401).json({ Message: 'Not logged in' });
    }
});

//LOGIN POST AND GET
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const emailCheck = 'SELECT * FROM user WHERE userEmail = ?';
    
    db.query(emailCheck, [email], (checkError, checkResult) => {
        if (checkError) {
            return res.status(500).json({ Message: "Error from the server side." });
        }
        
        if (checkResult.length === 0) {
            return res.status(401).json({ errorEmailMessage: "Email not found." });
        }
        
        const user = checkResult[0];
        
        bcrypt.compare(password, user.userPassword, (err, response) => {
            if (err) {
                return res.status(401).json({ errorPasswordMessage: "Incorrect password." });
            }
            if (response) {
                req.session.user = user;
                req.session.loggedIn = true;
                return res.status(200).json({ Message: "Login successful", user: user, loggedIn: true });
            } else {
                return res.status(401).json({ errorPasswordMessage: "Incorrect password." });
            }
        });
    });
});
app.get('/login', (req, res) => {
    if(req.session.user) {
        return res.status(200).json({ loggedIn: true, user: req.session.user })
    } else {
        return res.status(200).json({ loggedIn: false, Message: 'No user is logged in.' });
    }
});

//SERVICES STUFF
app.get('/admin/services', (req, res) => {
    const query = 'SELECT * FROM genservices ORDER BY genServiceName';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', result });
    }
)});

app.post('/admin/services', upload.single('serviceImage'), (req, res) => {
    const { name, description } = req.body;
    const serviceImagePath = req.file ? req.file.path : null;
    const insertSql = 'INSERT INTO genservices (genServiceName, genServiceDesc, genServiceImageUrl) VALUES (?, ?, ?)';
    
    console.log(req.file);
    const values = [name, description, serviceImagePath];
    db.query(insertSql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        console.log(result);
        return res.status(200).json({ Message: 'Query successful', services: result });
    });
});

app.post('/admin/services/delete/:id', (req, res) => {
    const id = req.params.id;
    const deleteSql = 'DELETE FROM genservices WHERE genServicesID = ?';

    db.query(deleteSql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', services: result });
    });
});

app.post('/admin/services/:id', (req, res) => {
    const id = req.params.id;
    const featured = req.body.featured;
    const updateSql = 'UPDATE genservices SET featured = ? WHERE genServiceID = ?';
    const values = [featured, id];

    db.query(updateSql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', services: result });
    });
});

//MATERIAL STUFF
app.get('/admin/materials', (req, res) => {
    const query = 'SELECT * FROM materials ORDER BY matName';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', result });
    });
});

app.post('/admin/materials', upload.single('materialImage'), (req, res) => {
    const { name, size, count, quantity, units, color, description } = req.body;
    const materialImagePath = req.file ? req.file.path : null;
    const insertSql = 'INSERT INTO materials (matName, matSize, matCount, matQty, matUnit, matImageUrl, color, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    console.log(req.file);
    const values = [name, size, count, quantity, units, materialImagePath, color, description];
    db.query(insertSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', materials: result });
    });
});

app.post('/admin/materials/delete/:id', (req, res) => {
    const id = req.params.id;
    const deleteSql = 'DELETE FROM materials WHERE matID = ?';

    db.query(deleteSql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', materials: result });
    });
});

//SIGNUP POST AND GET
app.post('/signup', upload.single('profilePicture'), (req, res) => {
    const { email, password, userName } = req.body;
    const profilePicturePath = req.file ? req.file.path : null;

  const emailCheck = 'SELECT * FROM user WHERE userEmail = ?';

  db.query(emailCheck, [email], (checkError, checkResult) => {
      if (checkError) {
          return res.status(500).json({ Message: "Error from the server side." });
      }

      if (checkResult.length > 0) {
          return res.status(500).json({ Message: "Email already exists in the database" });
      }

      const insertSql = 'INSERT INTO user (userEmail, userPassword, userName, profilePicture) VALUES (?, ?, ?, ?)';
      
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ Message: 'Error on the server side!' });
            }
            
            const values = [email, hash, userName, profilePicturePath];
            db.query(insertSql, values, (err, insertResult) => {
                if (err) {
                    return res.status(500).json({ Message: 'Error on the server side!' });
                }
                return res.status(200).json({ Message: 'User registration successful' , user: insertResult});
            });
        });    
    });
});

app.put('/reset', (req, res) => {
    const { email, newUsername, newPassword, currPassword } = req.body;  
    const checkCurrPasswordQuery = 'SELECT * FROM user WHERE userEmail = ?';
  
    db.query(checkCurrPasswordQuery, [email], (checkError, checkResult) => {
      if (checkError) {
        return res.status(500).json({ Message: 'Error on the server side.' });
      }
  
      if (checkResult.length === 0) {
        return res.status(401).json({ Message: 'User not found.' });
      }
  
      const user = checkResult[0];
  
      bcrypt.compare(currPassword, user.userPassword, (compareErr, passwordMatch) => {
        if (compareErr) {
          return res.status(500).json({ Message: 'Error on the server side.' });
        }
  
        if (passwordMatch) {
          const updateSql = 'UPDATE user SET userName = ?, userPassword = ? WHERE userEmail = ?';
  
          bcrypt.hash(newPassword, saltRounds, (hashErr, hash) => {
            if (hashErr) {
              return res.status(500).json({ Message: 'Error on the server side.' });
            }
  
            const values = [newUsername, hash, email];
  
            db.query(updateSql, values, (updateErr, updateResult) => {
              if (updateErr) {
                return res.status(500).json({ Message: 'Error on the server side.' });
              }
  
              return res.status(200).json({ Message: 'User information updated successfully. Redirecting in 3 seconds...' });
            });
          });
        } else {
          return res.status(401).json({ passMessage: 'Wrong current password! Please input the correct current password.' });
        }
      });
    });
});

//PROFILE STUFF
app.get('/profile', (req, res) => {
    if(req.session.user) {
        const id = req.session.user.userID;
        const userCheck = 'SELECT * FROM user WHERE userID = ?';

        db.query(userCheck, id, (err, result) => {
            if(err) {
                return res.status(401).json({ Message: 'Error on the server side' });
            }
            if(result.length === 0) {
                return res.status(401).json({ Message: 'Email was not found' });
            }

            const user = result[0];

            if(user) {
                return res.status(200).json({ loggedIn: req.session.loggedIn, Message: 'User was found', user: user });
            } else {
                return res.status(401).json({ Message: 'Error on the server side' });
            }
        })
    } else {
        return res.status(401).json({ Message: 'No user is logged in.' });
    }
});

//TEST STUFF
app.get('/test', (req, res) => {
    if (req.cookies['name']) {
        console.log('Cookie with key "name" exists');
        res.send('Cookie Exists');
    } else {
        console.log('Cookie with key "name" does not exist');
    }
});
app.get('/test-sql', (req, res) => { 
    const query = 'SELECT * FROM user';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', result });
    });
});
app.get('/test-get', (req, res) => {
    const testValue = req.session.testVariable || 'No session data found';
    const loggedIn = (req.session.user.userPassword) != undefined ? req.session.user.userPassword : null;
    res.send(`Session variable value: ${testValue}, Logged In: `);
});


app.listen(5000, () => {
    console.log('Listening to port!');
});