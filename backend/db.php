<?php
$host = "localhost";
$db = "notes_app";
$user = "";
$pass = "";

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    } else {
        $conn->set_charset("utf8mb4");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
