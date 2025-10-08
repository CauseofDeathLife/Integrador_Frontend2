const attendances = [
  {
    id: 1,
    estudiante_id: 1,
    estudiante_nombre: "Alan Brito",
    grado: "10°",
    asignatura: "matematicas",
    asignatura_label: "Matemáticas",
    docente: "Prof. María González",
    fecha: "2024-03-15",
    hora: "08:00",
    estado: "presente",
    observaciones: "",
    registrado_por: "Admin Sistema",
    historial: [
      { fecha: "2024-03-14", estado: "presente", asignatura: "Matemáticas" },
      { fecha: "2024-03-13", estado: "presente", asignatura: "Matemáticas" },
      { fecha: "2024-03-12", estado: "tardanza", asignatura: "Matemáticas" },
      { fecha: "2024-03-11", estado: "presente", asignatura: "Matemáticas" },
      { fecha: "2024-03-08", estado: "ausente", asignatura: "Matemáticas" }
    ]
  },
  {
    id: 2,
    estudiante_id: 2,
    estudiante_nombre: "Zoyla Vaca",
    grado: "11°",
    asignatura: "matematicas",
    asignatura_label: "Matemáticas",
    docente: "Prof. María González",
    fecha: "2024-03-15",
    hora: "08:15",
    estado: "tardanza",
    observaciones: "Llegó 15 minutos tarde",
    registrado_por: "Admin Sistema",
    historial: [
      { fecha: "2024-03-14", estado: "presente", asignatura: "Matemáticas" },
      { fecha: "2024-03-13", estado: "justificado", asignatura: "Matemáticas" },
      { fecha: "2024-03-12", estado: "presente", asignatura: "Matemáticas" },
      { fecha: "2024-03-11", estado: "presente", asignatura: "Matemáticas" },
      { fecha: "2024-03-08", estado: "tardanza", asignatura: "Matemáticas" }
    ]
  },
  {
    id: 3,
    estudiante_id: 1,
    estudiante_nombre: "Alan Brito",
    grado: "10°",
    asignatura: "lenguaje",
    asignatura_label: "Lenguaje",
    docente: "Prof. Carlos Rodríguez",
    fecha: "2024-03-16",
    hora: "10:00",
    estado: "ausente",
    observaciones: "Enfermedad - Se presentó certificado médico",
    registrado_por: "Admin Sistema",
    historial: [
      { fecha: "2024-03-15", estado: "presente", asignatura: "Lenguaje" },
      { fecha: "2024-03-14", estado: "presente", asignatura: "Lenguaje" },
      { fecha: "2024-03-13", estado: "presente", asignatura: "Lenguaje" },
      { fecha: "2024-03-12", estado: "ausente", asignatura: "Lenguaje" },
      { fecha: "2024-03-11", estado: "presente", asignatura: "Lenguaje" }
    ]
  },
  {
    id: 4,
    estudiante_id: 2,
    estudiante_nombre: "Zoyla Vaca",
    grado: "11°",
    asignatura: "ciencias",
    asignatura_label: "Ciencias",
    docente: "Prof. Ana Martínez",
    fecha: "2024-03-17",
    hora: "09:00",
    estado: "justificado",
    observaciones: "Cita médica programada - Justificación aprobada",
    registrado_por: "Admin Sistema",
    historial: [
      { fecha: "2024-03-16", estado: "presente", asignatura: "Ciencias" },
      { fecha: "2024-03-15", estado: "presente", asignatura: "Ciencias" },
      { fecha: "2024-03-14", estado: "justificado", asignatura: "Ciencias" },
      { fecha: "2024-03-13", estado: "presente", asignatura: "Ciencias" },
      { fecha: "2024-03-12", estado: "presente", asignatura: "Ciencias" }
    ]
  },
  {
    id: 5,
    estudiante_id: 3,
    estudiante_nombre: "Daniel Quintero",
    grado: "11°",
    asignatura: "ciencias",
    asignatura_label: "Ciencias",
    docente: "Prof. Ana Martínez",
    fecha: "2024-03-17",
    hora: "09:00",
    estado: "justificado",
    observaciones: "Cita médica programada - Justificación aprobada",
    registrado_por: "Admin Sistema",
    historial: [
      { fecha: "2024-03-16", estado: "presente", asignatura: "Ciencias" },
      { fecha: "2024-03-15", estado: "presente", asignatura: "Ciencias" },
      { fecha: "2024-03-14", estado: "justificado", asignatura: "Ciencias" },
      { fecha: "2024-03-13", estado: "presente", asignatura: "Ciencias" },
      { fecha: "2024-03-12", estado: "presente", asignatura: "Ciencias" }
    ]
  }
]

export default attendances
