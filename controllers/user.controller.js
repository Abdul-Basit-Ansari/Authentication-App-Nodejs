import userModel from  '../config/database.js'
import { stringToHash, varifyHash } from "bcrypt-inzi"
  
  export const getAllUsers =  (req, res)  => {
    let allUser = userModel.find({}, (err, users) => {
      if (err) {
        res.send(err);
      } else {
        res.send(users);
      }
    })};
  
  export const getUserById = (req, res) => {
    const user = userModel.findOne({id : req.body.id},(err , data)=>{
    if (data) {
      res.send(data);
    } else {
      res.status(404).json({ message: 'User not found' });
    }})
  };
  
export const createUser = (req, res) => {
  let body = req.body;
  if (!body.firstName
    || !body.lastName
    || !body.email
    || !body.password
) {
    res.status(400).send(
        `required fields missing, request example: 
            {
                "firstName": "John",
                "lastName": "Doe",
                "email": "abc@abc.com",
                "password": "12345"
            }`
    );
    return;
}

// check if user already exist // query email user
userModel.findOne({ email: body.email }, (err, data) => {
    if (!err) {

        if (data) { // user already exist
            console.log("user already exist: ", data);
            res.status(400).send({ message: "user already exist. please try a different email" });
            return;

        } else { // user not already exist

            stringToHash(body.password).then(hashString => {

                userModel.create({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email.toLowerCase(),
                    password: hashString
                },
                    (err, result) => {
                        if (!err) {
                            console.log("data saved: ", result);
                            res.status(201).send({ message: "user is created" });
                        } else {
                            console.log("db error: ", err);
                            res.status(500).send({ message: "internal server error" });
                        }
                    });
            })

        }
    } else {
        console.log("db error: ", err);
        res.status(500).send({ message: "db error in query" });
        return;
    }
})
};

  export const updateUser = (req, res) => {
    console.log('req.params.id', req.params.id)
    let body = req.body
      const result = userModel.findOneAndUpdate({id : req.params.id}, {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email.toLowerCase(),
        password: body.password,
      },{new:true},(err,data)=>{
        if (err) {
          console.log(err)
          res.status(500).send({
            message: "db error"
          })
        }
        else{

          console.log(data)
          
          res.send(data);
          return;
        }
        }
          );
}
    
  export const deleteUser = (req, res) => {
    const index = userModel.findOneAndDelete({id : req.body.id}, (err, user) => {
      if (err) {
        console.error(err);
      } else if (!user) {
        res.send('No user found');
      } else {
        res.send('User deleted successfully:', user);
      }
    });
  };
  
  


  