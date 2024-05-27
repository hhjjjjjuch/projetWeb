<?php
// Set content type to JSON
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bloger";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Return error response
    echo json_encode(array("error" => "Connection failed: " . $conn->connect_error));
    // Stop script execution
    exit();
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize form inputs (you should perform more robust validation in a real-world application)
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // SQL to insert data into users table
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    // Execute SQL query
    if ($conn->query($sql) === TRUE) {
        // Return success response
        echo json_encode(array("success" => "New record inserted successfully"));
    } else {
        // Return error response
        echo json_encode(array("error" => "Error inserting record: " . $conn->error));
    }
}

// Close connection
$conn->close();
?>
