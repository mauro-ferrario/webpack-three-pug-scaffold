import ThreeBase, {SceneUI} from "../libs/mauroferrario/ThreeBase"
import * as THREE from "three";

const CustomUI = class extends SceneUI{
  constructor(threeBase){
      super(threeBase);
  }

  addParameters(){
      super.addParameters();
      this.testBtn = true;
  }
}
  
export default class extends ThreeBase{
  constructor(){
    super();
    this.onMouseMoveFunction = this.onMouseMove;
    this.mousePos={x:0, y:0};
  }

  setupGUI(){
    super.setupGUI(CustomUI);
    const testFolder = this.gui.addFolder('Test folder')
    testFolder.add(this.ui, "testBtn");
  }

  setupScene() {
    super.setupScene();
    this.addCone();
    this.addPlane();
  }

  setupCamera() {
    super.setupCamera({useOrbit: false});
    this.camera.position.x = 0;
    this.camera.position.z = 500;
    this.camera.position.y = 100;
  }
  
  setupRender() {
    super.setupRender({enableShadow: true});
  }
  
  setup() {
    super.setup();
  }

  addPlane(){
    const geometry = new THREE.PlaneGeometry( 1250, 1250, 32 );
    const mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: THREE.FlatShading,
    });
    const plane = new THREE.Mesh( geometry, mat );
    plane.position.set(0, 0, 0);
    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  addCone(){
    const radius = 16;
    this.coneHeight = 58;
    const segments = 46;
    const mat = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        flatShading: THREE.FlatShading,
      });
    const geometry = new THREE.ConeBufferGeometry(radius, this.coneHeight, segments);
    this.cone = new THREE.Mesh( geometry, mat );
    this.cone.position.set(0, this.coneHeight*0.5, 0);
    this.cone.castShadow = true;
    this.scene.add(this.cone );
  }

  setupLight() {
    super.setupLight();
  }

  updateDataFromUI(){
    super.updateDataFromUI();
  }

  updateScene(timestamp){
    const radius = 200;
    const speed = 0.001;
    const posX = Math.sin(timestamp*speed)*radius;
    const posZ = Math.cos(timestamp*speed)*radius;
    this.cone.position.set(posX, this.coneHeight*0.5, posZ);
  } 
}