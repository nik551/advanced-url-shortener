const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.get("/auth/google", (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
  res.redirect(url);
});
app.get('/auth/google/callback' , (req , res)=>{

   res.send('hello from simple server :)')

})
