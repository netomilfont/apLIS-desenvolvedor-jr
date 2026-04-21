<?php

require_once __DIR__ . '/../models/MedicoModel.php';

class MedicoController
{
    private MedicoModel $model;

    public function __construct()
    {
        $this->model = new MedicoModel();
    }

    public function index(): void
    {
        $medicos = $this->model->getAll();
        echo json_encode($medicos);
    }

    public function store(): void
    {
        $body = json_decode(file_get_contents("php://input"), true);

        if (empty($body['nome']) || empty($body['CRM']) || empty($body['UFCRM'])) {
            http_response_code(422);
            echo json_encode(["error" => "Campos nome, CRM e UFCRM são obrigatórios"]);
            return;
        }

        if ($this->model->create($body)) {
            http_response_code(201);
            echo json_encode(["message" => "Médico criado com sucesso"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar médico"]);
        }
    }
}