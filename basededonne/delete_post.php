<?php
include 'db.php';
echo 'debut delete post ' ;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM posts WHERE id = ?";
    $stmt= $conn->prepare($sql);
    $stmt->execute([$id]);

    echo "Post deleted successfully";
}
?>
