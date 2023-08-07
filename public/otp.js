// // Declare a variable to store the generated OTP
// let generatedOTP = '';

// // Function to generate OTP
// function generateOTP() {
//     const digits = '0123456789';
//     let otp = '';
//     for (let i = 0; i < 6; i++) {
//         otp += digits[Math.floor(Math.random() * 10)];
//     }
//     return otp;
// }

// // Function to send OTP
// function sendOTP() {
//     const phoneNumber = document.getElementById('phoneNumber').value;
    
//     // Generate a new OTP and store it
//     generatedOTP = generateOTP();
    
//     // Display the generated OTP (for testing purposes)
//     alert(`Generated OTP: ${generatedOTP}`);
    
//     // Here you would send the OTP to the user's phone number using AWS SNS or your preferred method
//     // Replace this alert with your actual sending logic
//     alert('OTP sent successfully! Check your phone.');
// }

// // Function to verify OTP
// function verifyOTP() {
//     const userOTP = document.getElementById('userOTP').value;

//     if (userOTP === generatedOTP) {
//         alert('OTP verification successful!');
//     } else {
//         alert('Incorrect OTP. Please try again.');
//     }
// }
// -------==================new code================================---------------------------------//
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


//==========================================================code is wrong===============================//
// let generatedOTP = ''; // Declare the variable in the global scope

// function generateOTP() {
//     const digits = '0123456789';
//     let otp = '';
//     for (let i = 0; i < 6; i++) {
//         otp += digits[Math.floor(Math.random() * 10)];
//     }
//     generatedOTP = otp; // Assign the generated OTP to the global variable
//     return otp;
// }

// function sendOTP() {
//     const phoneNumber = document.getElementById('phoneNumber').value;

//     const otp = generateOTP(); // Generate and store OTP

//     // Your code for sending OTP to the user's phone
//     alert('OTP sent successfully! Check your phone.');
// }

// function verifyOTP() {
//     const userOTP = document.getElementById('userOTP').value;

//     if (userOTP === generatedOTP) {
//         alert('OTP verification successful!');
//     } else {
//         alert('Incorrect OTP. Please try again.');
//     }
// }

// // Event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     const sendOTPButton = document.getElementById('sendOTP');
//     const verifyOTPButton = document.getElementById('verifyOTP');

//     sendOTPButton.addEventListener('click', sendOTP);
//     verifyOTPButton.addEventListener('click', verifyOTP);
// });










// document.addEventListener('DOMContentLoaded', () => {
//   const sendOTPButton = document.getElementById('sendOTP');
//   const verifyOTPButton = document.getElementById('verifyOTP');
  
//   let generatedOTP = ''; // Declare the variable in this scope

//   sendOTPButton.addEventListener('click', async () => {
//       const phoneNumber = document.getElementById('phoneNumber').value;
      
//       try {
//           const response = await fetch('/sendOTP', {
//               method: 'POST',
//               body: JSON.stringify({ phoneNumber }),
//               headers: { 'Content-Type': 'application/json' }
//           });

//           const data = await response.json();
//           if (response.ok) {
//               console.log(data.message);
//               generatedOTP = data.generatedOTP; // Store the generated OTP
//               alert('OTP sent successfully! Check your phone.');
//           } else {
//               console.error(data.message);
//               alert('Error sending OTP. Please try again.');
//           }
//       } catch (error) {
//           console.error('Error sending OTP:', error);
//           alert('Error sending OTP. Please try again.');
//       }
//   });

//   verifyOTPButton.addEventListener('click', async () => {
//       const userOTP = document.getElementById('verificationCode').value;

//       if (!generatedOTP) {
//           alert('Please generate OTP first.'); // Handle case where OTP is not generated yet
//           return;
//       }

//       try {
//           const response = await fetch('/verifyOTP', {
//               method: 'POST',
//               body: JSON.stringify({ userOTP, generatedOTP }),
//               headers: { 'Content-Type': 'application/json' }
//           });

//           const data = await response.json();
//           if (response.ok) {
//               console.log(data.message);
//               alert('OTP verification successful!');
//           } else {
//               console.error(data.message);
//               alert('Invalid OTP. Please try again.');
//           }
//       } catch (error) {
//           console.error('Error verifying OTP:', error);
//           alert('Error verifying OTP. Please try again.');
//       }
//   });
// });
