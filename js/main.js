import * as THREE from './modules/three.module.js';
// Crear la escena
const scene = new THREE.Scene();

// Crear el renderizador con antialiasing activado para mayor calidad
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Crear la geometría del cubo
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Crear el material del cubo
const material = new THREE.MeshBasicMaterial({
  color: 0x800080,
  wireframe: false,
});

// Crear la malla del cubo
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Crear un material para las líneas del cubo
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, edgeMaterial);
scene.add(line);

// Crear cámaras en diferentes perspectivas
const camera1 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // Vista frontal (Z)
camera1.position.set(0, 0, 5);
camera1.lookAt(cube.position);

const camera2 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // Vista superior (Y)
camera2.position.set(0, 5, 0);
camera2.lookAt(cube.position);

const camera3 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // Vista lateral (X)
camera3.position.set(5, 0, 0);
camera3.lookAt(cube.position);

// Lista de cámaras y variable para controlar la activa
const cameras = [camera1, camera2, camera3];
let currentCameraIndex = 0; // Inicia con la primera cámara

// Función para cambiar de cámara al presionar "C"
function changeCamera(event) {
  if (event.key === "c" || event.key === "C") {
    currentCameraIndex = (currentCameraIndex + 1) % cameras.length; // Cambia a la siguiente cámara
    console.log(`Cambiando a cámara ${currentCameraIndex + 1}`);
  }
}

// Agregar evento para cambiar de cámara
window.addEventListener("keydown", changeCamera);

function animate() {
  // Rotar el cubo y sus líneas
  cube.rotation.y += 0.01;
  line.rotation.y += 0.01;

  // Renderizar la escena con la cámara activa
  renderer.render(scene, cameras[currentCameraIndex]);
}
