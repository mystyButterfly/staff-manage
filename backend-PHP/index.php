<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Accept: text/html,application/json, application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true"); 
header("Vary: Origin");


// Database configuration
$host = 'infinityfree.com'; // Your database host
$port = '007';
$db = 'people_db'; // Your database name
$user = 'username'; // Your database username
$pass = 'password'; // Your database password

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the SQL query
    $stmt = $pdo->prepare("SELECT * FROM People");
    $stmt->execute();

    // Fetch all results as an associative array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the results as JSON
    echo json_encode($results);
} catch (PDOException $e) {
    // Handle any errors
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
