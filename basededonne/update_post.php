<?php
include 'db.php';


echo ' debut updae post' ;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $slug = $_POST['slug'];
    $content = $_POST['content'];
    $category = $_POST['category'];
    $featuredImage = $_FILES['image']['name'];

    if ($featuredImage) {
        // Upload the image
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

        $sql = "UPDATE posts SET title = ?, slug = ?, content = ?, category = ?, featuredImage = ? WHERE id = ?";
        $stmt= $conn->prepare($sql);
        $stmt->execute([$title, $slug, $content, $category, $featuredImage, $id]);
    } else {
        $sql = "UPDATE posts SET title = ?, slug = ?, content = ?, category = ? WHERE id = ?";
        $stmt= $conn->prepare($sql);
        $stmt->execute([$title, $slug, $content, $category, $id]);
    }

    echo "Post updated successfully";
}
?>
