function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobileNumber = document.getElementById("mobile-number").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Check for empty fields
    if (!name || !email || !mobileNumber || !subject || !message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill out all fields.',
        });
        return false; // Prevent form submission
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return false; // Prevent form submission
    }
    
    // Mobile number validation
    const mobilePattern = /^[0-9]{10}$/; // 10-digit mobile number
    if (!mobilePattern.test(mobileNumber)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Mobile Number',
            text: 'Please enter a valid 10-digit mobile number containing only numbers.',
        });
        return false; // Prevent form submission
    }

    sendMail(); // Only call sendMail if validations pass
    return false; // Prevent default form submission
}

function sendMail() {
    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile_number: document.getElementById("mobile-number").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_60wjyoj", "template_n90jpsl", params)
        .then(function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Message Sent!',
            });
            // Clear the form after success
            document.getElementById('contact-form').reset(); 
        }, function(error) {
            console.log("FAILED...", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Message Failed to Send',
            });
        });
}
