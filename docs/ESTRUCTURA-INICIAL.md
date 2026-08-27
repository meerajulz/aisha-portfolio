# Estructura inicial de la web

> **¿Prefieres verlo en el navegador mientras construyes?** Abre
> `tuweb.com/guia` (en local, `localhost:3000/guia`). Es esta misma guía, campo
> por campo, pensada para tenerla en una pestaña al lado del Studio.

Las siete páginas que hay que crear en el Studio, con los bloques que lleva
cada una. Créalas en este orden.

| Página | Dirección | Bloques |
|---|---|---|
| **Inicio** | (marcar *Es la página de inicio*) | Portada · Trabajos destacados · Clases · Formulario de contacto |
| **Sobre mí** | `sobre-mi` | Texto · Galería de imágenes |
| **Performances** | `performances` | Texto (corto) · Galería de imágenes |
| **Teatro** | `teatro` | Texto · Galería · Texto · Galería *(tantas como quieras)* |
| **Workshops** | `workshops` | Workshops · Formulario de contacto |
| **Tienda** | `tienda` | Próximamente |
| **Contacto** | `contacto` | Texto · Formulario de contacto *(con selector de clase)* |

## Paso a paso, campo por campo

Para cada página: créala en **Páginas**, pon el título, genera la dirección y
añade estos bloques. Los ejemplos son sugerencias, cámbialos por lo tuyo.

### 1 · Inicio
Marca **«Es la página de inicio»** y deja la dirección vacía.

- **Portada** — *Título* (tu nombre, ej. «Aisha Cruz») · *Frase de entrada* (una
  línea, ej. «Cuerda, shibari y escena») · *Imagen o vídeo de fondo* (una imagen
  fuerte; coloca el hotspot) · *Botón* (opcional, ej. «Ver clases»).
- **Trabajos destacados** — *Título* («Trabajos») · *Trabajos* (elige 2-3 de los
  que hayas creado). *Si aún no tienes trabajos, salta este bloque y añádelo
  después.*
- **Clases** — *Título* («Clases») · *Introducción* (una línea) · *Qué clases
  mostrar* → **«Todas las clases activas»**.
- **Formulario de contacto** — *Título* («Escríbeme») · *Introducción* ·
  *Incluir selector de clase* → sí · *Mensaje de confirmación* («¡Gracias! Te
  respondo pronto.»).

> La Portada y el Formulario ya te dan una home publicable. Añade Trabajos y
> Clases cuando tengas esos documentos creados.

### 2 · Sobre mí — dirección `sobre-mi`
- **Texto** — *Título* («Sobre mí») · *Contenido* (tu biografía) · *Ancho* →
  «Estrecho».
- **Galería de imágenes** — *Imágenes* (varias fotos tuyas).

### 3 · Performances — dirección `performances`
- **Texto (corto)** — una intro breve.
- **Galería de imágenes** — fotos de tus performances.

*(Puedes repetir Texto + Galería por cada performance.)*

### 4 · Teatro — dirección `teatro`
- **Texto** — nombre del montaje, compañía y año (ej. «Compañía X · 2023»).
- **Galería de imágenes** — fotos de ese montaje.

Repite el par **Texto + Galería** por cada montaje. No hay límite; se arrastran
para reordenar.

### 5 · Workshops — dirección `workshops`
- **Workshops** — *Título* («Workshops») · *Introducción* · *Qué mostrar* →
  «Próximos» · *Texto si no hay nada programado* («Ahora mismo no hay fechas.
  Escríbeme si te interesa.»).
- **Formulario de contacto** — para consultas e inscripciones.

> Los workshops en sí se crean en el apartado **Workshops**, no aquí. Este
> bloque sólo los muestra y los ordena solo por fecha.

### 6 · Tienda — dirección `tienda`
- **Próximamente** — *Título* («Tienda») · *Texto* («Muy pronto.») · *Botón*
  (opcional).

### 7 · Contacto — dirección `contacto`
- **Texto** — una intro breve.
- **Formulario de contacto** — *Incluir selector de clase* → sí · *Mensaje de
  confirmación*.

Cuando tengas las páginas, ve a **Menú** y añádelas al menú principal.

## Varias galerías en una misma página

Sí, se puede, y es el uso previsto para Teatro y Performances: añade el bloque
**Galería de imágenes** tantas veces como quieras y pon un título distinto a
cada una. Puedes intercalarlas con bloques de **Texto**:

```
Texto        "Compañía X, 2023"
Galería      (fotos de ese montaje)
Texto        "Compañía Y, 2024"
Galería      (fotos del otro)
```

No hay límite. Se arrastran para reordenarlas como cualquier otro bloque.

## Clases y workshops son cosas distintas

- **Clases** — lo que ofreces de forma continua. Aparecen en la página y en el
  desplegable del formulario. No caducan.
- **Workshops** — tienen fecha, ciudad y lugar. Pasan solos de *próximos* a
  *anteriores* cuando llega la fecha, sin que tengas que tocar nada.

Si algo lo das siempre, es una clase. Si es un día concreto, es un workshop.

## La tienda

La página existe desde el principio con el bloque **Próximamente**. Cuando
decidas qué vender, se cambia ese bloque por los que hagan falta: la dirección
`tuweb.com/tienda` y el enlace del menú siguen siendo los mismos, así que nada
de lo que hayas compartido deja de funcionar.

## Menú sugerido

```
Sobre mí · Performances · Teatro · Workshops · Clases · Tienda · Contacto
```

Siete elementos ya es bastante para una barra de menú. Si se queda corta en el
móvil, dinos cuáles quitar del menú principal — las páginas siguen existiendo
aunque no estén ahí arriba.
