<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Curso;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //creando cursos de prueba para la base de datos
        $cursos = [
            [
            'nombre' => 'Laravel',
            'descripcion' => 'Curso de Laravel',
            'categoria' => 'Desarrollo Web',
            'precio' => 40,
            ],
            [
            'nombre' => 'Vue',
            'descripcion' => 'Curso de Vue',
            'categoria' => 'Desarrollo Web',
            'precio' => 30,
            ],
            [
            'nombre' => 'React',
            'descripcion' => 'Curso de React',
            'categoria' => 'Desarrollo Web',
            'precio' => 20,
            ],
            [
            'nombre' => 'Angular',
            'descripcion' => 'Curso de Angular',
            'categoria' => 'Desarrollo Web',
            'precio' => 10,
            ],
            [
            'nombre' => 'Node',
            'descripcion' => 'Curso de Node',
            'categoria' => 'Desarrollo Web',
            'precio' => 50,
            ],
            [
            'nombre' => 'MongoDB',
            'descripcion' => 'Curso de MongoDB',
            'categoria' => 'Base de Datos',
            'precio' => 60,
            ],
            [
            'nombre' => 'MySQL',
            'descripcion' => 'Curso de MySQL',
            'categoria' => 'Base de Datos',
            'precio' => 70,
            ],
            [
            'nombre' => 'PostgreSQL',
            'descripcion' => 'Curso de PostgreSQL',
            'categoria' => 'Base de Datos',
            'precio' => 80,
            ],
            [
                'nombre' => 'Flutter',
                'descripcion' => 'Curso de Flutter',
                'categoria' => 'Desarrollo Movil',
                'precio' => 90,
            ],
            [
                'nombre' => 'Swift',
                'descripcion' => 'Curso de Swift',
                'categoria' => 'Desarrollo Movil',
                'precio' => 100,
            ]
            ];

        foreach ($cursos as $curso) {
            Curso::create($curso);
        }

    
    }
}
