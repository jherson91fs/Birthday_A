# 🎂 Instrucciones de Personalización - Cumpleaños #20

## 🔒 Sistema de Bloqueo

**IMPORTANTE**: La página está configurada para mostrar solo el contador hasta el 7 de agosto. El contenido completo se desbloqueará automáticamente ese día.

### Fecha de Desbloqueo:
- **Día**: 7 de agosto
- **Hora**: 00:00 (medianoche)
- **Contenido**: Todo el álbum, galería, juego, carta y sorpresas

## 📸 Cómo Agregar Fotos y Videos

### 1. Preparar las Imágenes
- **Formato recomendado**: JPG o PNG
- **Tamaño**: 300x300 píxeles o más (se ajustarán automáticamente)
- **Calidad**: Alta resolución para mejor visualización

### 2. Agregar Fotos al Álbum de Recuerdos

Reemplaza las imágenes placeholder en `index.html`:

```html
<!-- Encuentra esta sección en el archivo -->
<div class="timeline-image">
    <img src="ruta/a/tu/foto.jpg" alt="Descripción de la foto">
</div>
```

**Ejemplos de reemplazo:**
```html
<!-- Para el primer encuentro -->
<img src="fotos/primer-encuentro.jpg" alt="Nuestro primer encuentro">

<!-- Para la primera cita -->
<img src="fotos/primera-cita.jpg" alt="Nuestra primera cita">

<!-- Para el primer viaje -->
<img src="fotos/primer-viaje.jpg" alt="Nuestro primer viaje juntos">
```

### 3. Agregar Fotos a la Galería

Reemplaza las imágenes en la sección de galería:

```html
<div class="gallery-item" data-caption="Nuestro primer beso 💕">
    <img src="fotos/primer-beso.jpg" alt="Nuestro primer beso">
</div>
```

**Personaliza los captions:**
- `data-caption="Nuestro primer beso 💕"`
- `data-caption="Risas juntos 😄"`
- `data-caption="Nuestro primer viaje ✈️"`
- `data-caption="Celebrando juntos 🎉"`
- `data-caption="Momentos de amor 💖"`
- `data-caption="Aventuras juntos 🌟"`

### 4. Agregar Videos

Para agregar videos, reemplaza en `index.html`:

```html
<div class="timeline-video">
    <video controls>
        <source src="videos/video-especial.mp4" type="video/mp4">
        Tu navegador no soporta videos.
    </video>
</div>
```

**Formatos soportados:**
- MP4 (recomendado)
- WebM
- OGG

## 🎵 Cómo Agregar Música

### 1. Preparar el Archivo de Música
- **Formato**: MP3 (recomendado)
- **Duración**: 3-5 minutos para música de fondo
- **Calidad**: 128kbps o superior

### 2. Agregar la Música
1. Coloca tu archivo de música en la carpeta del proyecto
2. Renómbralo como `musica-romantica.mp3`
3. O cambia la referencia en `index.html`:

```html
<audio id="background-music" loop>
    <source src="tu-cancion-especial.mp3" type="audio/mpeg">
</audio>
```

### 3. Personalizar Información de la Canción
Cambia en `index.html`:

```html
<div class="music-info">
    <span class="song-title">Nombre de tu canción</span>
    <span class="song-artist">Artista</span>
</div>
```

## 🎨 Personalización de Contenido

### 1. Cambiar la Fecha del Cumpleaños
En `script.js`, línea 4:
```javascript
birthdayDate: '2024-08-07', // Fecha configurada para 7 de agosto
```

**NOTA**: La fecha ya está configurada para el 7 de agosto. Si necesitas cambiarla, modifica esta línea.

### 2. Personalizar Nombres
En `script.js`:
```javascript
birthdayName: 'Mi Princesa', // Cambia por su nombre real
yourName: 'Tu Príncipe', // Cambia por tu nombre
```

### 3. Personalizar Mensajes de Sorpresa
En `script.js`, sección `surpriseMessages`:
```javascript
1: {
    title: '🎵 Sorpresa Musical',
    content: 'Tu mensaje personalizado aquí...'
},
```

### 4. Personalizar la Carta
En `index.html`, sección de la carta:
```html
<p class="typing-text" id="letter-text">
    Querida [Su Nombre],
    
    Tu mensaje personalizado aquí...
    
    Con todo mi amor,
    [Tu Nombre]
</p>
```

## 📁 Estructura de Archivos Recomendada

```
Cumpleaños/
├── index.html
├── styles.css
├── script.js
├── musica-romantica.mp3
├── fotos/
│   ├── primer-encuentro.jpg
│   ├── primera-cita.jpg
│   ├── primer-viaje.jpg
│   ├── momentos-especiales.jpg
│   ├── primer-beso.jpg
│   ├── risas-juntos.jpg
│   ├── celebrando.jpg
│   ├── momentos-amor.jpg
│   └── aventuras.jpg
└── videos/
    └── video-especial.mp4
```

### 📸 Nombres de Archivos Requeridos:

#### Para el Álbum de Recuerdos:
- `fotos/primer-encuentro.jpg` - Primer encuentro
- `fotos/primera-cita.jpg` - Primera cita
- `fotos/primer-viaje.jpg` - Primer viaje
- `fotos/momentos-especiales.jpg` - Momentos especiales

#### Para la Galería:
- `fotos/primer-beso.jpg` - Nuestro primer beso
- `fotos/risas-juntos.jpg` - Risas juntos
- `fotos/celebrando.jpg` - Celebrando juntos
- `fotos/momentos-amor.jpg` - Momentos de amor
- `fotos/aventuras.jpg` - Aventuras juntos

#### Para Videos:
- `videos/video-especial.mp4` - Video especial del timeline

## 🎯 Ideas para el Contenido

### Fotos Sugeridas:
1. **Primer encuentro** - El momento en que se conocieron
2. **Primera cita** - Su primera cita romántica
3. **Primer viaje** - Su primer viaje juntos
4. **Momentos especiales** - Fotos de risas y felicidad
5. **Celebraciones** - Cumpleaños anteriores, aniversarios
6. **Aventuras** - Viajes, excursiones, momentos divertidos

### Videos Sugeridos:
1. **Compilación de momentos** - Video con fotos y música
2. **Mensaje personal** - Video hablando directamente a ella
3. **Recuerdos especiales** - Momentos capturados en video
4. **Celebración** - Video de una celebración especial

### Música Sugerida:
1. **Su canción favorita** - La canción que más le gusta
2. **Canción romántica** - Una canción que represente su amor
3. **Canción especial** - Una canción que tenga significado para ambos
4. **Playlist personalizada** - Varias canciones especiales

## 🎊 Efectos Especiales para el Cumpleaños

### Antes del 7 de agosto:
- Solo se muestra el contador regresivo
- Mensaje de "Contenido Bloqueado" con candado animado
- Navegación y contenido oculto
- Efectos de confeti limitados

### El 7 de agosto (día del cumpleaños):
- El contador mostrará "00:00:00:00"
- Se desbloqueará todo el contenido automáticamente
- Aparecerá el mensaje "¡FELIZ CUMPLEAÑOS!"
- Se activarán múltiples efectos de confeti
- Se mostrará toda la navegación y funcionalidades
- La música se podrá reproducir
- Todas las sorpresas estarán disponibles

### Para hacerlo más especial:
1. **Configura la fecha correcta** para que el contador llegue a cero en el momento exacto
2. **Prepara las sorpresas** con mensajes muy personales
3. **Agrega fotos recientes** para que se sienta actualizado
4. **Incluye un video especial** con un mensaje personal
5. **Elige música significativa** que tenga valor emocional

## 💡 Consejos Adicionales

### Para Fotos:
- Usa fotos de alta calidad
- Incluye una variedad de momentos (románticos, divertidos, aventuras)
- Asegúrate de que las fotos tengan buena iluminación
- Considera el orden cronológico en el timeline

### Para Videos:
- Mantén los videos cortos (1-3 minutos)
- Usa música de fondo apropiada
- Incluye transiciones suaves
- Asegúrate de que el audio sea claro

### Para Música:
- Elige música que tenga significado para ambos
- Considera el volumen (no muy alto para no molestar)
- Prueba la música en diferentes dispositivos
- Ten una canción de respaldo por si hay problemas

## 🎉 ¡Listo para Sorprender!

Con estas personalizaciones, tendrás una página web única y especial que:
- Celebra sus 20 años de manera mágica
- Incluye todos sus momentos especiales
- Tiene música romántica de fondo
- Ofrece sorpresas interactivas
- Es completamente personalizada para ella

¡Será un regalo inolvidable que nunca olvidará! 💖✨ 