<?php
header("Access-Control-Allow-Origin: https://mystybutterfly.github.io/staff-manage");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Database configuration
$host = 'localhost'; 
$port = '3306';
$db = 'peopledb'; 
$user = 'root'; 
$pass = ''; 

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check for DELETE request
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents("php://input"), $post_vars);
        $id = isset($post_vars['id']) ? (int)$post_vars['id'] : 0;

        if ($id > 0) {
            $stmt = $pdo->prepare("DELETE FROM People WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                http_response_code(204); // No Content
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to delete the record."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid ID provided."]);
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(["error" => "Method not allowed."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
