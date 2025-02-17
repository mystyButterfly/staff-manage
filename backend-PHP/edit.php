<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204); // No Content
    exit;
}

// Database configuration
$host = 'infinityfree.com'; // Your database host
$port = '007';
$db = 'people_db'; // Your database name
$user = 'username'; // Your database username
$pass = 'password'; // Your database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['id'], $data['name'], $data['age'], $data['occupation'], $data['city'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    exit;
}

$id = $data['id']; // Unique ID of the person to be updated
$name = $data['name'];
$age = $data['age'];
$occupation = $data['occupation'];
$city = $data['city'];

// Prepare and bind
$stmt = $conn->prepare("UPDATE People SET name = ?, age = ?, occupation = ?, city = ? WHERE id = ?");
$stmt->bind_param("sissi", $name, $age, $occupation, $city, $id);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Person updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No records updated. Check if the ID exists."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
