<?php
// Set CORS headers to allow requests from different origins (adjust the allowed origin as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

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
    echo json_encode(array("error" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Get the raw POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Check if the form is submitted and required fields are present
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['name']) && isset($data['email']) && isset($data['password'])) {
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $password = $conn->real_escape_string($data['password']);

    // SQL to insert data into users table
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    // Execute SQL query
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true, "user" => array("name" => $name, "email" => $email)));
    } else {
        echo json_encode(array("error" => "Error inserting record: " . $conn->error));
    }
} else {
    echo json_encode(array("error" => "Invalid input"));
}

// Close connection
$conn->close();
?>
