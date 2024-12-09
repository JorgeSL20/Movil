# Gateway Soluciones en TI - Aplicación de Gestión de Productos Electrónicos

## Descripción del Proyecto  
La aplicación **Gateway Soluciones en TI** permite a la empresa gestionar y vender productos electrónicos mediante una interfaz intuitiva y fácil de usar. Proporciona a los usuarios una experiencia de compra segura y eficaz gracias a la integración de la pasarela de pagos **Stripe**. El objetivo principal es optimizar la administración del catálogo de productos y las transacciones, garantizando seguridad en cada proceso.

---

## Objetivo  
Desarrollar una aplicación móvil que facilite:  
- La gestión y venta de productos electrónicos.  
- Una experiencia de usuario intuitiva y amigable.  
- La integración de un método de pago seguro mediante **Stripe**.

---

## Alcance  
La aplicación ofrece las siguientes funcionalidades a los usuarios:  
1. **Exploración de productos:**  
   - Visualizar el catálogo completo de productos electrónicos.  
   - Consultar detalles y especificaciones de los productos.  

2. **Realización de compras:**  
   - Comprar productos de manera segura a través de la pasarela de pagos Stripe.  

3. **Seguimiento de pedidos:**  
   - Acceso al historial de compras y seguimiento de pedidos en tiempo real.  

---

## Equipo de Trabajo  
El desarrollo del proyecto está a cargo de:  
- **Erik Uriel Vicente Sanchez**  
- **Jorge Leonardo Seydlitz Lugo**  

Ambos desarrolladores asumen múltiples roles en el marco de la metodología XP, incluyendo planificación, desarrollo y pruebas del proyecto.

---

## Riesgos y Medidas  

### Riesgos  
- **Problemas de seguridad** en las transacciones mediante Stripe.  
- **Fallos de sincronización** con la base de datos de productos y pedidos.  
- **Retrasos en la implementación** de funcionalidades clave, como la integración de pagos o la carga de inventario.  

### Medidas  
1. **Pruebas de integración continua:** Se utilizan herramientas como Postman para verificar las APIs.  
2. **Revisiones de código:** Se realizan revisiones regulares en GitHub para mantener la calidad del código.  
3. **Evaluaciones de seguridad:** Se efectúan auditorías periódicas para garantizar la protección de datos en las transacciones.  

---

## Estrategia de Comunicación  
- **Reuniones diarias:**  
  - Discusión del progreso individual.  
  - Identificación de bloqueos.  
  - Planificación de tareas futuras.  
- **Herramientas de comunicación:**  
  - **Slack:** Para comunicación en tiempo real.  
  - **Trello:** Para asignación y seguimiento de tareas.  

---

## Metodología de Desarrollo  
El proyecto se desarrolla bajo la metodología **XP (Extreme Programming)**, que incluye:  
- **Iteraciones rápidas** para adaptarse a los cambios.  
- **Retroalimentación constante** para mejorar el producto.  
- **Adaptabilidad** frente a requisitos cambiantes.  

---

## Organización del Proyecto en Trello  
El proyecto está organizado en tableros Trello con las siguientes columnas:  
1. **Backlog:** Tareas pendientes.  
2. **In Progress:** Tareas en desarrollo.  
3. **Review:** Tareas en revisión.  
4. **Done:** Tareas completadas y revisadas.  

Cada tarjeta en Trello incluye:  
- Descripción de la tarea.  
- Responsable asignado.  
- Prioridad (alta, media, baja).  
- Fecha límite.  

---

## Control de Versiones  
El control de versiones se realiza utilizando **Git** y el repositorio está alojado en **GitHub**.  

### Flujo de trabajo basado en ramas:  
- **main:** Contiene la última versión estable.  
- **develop:** Rama de desarrollo.  
- **feature/*:** Ramas para funcionalidades específicas.  
- **hotfix/*:** Ramas para resolver errores críticos en producción.  

### Modelo de versionado:  
Se sigue el esquema **SemVer (Versionado Semántico):**  
- Formato: `vMAJOR.MINOR.PATCH` (por ejemplo, `v1.2.3`).  

---

## Estrategia de Despliegue  
El proyecto utiliza un flujo de **CI/CD** para automatizar pruebas y despliegues.  

### Entornos de despliegue:  
1. **Desarrollo:** Para probar nuevas funcionalidades en un entorno no productivo.  
2. **Producción:** Solo para versiones estables.  

Cualquier fusión en la rama `main` desencadena un despliegue automático al entorno de producción.

---

## Instalación y Configuración  

### Clonar el repositorio  
Sigue estos pasos para clonar e instalar el proyecto:  
```bash
git clone https://github.com/usuario/gateway-soluciones-ti.git
cd gateway-soluciones-ti
npm install
