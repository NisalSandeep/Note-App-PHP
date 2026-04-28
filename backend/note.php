<?php
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)($_GET['id']) : null;


function readJsonBody(): array
{
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

function sendValidationError(string $message): void
{
    http_response_code(400);
    echo json_encode(['error' => $message]);
    exit;
}

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare('SELECT id, title, content FROM notes WHERE id = ?');
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                echo json_encode($result->fetch_assoc());
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Note not found']);
            }
            $stmt->close();
        } else {
            $sql = 'SELECT id, title, content FROM notes ORDER BY id DESC';
            $result = $conn->query($sql);
            $notes = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $notes[] = $row;
                }
            }
            echo json_encode($notes);
        }
        break;

    case 'POST':
        $data = readJsonBody();
        $title = trim($data['title'] ?? '');
        $content = trim($data['content'] ?? '');

        if ($title === '' || $content === '') {
            sendValidationError('Title and content are required');
        }

        $stmt = $conn->prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
        $stmt->bind_param('ss', $title, $content);
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Note created successfully', 'id' => $conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create note: ' . $conn->error]);
        }
        $stmt->close();
        break;
    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Note ID is required']);
            exit;
        }
        $data = readJsonBody();
        $title = trim($data['title'] ?? '');
        $content = trim($data['content'] ?? '');

        if ($title === '' || $content === '') {
            sendValidationError('Title and content are required');
        }

        $stmt = $conn->prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?');
        $stmt->bind_param('ssi', $title, $content, $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Note updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update note: ' . $conn->error]);
        }
        $stmt->close();
        break;
    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Note ID is required']);
            exit;
        }
        $stmt = $conn->prepare('DELETE FROM notes WHERE id = ?');
        $stmt->bind_param('i', $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Note deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete note: ' . $conn->error]);
        }
        $stmt->close();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
