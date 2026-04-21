<?php

require_once __DIR__ . '/../controllers/MedicoController.php';

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/v1/medicos') {
    $controller = new MedicoController();

    if ($method === 'GET') {
        $controller->index();
    } elseif ($method === 'POST') {
        $controller->store();
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Rota não encontrada"]);
}