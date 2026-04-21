<?php

require_once __DIR__ . '/../controllers/MedicoController.php';

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$controller = new MedicoController();

// Rota com ID: /api/v1/medicos/123
if (preg_match('#^/api/v1/medicos/(\d+)$#', $uri, $matches)) {
    $id = (int) $matches[1];

    if ($method === 'GET')    $controller->show($id);
    elseif ($method === 'PUT')    $controller->update($id);
    elseif ($method === 'DELETE') $controller->destroy($id);
    else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido"]);
    }

// Rota base: /api/v1/medicos
} elseif ($uri === '/api/v1/medicos') {
    if ($method === 'GET')  $controller->index();
    elseif ($method === 'POST') $controller->store();
    else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido"]);
    }

} else {
    http_response_code(404);
    echo json_encode(["error" => "Rota não encontrada"]);
}