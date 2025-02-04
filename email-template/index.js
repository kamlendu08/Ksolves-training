require("dotenv").config();
const express = require('express');
const ejs = require('ejs');
const nodemainler = require('nodemailer');
const path = require('path');
const { copyFileSync } = require("fs");
const app = express();
app.set("view engine","ejs");
app.set("views", )


const renderTemp =async (tempname, data) => {
    const tempPath = path.join(__dirname, "views", tempname);
    return await ejs.renderFile(tempPath,data);
}


const sendEmai = async(to, subject, htmlContent) => {
    const tranporter = nodemainler.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email,
            pass: process.env.password,
        },
    });

    const mailOptions = {
        from: process.env.email,
        to: to,
        subject: subject,
        html: htmlContent
    };

    try{
        await tranporter.sendMail(mailOptions);
    }catch(e){
        console.error("error sending mail:", e)
    }
}

app.use(express.json());

app.post('/sendmail',async (req,res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const name = req.body.name;
     const udata = {
        name: name,
        verificationLink: "https://www.ksolves.com/"
     }
    const htmlc = await renderTemp("template1.ejs", udata);
    await sendEmai(to, subject, htmlc);
    res.json({res:"check"})
})

app.listen(3001,()=>{console.log("server connected")})