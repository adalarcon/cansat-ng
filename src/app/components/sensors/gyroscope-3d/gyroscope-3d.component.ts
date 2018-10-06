import { AfterViewInit,OnInit, OnChanges, Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import "./js/EnableThreeExamples";
import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/ColladaLoader";


@Component({
  selector: 'app-gyroscope-dd',
  templateUrl: './gyroscope-3d.component.html',
})
export class Gyroscope3DComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() gyroscope:any;
  @ViewChild('canvas') private canvasRef: ElementRef;


  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;

  dataRollx ='0';
  dataRolly ='0';
  dataRollz ='0';
  accuracy = 2;
  orderOfMag = (Math.PI/180);

  fieldOfView: number = 60;
  nearClippingPane: number = 1;
  farClippingPane: number = 1100;

  controls: THREE.OrbitControls;

  mesh: any;
  index = 0;

  cont: number = 0;

  constructor( ) {
    this.render = this.render.bind(this);
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
  }

  private get canvas(): HTMLCanvasElement {
      return this.canvasRef.nativeElement;
  }

  private createScene() {
      this.scene = new THREE.Scene();
      var loader = new THREE.ColladaLoader();

      var geometry = new THREE.BoxGeometry( 200, 200, 200 );

      for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        var hex = Math.random() * 0xffffff;
        geometry.faces[ i ].color.setHex( hex );
        geometry.faces[ i + 1 ].color.setHex( hex );
      }

      var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

      this.mesh = new THREE.Mesh( geometry, material );
      this.mesh.position.y = 20;
      this.scene.add( this.mesh );
  }



  private onModelLoadingCompleted(collada) {
      var modelScene = collada.scene;
      this.scene.add(modelScene);
      this.render();
  }

  private createLight() {
      var light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(0, 0, 100);
      this.scene.add(light);

      var light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(0, 0, -100);
      this.scene.add(light);
  }

  private createCamera() {
      let aspectRatio = this.getAspectRatio();
      // Set position and look at
      this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      this.camera.position.y = 10;
      this.camera.position.z = 300;
  }

  private getAspectRatio(): number {
      let height = this.canvas.clientHeight;
      if (height === 0) {
          return 0;
      }
      return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRendering() {
      this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true
      });
      this.renderer.setPixelRatio(devicePixelRatio);
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0xffffff, 1);
      this.renderer.autoClear = true;

      let component: Gyroscope3DComponent = this;

      (function render() {
          //requestAnimationFrame(render);
          component.render();
      }());
  }

  render() {
    this.mesh.rotation.x = -this.dataRollx;
    this.mesh.rotation.y = -this.dataRollz;
    this.mesh.rotation.z = -this.dataRolly;
    this.renderer.render(this.scene, this.camera);
  }


  public addControls() {
      // this.controls = new THREE.OrbitControls(this.camera);
      // this.controls.rotateSpeed = 1.0;
      // this.controls.zoomSpeed = 1.2;
      // this.controls.addEventListener('change', this.render);

  }

  private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {
      if (parent.children.length > 0) {
          parent.children.forEach((i) => {
              pred.push(i);
              this.findAllObjects(pred, i);
          });
      }
  }

  public onMouseUp(event: MouseEvent) {
      console.log("onMouseUp");
  }

  ngAfterViewInit() {
      this.createScene();
      this.createLight();
      this.createCamera();
      this.startRendering();
      this.addControls();
  }


  ngOnInit() {

  }

  ngOnChanges(){
    this.onRun(this.gyroscope);
  }


  onRun(gyroscope){
    console.log("onRun", this.cont)
    console.log("onRun", gyroscope)

    if(gyroscope){

      this.dataRollx = (gyroscope.x *= this.orderOfMag).toFixed(this.accuracy);
      this.dataRolly = (gyroscope.y *= this.orderOfMag).toFixed(this.accuracy);
      this.dataRollz = (gyroscope.z *= this.orderOfMag).toFixed(this.accuracy);
      this.render();
    }

  }

  onReset(){
    this.dataRollx = (1 * this.orderOfMag).toFixed(this.accuracy);
    this.dataRolly = (1 * this.orderOfMag).toFixed(this.accuracy);
    this.dataRollz = (1 * this.orderOfMag).toFixed(this.accuracy);
    this.render();
  }

}
