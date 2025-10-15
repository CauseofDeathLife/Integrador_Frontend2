export const SEED_ATTENDANCES = [
  {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    estudianteNombre: 'Juan Pérez',
    grado: '10°',
    asignatura: 'matematicas',
    asignaturaLabel: 'Matemáticas',
    fechaISO: new Date().toISOString().slice(0,10),
    hora: new Date().toTimeString().slice(0,5),
    estado: 'presente',
    observaciones: 'Llegó a tiempo',
    creadoPor: 'maestro',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()+1),
    estudianteNombre: 'María Gómez',
    grado: '10°',
    asignatura: 'lenguaje',
    asignaturaLabel: 'Lenguaje',
    fechaISO: new Date().toISOString().slice(0,10),
    hora: new Date().toTimeString().slice(0,5),
    estado: 'tardanza',
    observaciones: '5 min tarde',
    creadoPor: 'maestro',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
]

export const SEED_USERS = [
  { id: 1, username: 'maestro',  name:'Profe',     password: '123456', role: 'maestro' },
  { id: 2, username: 'alumno1',  name:'Alumno Uno',password: '123456', role: 'alumno'  },
  { id: 3, username: 'familiar1',name:'Familiar',  password: '123456', role: 'familiar'},
]
