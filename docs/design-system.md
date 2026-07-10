# 🚀 MontoyaOS Design System v1

## Filosofía

MontoyaOS no es una aplicación CRUD.

Es un Sistema Operativo Personal.

Debe transmitir:

- claridad
- organización
- productividad
- inteligencia
- tranquilidad

La inspiración visual proviene de:

- Linear
- Raycast
- Arc Browser
- Vercel
- Notion

---

# Border Radius

Todas las tarjetas

rounded-2xl

Botones

rounded-xl

Badges

rounded-full

---

# Sombras

Base

shadow-sm

Hover

shadow-lg

Nunca usar sombras exageradas.

---

# Espaciado

Siempre múltiplos de:

4
8
12
16
24
32

---

# Tarjetas

Toda tarjeta utiliza:

<AppCard>

Nunca repetir clases.

---

# Tipografía

Título principal

text-5xl
font-bold

Título sección

text-2xl
font-semibold

Título tarjeta

text-lg
font-semibold

Texto

text-muted-foreground

---

# Colores

Fondo

bg-background

Tarjeta

bg-card

Borde

border-border

Texto secundario

text-muted-foreground

Color principal

primary

---

# Animaciones

transition-all

duration-300

Hover:

hover:-translate-y-1

hover:shadow-lg

---

# Iconografía

Siempre Lucide Icons.

Nunca mezclar librerías.

---

# Componentes Base

AppCard

StatusBadge

SectionTitle

EmptyState

ModuleButton

StatPill

KpiCard

---

# Arquitectura

app/

components/

core/

services/

store/

types/

docs/

---

# Regla Principal

Si un patrón visual se repite tres veces,
se convierte en componente reutilizable.