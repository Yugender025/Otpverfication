require('dotenv').config(); // Load environment variables
const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const path = require('path');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// Configure AWS credentials
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' // Replace with your AWS region
});

const sns = new AWS.SNS();

// ... (rest of the server-side code)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/sendOTP', async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const otp = generateOTP();
        const otpMessage = `Your OTP is: ${otp}`;
        const params = {
            Message: otpMessage,
            PhoneNumber: phoneNumber
        };

        const data = await sns.publish(params).promise();
        console.log('OTP sent successfully:', data);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

app.post('/verifyOTP', (req, res) => {
    const { userOTP, generatedOTP } = req.body;

    if (userOTP === generatedOTP) {
        res.status(200).json({ message: 'OTP verification successful' });
    } else {
        res.status(401).json({ message: 'Invalid OTP' });
    }
});
function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    console.log('Generated OTP:', otp);
    return otp;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});