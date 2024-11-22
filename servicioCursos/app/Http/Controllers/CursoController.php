<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;

//loggs
use Illuminate\Support\Facades\Log;
//rabbitmq
use App\Services\RabbitMQService;
//jwt
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CursoController extends Controller
{
    protected $rabbitMQ;
    public function __construct(RabbitMQService $rabbitMQ)
    {
        $this->rabbitMQ = $rabbitMQ;
    }

    private function getAuthenticateUser(Request $request){
        $usuario = $request->attributes->get('usuario');
        if($usuario){
            return [
                'userId' => $usuario->userId,
                'username' => $usuario->username,
                'email' => $usuario->email

            ];
        }
        Log::warning('Usuario no autenticado');
        return null;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cursos = Curso::all();
        return response()->json($cursos, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $curso = Curso::create($request->all());
        return response()->json('Curso creado con exito', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $curso = Curso::find($id);
        if($curso){
            return response()->json($curso, 200);
        }else{
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $curso = Curso::find($id);
        if($curso){
            $curso->update($request->all());
            return response()->json('Curso actualizado correctamente', 200);
        }else{
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $curso = Curso::find($id);
        if($curso){
            $curso->delete();
            return response()->json('Curso eliminado correctamente', 200);
        }else{
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }
    }
}
