<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bloger";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, user_id, title, content, category, created_at FROM posts";
$result = $conn->query($sql);

$posts = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($posts);
?>
