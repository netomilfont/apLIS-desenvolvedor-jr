<?php

require_once __DIR__ . '/../models/MedicoModel.php';
require_once __DIR__ . '/../config/Messages.php';

class MedicoController
{
    private MedicoModel $model;

    public function __construct()
    {
        $this->model = new MedicoModel();
    }

    public function index(): void
    {
        echo json_encode($this->model->getAll());
    }

    public function show(int $id): void
    {
        $msg    = Messages::get();
        $medico = $this->model->getById($id);

        if (!$medico) {
            http_response_code(404);
            echo json_encode(["error" => $msg['notFound']]);
            return;
        }

        echo json_encode($medico);
    }

    public function store(): void
    {
        $msg  = Messages::get();
        $body = json_decode(file_get_contents("php://input"), true);

        if (empty($body['nome']) || empty($body['CRM']) || empty($body['UFCRM'])) {
            http_response_code(422);
            echo json_encode(["error" => $msg['required']]);
            return;
        }

        if ($this->model->create($body)) {
            http_response_code(201);
            echo json_encode(["message" => $msg['created']]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $msg['serverErr']]);
        }
    }

    public function update(int $id): void
    {
        $msg    = Messages::get();
        $body   = json_decode(file_get_contents("php://input"), true);
        $medico = $this->model->getById($id);

        if (!$medico) {
            http_response_code(404);
            echo json_encode(["error" => $msg['notFound']]);
            return;
        }

        if (empty($body['nome']) || empty($body['CRM']) || empty($body['UFCRM'])) {
            http_response_code(422);
            echo json_encode(["error" => $msg['required']]);
            return;
        }

        if ($this->model->update($id, $body)) {
            echo json_encode(["message" => $msg['updated']]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $msg['serverErr']]);
        }
    }

    public function destroy(int $id): void
    {
        $msg    = Messages::get();
        $medico = $this->model->getById($id);

        if (!$medico) {
            http_response_code(404);
            echo json_encode(["error" => $msg['notFound']]);
            return;
        }

        if ($this->model->delete($id)) {
            echo json_encode(["message" => $msg['deleted']]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $msg['serverErr']]);
        }
    }
}