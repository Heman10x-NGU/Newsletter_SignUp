const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/2796dc3159";

  const options = {
    method: "POST",
    auth: "hemant1:110bd9cd0190ae64d1ed4805c07a99cb-us5",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (dataa) {
      console.log(JSON.parse(dataa));
    });
  });

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);
});

app.post("/failure/html",function(res,req){
  res.redirect("/");
})
app.listen(process.env.PORT||3000, function () {
  console.log("Server is Up and running");
});

//API KEY
//110bd9cd0190ae64d1ed4805c07a99cb-us5

//Unique Id
//2796dc3159
