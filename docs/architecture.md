# 🏗️ MontoyaOS Architecture

## Visión

MontoyaOS es un Sistema Operativo Personal construido de forma modular.

Cada módulo debe poder evolucionar independientemente sin afectar el resto del sistema.

La prioridad siempre será:

- Escalabilidad
- Reutilización
- Simplicidad
- Bajo acoplamiento

---

# Estructura del proyecto

/app
    Dashboard
    Finanzas
    Calendario
    ...

/components

/components/ui

Componentes reutilizables para toda la aplicación.

Ejemplos:

AppCard

ModuleCard

StatusBadge

SectionTitle

EmptyState

Sheet

Button

Input

...

Nunca deben contener lógica de negocio.

---

/components/dashboard

Componentes exclusivos del Home Dashboard.

Nunca deben reutilizarse en otros módulos.

---

/components/finance

Componentes exclusivos del módulo Finanzas.

---

/core

Motores de negocio.

Ejemplos:

finance-engine

calendar-engine

task-engine

ai-engine

Cada engine contiene únicamente lógica.

Nunca componentes React.

---

/services

Comunicación con APIs.

Supabase

OpenAI

Firebase

REST APIs

Nunca lógica visual.

---

/store

Estado global mediante Zustand.

Un store por dominio.

Ejemplo:

finance-store

calendar-store

task-store

Nunca crear un store gigante.

---

/types

Tipos compartidos.

Nunca duplicar interfaces.

---

/data

Información estática.

Ejemplo:

modules.ts

No contiene lógica.

---

/docs

Documentación oficial del proyecto.

Todo cambio importante debe quedar documentado.

---

# Single Source of Truth

Cada información debe existir en un solo lugar.

Ejemplo:

modules.ts

Es la única fuente oficial para:

Sidebar

Dashboard

Buscador

IA

Permisos

Favoritos

---

# Motores (Engines)

Toda lógica compleja vive en un Engine.

Ejemplo:

finance-engine

calculateHealth()

generateInsights()

getSummary()

Los componentes nunca deben contener lógica financiera.

---

# Componentes

Si un patrón visual se usa tres veces:

➡️ pasa al Design System.

Nunca copiar Tailwind varias veces.

---

# Diseño

Todo componente nuevo debe respetar:

design-system.md

---

# Convenciones

Componentes:

PascalCase

HeroSection

FinanceWidget

ModuleCard

Archivos de datos:

kebab-case

modules.ts

dashboard-data.ts

Stores:

feature-store.ts

finance-store.ts

Engines:

feature-engine

finance-engine

calendar-engine

---

# Filosofía

Los módulos deben sentirse independientes.

El Dashboard solamente consume información.

Nunca conoce la implementación interna de cada módulo.

---

# Objetivo

Que dentro de varios años MontoyaOS pueda tener decenas de módulos sin necesidad de reorganizar la arquitectura.