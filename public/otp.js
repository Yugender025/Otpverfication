document.addEventListener('DOMContentLoaded', () => {
    const sendOTPButton = document.getElementById('sendOTP');
    const verifyOTPButton = document.getElementById('verifyOTP');

    sendOTPButton.addEventListener('click', async () => {
        const phoneNumber = document.getElementById('phoneNumber').value;
        
        try {
            const response = await fetch('/sendOTP', {
                method: 'POST',
                body: JSON.stringify({ phoneNumber }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('OTP sent successfully! Check your phone.');
            } else {
                console.error(data.message);
                alert('Error sending OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP. Please try again.');
        }
    });

    verifyOTPButton.addEventListener('click', async () => {
        const userOTP = document.getElementById('verificationCode').value;

        try {
            const response = await fetch('/verifyOTP', {
                method: 'POST',
                body: JSON.stringify({ userOTP, generatedOTP }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                alert('OTP verification successful!');
            } else {
                console.error(data.message);
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Error verifying OTP. Please try again.');
        }
    });
});
