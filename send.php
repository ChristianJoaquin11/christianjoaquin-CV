<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Recipient email
    $to = "christianjoaquin03@gmail.com";

    // Email subject
    $email_subject = "New Contact Form Message: $subject";

    // Email body
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success
        echo "<script>alert('Thank you! Your message has been sent.'); window.location.href='index.html#contact';</script>";
    } else {
        // Failure
        echo "<script>alert('Oops! Something went wrong. Please try again.'); window.location.href='index.html#contact';</script>";
    }
} else {
    // Invalid request
    header("Location: index.html#contact");
    exit;
}
?>