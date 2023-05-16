import jwt  from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  const SECRET = process.env.SECRET || "topsecret";
  console.log("req.header: ", req.cookies);

  if (!req.cookies.Token) {
      res.status(401).send({
          message: "include http-only credentials with every request"
      })
      return;
  }
  jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
      if (!err) {

          console.log("decodedData: ", decodedData);

          const nowDate = new Date().getTime() / 1000;

          if (decodedData.exp < nowDate) {
              res.status(401).send("token expired")
          } else {

              console.log("token approved");

              req.cookies.Token = decodedData
              next();
          }
      } else {
          res.status(401).send("invalid token")
      }
  });
}

export default authenticate