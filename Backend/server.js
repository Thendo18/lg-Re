// Constants
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const auth = require('./Authentication/authentication');



const app = express();
const HOST = "0.0.0.0"
const PORT = process.env.PORT || 4310; 

const corsOptions = {origin: '*'}



app.use(cors(corsOptions))
app.use(express.json());   // to support JSON-encoded 
app.use(express.urlencoded());   // to support JSON-encoded 
app.use( cors({origin: true, credentials: true}) )


app.get('/', (req,res)=>{
    res.send("App backend running");
});

app.use('/user', userRoute);
app.use('/auth', authRoute);


app.use((err,req,res)=>{
    console.log(err);
})

app.listen(PORT, HOST, ()=>{
    console.log('server is listening to port ', PORT);
})
//


