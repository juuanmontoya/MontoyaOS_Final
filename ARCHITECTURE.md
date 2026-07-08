# MontoyaOS Architecture

## Objetivo

Definir las reglas técnicas que deben seguir todos los módulos de MontoyaOS.

---

# Arquitectura General

Cada módulo del sistema debe ser independiente.

Ejemplo:

features/
    finances/
    calendar/
    crm/
    tasks/

Cada feature encapsula toda su lógica.

---

# Estructura de un Feature

features/
└── feature-name/
    ├── api/
    ├── components/
    ├── hooks/
    ├── store/
    ├── types/
    ├── utils/
    ├── constants/
    ├── schemas/
    ├── README.md
    └── index.ts

---

# Responsabilidades

## api

Comunicación con Supabase o APIs externas.

No contiene lógica de negocio.

---

## components

Componentes exclusivos del módulo.

---

## hooks

Lógica reutilizable del módulo.

---

## store

Estado global mediante Zustand.

No debe contener llamadas directas a Supabase.

---

## types

Modelos del dominio.

---

## utils

Funciones puras.

---

## constants

Constantes del módulo.

---

## schemas

Validaciones (Zod en el futuro).

---

# Componentes Compartidos

La carpeta /components solo contendrá componentes reutilizables para toda la aplicación.

---

# Core

La carpeta /core contendrá infraestructura compartida.

Ejemplos:

- Supabase
- Providers
- Configuración
- Middlewares

---

# Flujo de Datos

UI

↓

Hook

↓

Store

↓

API

↓

Supabase

---

# Reglas

- No duplicar código.
- No importar un feature desde otro feature.
- Mantener responsabilidades separadas.
- Todo sprint debe terminar funcionando en producción.