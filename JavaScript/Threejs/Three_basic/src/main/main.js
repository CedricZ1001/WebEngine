import * as THREE from "three";

// import controller
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";

import * as dat from "dat.gui";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"

// console.log(THREE)

//load hrd 
// const rgbeloader = new RGBELoader();
// rgbeloader.loadAsync("texture/duoduo.jpg").then((texture)=>{
//   scene.background = texture;
// });




// Scene
const scene = new THREE.Scene();



// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);



// set position of camera
camera.position.set(0, 5, 5);
scene.add(camera);


//##light
// #ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// #directionlight
const directionLight = new THREE.SpotLight(0xffffff, 1);
directionLight.position.set(5, 5, 5);
directionLight.castShadow = true;
directionLight.shadow.radius = 20;
directionLight.shadow.mapSize.set(4096,4096);


// directionLight.shadow.camera.near = 0.5;
// directionLight.shadow.camera.far = 500;
// directionLight.shadow.camera.top = 5;
// directionLight.shadow.camera.bottom = -5;
// directionLight.shadow.camera.left = -5;
// directionLight.shadow.camera.right = 5;

scene.add(directionLight);
const gui = new dat.GUI();



const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const spmaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry,spmaterial);

directionLight.target = sphere;

sphere.position.set(0,0,0);
sphere.castShadow = true;
scene.add(sphere);

gui.add(sphere.position, "x")
.min(-25)
.max(25)
.step(0.1)
gui.add(sphere.position, "y")
.min(0)
.max(25)
.step(0.1)
gui.add(sphere.position, "z")
.min(-25)
.max(25)
.step(0.1)


const planeGeometry = new THREE.PlaneGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry,spmaterial);
plane.position.set(0,-1,0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

scene.add(plane)

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// renderer.render(scene,camera);

// create contoller
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// add axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// fill scrne
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render(time) {
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
