let scene = new THREE.Scene();

// Add light to scene
{
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

let boxGeometry = new THREE.BoxGeometry(10, 10, 10);
// let basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095dd });
// let cubeMesh = new THREE.Mesh(boxGeometry, basicMaterial);
// cubeMesh.rotation.set(0.4, 0.2, 0);

// Material with Light
let lightMaterial = new THREE.MeshPhongMaterial({ color: 0x0095dd });
let cubeMesh = new THREE.Mesh(boxGeometry, lightMaterial);

let wireframeGeometry = new THREE.BoxGeometry(30, 30, 30);
let wireframeBasicMaterial = new THREE.MeshBasicMaterial({
  color: "#CA4ADC",
  wireframe: true,
  wireframeLinewidth: 2,
});
let wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeBasicMaterial);
wireframeMesh.rotation.set(0.6, 0.3, 0);

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 50;

scene.add(camera);
scene.add(cubeMesh, wireframeMesh);

// Render scene on browser
let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);

const render = (time) => {
  time *= 0.001; // convert time to seconds
  cubeMesh.rotation.x = time;
  cubeMesh.rotation.y = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
};
// request to browser that you want to animate sth
requestAnimationFrame(render);

document.body.appendChild(renderer.domElement);

// Make canvas responsive to browser size change
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectMatrix();
});

render();

// Another way to render scene onto browser (more flexible)
/*
    // add a <canvas id="canvas"> tag to body 
    function main() {
        const canvas = document.getElementById("canvas");
        const renderer = new THREE.WebGLRenderer({ canvas });
    }
*/
