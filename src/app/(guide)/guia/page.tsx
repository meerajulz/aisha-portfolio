/**
 * A live, always-in-Spanish walkthrough for building the seven pages in the
 * Studio. Aisha keeps this open in one tab and the Studio in another.
 *
 * It is deliberately not part of the localized site: no nav, no Sanity, no
 * translation. The content lives here as plain data so it is easy to adjust
 * without touching the Studio or the public site.
 */

type Field = { label: string; help: string; example?: string };
type Block = { name: string; fields: Field[]; note?: string };
type Page = {
  n: number;
  title: string;
  address: string;
  intro: string;
  blocks: Block[];
};

const PAGES: Page[] = [
  {
    n: 1,
    title: "Inicio",
    address: 'Marca «Es la página de inicio» y deja la dirección vacía.',
    intro:
      "La portada de tu web. La Portada y el Formulario funcionan solos; los otros dos bloques muestran cosas que creas en otros apartados, así que si aún no las tienes, sáltalos y añádelos después.",
    blocks: [
      {
        name: "Portada",
        fields: [
          { label: "Título", help: "Tu nombre o una frase corta.", example: "Aisha Cruz" },
          { label: "Frase de entrada", help: "Una línea debajo del título.", example: "Cuerda, shibari y escena" },
          { label: "Imagen o vídeo de fondo", help: "Una sola imagen fuerte. Coloca el punto importante (hotspot) sobre lo que no se debe recortar." },
          { label: "Botón", help: "Opcional. Un enlace a otra página tuya.", example: "«Ver clases» → Clases" },
        ],
      },
      {
        name: "Trabajos destacados",
        note: "Muestra trabajos que hayas creado en el apartado «Trabajos». Si aún no tienes ninguno, salta este bloque y vuelve después.",
        fields: [
          { label: "Título", help: "Encabezado de la sección.", example: "Trabajos" },
          { label: "Trabajos", help: "Elige 2 o 3 de tus trabajos ya creados." },
        ],
      },
      {
        name: "Clases",
        note: "Se alimenta del apartado «Clases». Con «Todas» se rellena sola a medida que creas clases.",
        fields: [
          { label: "Título", help: "Encabezado de la sección.", example: "Clases" },
          { label: "Introducción", help: "Una línea de contexto." },
          { label: "Qué clases mostrar", help: "Elige «Todas las clases activas» — es lo más cómodo." },
        ],
      },
      {
        name: "Formulario de contacto",
        fields: [
          { label: "Título", help: "Encabezado del formulario.", example: "Escríbeme" },
          { label: "Introducción", help: "Una frase que invite a escribir." },
          { label: "Incluir selector de clase", help: "Déjalo activado para que indiquen qué clase les interesa." },
          { label: "Mensaje de confirmación", help: "Lo que se ve tras enviar.", example: "¡Gracias! Te respondo pronto." },
        ],
      },
    ],
  },
  {
    n: 2,
    title: "Sobre mí",
    address: "sobre-mi",
    intro: "Quién eres, con fotos. Dos bloques.",
    blocks: [
      {
        name: "Texto",
        fields: [
          { label: "Título", help: "Encabezado.", example: "Sobre mí" },
          { label: "Contenido", help: "Tu biografía, tu enfoque, tu recorrido." },
          { label: "Ancho", help: "Deja «Estrecho»: se lee mejor." },
        ],
      },
      {
        name: "Galería de imágenes",
        fields: [
          { label: "Título", help: "Opcional." },
          { label: "Imágenes", help: "Varias fotos tuyas o de tu trabajo." },
        ],
      },
    ],
  },
  {
    n: 3,
    title: "Performances",
    address: "performances",
    intro: "Una intro corta y fotos. Puedes repetir Texto + Galería por cada performance.",
    blocks: [
      {
        name: "Texto (corto)",
        fields: [
          { label: "Título", help: "Opcional.", example: "Performances" },
          { label: "Contenido", help: "Una intro breve." },
        ],
      },
      {
        name: "Galería de imágenes",
        fields: [{ label: "Imágenes", help: "Fotos de tus performances." }],
      },
    ],
  },
  {
    n: 4,
    title: "Teatro",
    address: "teatro",
    intro:
      "Un montaje tras otro. Añade un Texto y una Galería por cada obra, y repite el par tantas veces como montajes tengas. Se arrastran para reordenar.",
    blocks: [
      {
        name: "Texto",
        fields: [
          { label: "Título / Contenido", help: "Nombre del montaje, compañía y año.", example: "Compañía X · 2023" },
        ],
      },
      {
        name: "Galería de imágenes",
        note: "Repite Texto + Galería por cada montaje. No hay límite.",
        fields: [{ label: "Imágenes", help: "Fotos de ese montaje." }],
      },
    ],
  },
  {
    n: 5,
    title: "Workshops",
    address: "workshops",
    intro:
      "Los talleres con fecha. Ojo: los workshops se crean en el apartado «Workshops»; este bloque sólo los muestra y los ordena solo.",
    blocks: [
      {
        name: "Workshops",
        fields: [
          { label: "Título", help: "Encabezado.", example: "Workshops" },
          { label: "Introducción", help: "Una línea de contexto." },
          { label: "Qué mostrar", help: "Deja «Próximos»." },
          {
            label: "Texto si no hay nada programado",
            help: "Se ve cuando no hay fechas, para que la página no quede en blanco.",
            example: "Ahora mismo no hay fechas. Escríbeme si te interesa.",
          },
        ],
      },
      {
        name: "Formulario de contacto",
        fields: [{ label: "Título / Introducción", help: "Para consultas e inscripciones." }],
      },
    ],
  },
  {
    n: 6,
    title: "Tienda",
    address: "tienda",
    intro:
      "Existe desde el principio con un aviso de «Próximamente». Cuando decidas qué vender, cambiamos este bloque; la dirección y el enlace del menú no cambian.",
    blocks: [
      {
        name: "Próximamente",
        fields: [
          { label: "Título", help: "Encabezado.", example: "Tienda" },
          { label: "Texto", help: "Un aviso corto.", example: "Muy pronto." },
          { label: "Botón", help: "Opcional." },
        ],
      },
    ],
  },
  {
    n: 7,
    title: "Contacto",
    address: "contacto",
    intro: "Una intro y el formulario, esta vez con el selector de clase.",
    blocks: [
      {
        name: "Texto",
        fields: [{ label: "Título / Contenido", help: "Cómo prefieres que te contacten.", example: "Contacto" }],
      },
      {
        name: "Formulario de contacto",
        fields: [
          { label: "Incluir selector de clase", help: "Actívalo: aparece el desplegable con tus clases." },
          { label: "Mensaje de confirmación", help: "Lo que se ve tras enviar." },
        ],
      },
    ],
  },
];

export default function GuiaPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <header className="border-b border-[var(--color-rule)] pb-10">
        <p className="label mb-4">Guía para construir</p>
        <h1 className="display text-[length:var(--text-display)] text-[var(--color-fg)]">
          Tus siete páginas
        </h1>
        <p className="prose-rope mt-6 text-[var(--color-fg-muted)]">
          Abre tu panel en <code className="text-[var(--color-accent)]">tuweb.com/studio</code> en
          otra pestaña y ve creando las páginas en este orden. Cada página es una lista de{" "}
          <strong>bloques</strong> que arrastras y ordenas a tu gusto. Nada se publica hasta que
          pulsas <strong>Publicar</strong>.
        </p>
      </header>

      <ol className="mt-4">
        {PAGES.map((page) => (
          <li key={page.n} className="border-b border-[var(--color-rule)] py-12">
            <div className="flex items-baseline gap-4">
              <span className="label">Página {page.n}</span>
              <span className="label">
                Dirección: <span className="text-[var(--color-accent)]">{page.address}</span>
              </span>
            </div>
            <h2 className="display mt-2 text-[length:var(--text-heading)] text-[var(--color-fg)]">
              {page.title}
            </h2>
            <p className="prose-rope mt-3 text-[var(--color-fg-muted)]">{page.intro}</p>

            <div className="mt-8 space-y-8">
              {page.blocks.map((block, i) => (
                <div key={i}>
                  <h3 className="flex items-center gap-3">
                    <span className="label">Bloque</span>
                    <span className="text-lg font-semibold text-[var(--color-fg)]">
                      {block.name}
                    </span>
                  </h3>
                  {block.note && (
                    <p className="mt-2 border-l border-[var(--color-rule)] pl-4 text-sm text-[var(--color-fg-muted)]">
                      {block.note}
                    </p>
                  )}
                  <dl className="mt-3 space-y-2">
                    {block.fields.map((f, j) => (
                      <div key={j} className="text-[15px] leading-relaxed">
                        <dt className="inline font-medium text-[var(--color-fg)]">{f.label}</dt>
                        <dd className="inline text-[var(--color-fg-muted)]">
                          {" — "}
                          {f.help}
                          {f.example && (
                            <>
                              {" "}
                              <span className="italic text-[var(--color-accent-soft)]">
                                Ej.: “{f.example}”
                              </span>
                            </>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <footer className="py-12">
        <h2 className="display text-[length:var(--text-heading)] text-[var(--color-fg)]">
          Después de las páginas
        </h2>
        <ul className="prose-rope mt-4 text-[var(--color-fg-muted)]">
          <li>
            Ve a <strong>Menú</strong> y añade cada página al menú principal (arrastra para
            ordenarlas).
          </li>
          <li>
            En <strong>Clases</strong> y <strong>Workshops</strong>, crea los documentos que
            alimentan los bloques del mismo nombre.
          </li>
          <li>
            La guía completa de edición (fotos, vídeos, idiomas, buscadores) está en{" "}
            <em>GUIA-DE-EDICION</em>.
          </li>
        </ul>
      </footer>
    </main>
  );
}
