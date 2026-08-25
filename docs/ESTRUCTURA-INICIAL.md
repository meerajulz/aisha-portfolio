# Estructura inicial de la web

Las seis páginas que hay que crear en el Studio, con los bloques que lleva
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
