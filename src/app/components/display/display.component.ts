import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import "./js/EnableThreeExamples";
import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/ColladaLoader";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements AfterViewInit {

    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private cameraTarget: THREE.Vector3;
    public scene: THREE.Scene;

    public fieldOfView: number = 60;
    public nearClippingPane: number = 1;
    public farClippingPane: number = 1100;

    public controls: THREE.OrbitControls;

    mesh: any;
    index = 0;

    @ViewChild('canvas')
    private canvasRef: ElementRef;

    constructor() {
        this.render = this.render.bind(this);
        this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    private createScene() {
        this.scene = new THREE.Scene();
        var loader = new THREE.ColladaLoader();

        var geometry = new THREE.BoxGeometry( 5, 5, 5 );
      	var material = new THREE.MeshNormalMaterial();

      	this.mesh = new THREE.Mesh( geometry, material );

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
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPane,
            this.farClippingPane
        );

        // Set position and look at
        this.camera.position.x = 2;
        this.camera.position.y = 2;
        this.camera.position.z = 20;
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

        let component: DisplayComponent = this;

        (function render() {
            //requestAnimationFrame(render);
            component.render();
        }());
    }

    onNext(){
      this.index++;
      this.refresh();
    }
    onBack(){
      this.index--;
      this.refresh();
    }

    refresh(){
      this.mesh.rotation.x = this.data[this.index].data.gyroscope.x/5000;
      this.mesh.rotation.y = this.data[this.index].data.gyroscope.y/5000;
      this.mesh.rotation.z = this.data[this.index].data.gyroscope.z/5000;
      this.render();
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public addControls() {
        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.addEventListener('change', this.render);

    }

    /* EVENTS */
    private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {
        // NOTE: Better to keep separate array of selected objects
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

    /* LIFECYCLE */
    ngAfterViewInit() {
        this.createScene();
        this.createLight();
        this.createCamera();
        this.startRendering();
        this.addControls();
    }

    data = [
{
"_id": "5b6e176c73a1f60e5341966b",
"type": "imu",
"data": {
"accelerometer": {
"x": 313,
"y": -88,
"z": 8292
},
"gyroscope": {
"x": 20,
"y": -25,
"z": 43
},
"magnetometer": {
"x": -215,
"y": 53,
"z": -107
}
},
"timestamp": "2018-08-10T22:53:32.364Z"
},
{
"_id": "5b6e176673a1f60e53419669",
"type": "imu",
"data": {
"accelerometer": {
"x": 357,
"y": -114,
"z": 8283
},
"gyroscope": {
"x": 30,
"y": -25,
"z": 34
},
"magnetometer": {
"x": -207,
"y": 243,
"z": -177
}
},
"timestamp": "2018-08-10T22:53:26.616Z"
},
{
"_id": "5b6e175f73a1f60e53419665",
"type": "imu",
"data": {
"accelerometer": {
"x": 349,
"y": -120,
"z": 8271
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -202,
"y": 216,
"z": -138
}
},
"timestamp": "2018-08-10T22:53:19.615Z"
},
{
"_id": "5b6e175873a1f60e53419661",
"type": "imu",
"data": {
"accelerometer": {
"x": 347,
"y": -122,
"z": 8280
},
"gyroscope": {
"x": 28,
"y": -24,
"z": 37
},
"magnetometer": {
"x": -208,
"y": 220,
"z": -130
}
},
"timestamp": "2018-08-10T22:53:12.523Z"
},
{
"_id": "5b6e175473a1f60e53419660",
"type": "imu",
"data": {
"accelerometer": {
"x": 352,
"y": -127,
"z": 8282
},
"gyroscope": {
"x": 26,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -200,
"y": 214,
"z": -134
}
},
"timestamp": "2018-08-10T22:53:08.414Z"
},
{
"_id": "5b6e174f73a1f60e5341965e",
"type": "imu",
"data": {
"accelerometer": {
"x": 362,
"y": -98,
"z": 8273
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 37
},
"magnetometer": {
"x": -205,
"y": 217,
"z": -127
}
},
"timestamp": "2018-08-10T22:53:03.411Z"
},
{
"_id": "5b6e174a73a1f60e5341965c",
"type": "imu",
"data": {
"accelerometer": {
"x": 168,
"y": -292,
"z": 8298
},
"gyroscope": {
"x": 29,
"y": -24,
"z": 33
},
"magnetometer": {
"x": -205,
"y": 221,
"z": -129
}
},
"timestamp": "2018-08-10T22:52:58.437Z"
},
{
"_id": "5b6e174573a1f60e5341965a",
"type": "imu",
"data": {
"accelerometer": {
"x": 329,
"y": -133,
"z": 8267
},
"gyroscope": {
"x": 25,
"y": -27,
"z": 34
},
"magnetometer": {
"x": -215,
"y": 227,
"z": -155
}
},
"timestamp": "2018-08-10T22:52:53.614Z"
},
{
"_id": "5b6e173e73a1f60e53419656",
"type": "imu",
"data": {
"accelerometer": {
"x": 331,
"y": -117,
"z": 8292
},
"gyroscope": {
"x": 2,
"y": -69,
"z": 38
},
"magnetometer": {
"x": -209,
"y": 249,
"z": -181
}
},
"timestamp": "2018-08-10T22:52:46.615Z"
},
{
"_id": "5b6e173773a1f60e53419652",
"type": "imu",
"data": {
"accelerometer": {
"x": 356,
"y": -107,
"z": 8275
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -187,
"y": 217,
"z": -161
}
},
"timestamp": "2018-08-10T22:52:39.610Z"
},
{
"_id": "5b6e173073a1f60e5341964e",
"type": "imu",
"data": {
"accelerometer": {
"x": 343,
"y": -98,
"z": 8284
},
"gyroscope": {
"x": 28,
"y": -24,
"z": 34
},
"magnetometer": {
"x": -195,
"y": 215,
"z": -143
}
},
"timestamp": "2018-08-10T22:52:32.609Z"
},
{
"_id": "5b6e172973a1f60e5341964a",
"type": "imu",
"data": {
"accelerometer": {
"x": 345,
"y": -110,
"z": 8275
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -197,
"y": 207,
"z": -135
}
},
"timestamp": "2018-08-10T22:52:25.399Z"
},
{
"_id": "5b6e172473a1f60e53419648",
"type": "imu",
"data": {
"accelerometer": {
"x": 323,
"y": -108,
"z": 8276
},
"gyroscope": {
"x": 26,
"y": -26,
"z": 36
},
"magnetometer": {
"x": -192,
"y": 214,
"z": -146
}
},
"timestamp": "2018-08-10T22:52:20.405Z"
},
{
"_id": "5b6e171f73a1f60e53419646",
"type": "imu",
"data": {
"accelerometer": {
"x": 312,
"y": -172,
"z": 8387
},
"gyroscope": {
"x": 1,
"y": -93,
"z": 29
},
"magnetometer": {
"x": -198,
"y": 234,
"z": -176
}
},
"timestamp": "2018-08-10T22:52:15.595Z"
},
{
"_id": "5b6e171973a1f60e53419642",
"type": "imu",
"data": {
"accelerometer": {
"x": -721,
"y": 1381,
"z": 9067
},
"gyroscope": {
"x": -630,
"y": 538,
"z": -3048
},
"magnetometer": {
"x": -54,
"y": 30,
"z": -176
}
},
"timestamp": "2018-08-10T22:52:08.893Z"
},
{
"_id": "5b6e171573a1f60e53419641",
"type": "imu",
"data": {
"accelerometer": {
"x": 835,
"y": -669,
"z": 9129
},
"gyroscope": {
"x": -901,
"y": -407,
"z": -513
},
"magnetometer": {
"x": -277,
"y": 169,
"z": -211
}
},
"timestamp": "2018-08-10T22:52:04.834Z"
},
{
"_id": "5b6e171173a1f60e53419640",
"type": "imu",
"data": {
"accelerometer": {
"x": 657,
"y": 304,
"z": 8699
},
"gyroscope": {
"x": 403,
"y": -423,
"z": 321
},
"magnetometer": {
"x": -312,
"y": 136,
"z": -138
}
},
"timestamp": "2018-08-10T22:52:00.769Z"
},
{
"_id": "5b6e170c73a1f60e5341963f",
"type": "imu",
"data": {
"accelerometer": {
"x": -294,
"y": -946,
"z": 7008
},
"gyroscope": {
"x": -747,
"y": -977,
"z": -160
},
"magnetometer": {
"x": -277,
"y": 207,
"z": -9
}
},
"timestamp": "2018-08-10T22:51:56.709Z"
},
{
"_id": "5b6e170873a1f60e5341963e",
"type": "imu",
"data": {
"accelerometer": {
"x": 1021,
"y": -1646,
"z": 9180
},
"gyroscope": {
"x": -1165,
"y": -362,
"z": -117
},
"magnetometer": {
"x": -198,
"y": 18,
"z": -42
}
},
"timestamp": "2018-08-10T22:51:52.604Z"
},
{
"_id": "5b6e170173a1f60e5341963a",
"type": "imu",
"data": {
"accelerometer": {
"x": 181,
"y": -106,
"z": 8294
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 37
},
"magnetometer": {
"x": -199,
"y": 5,
"z": -51
}
},
"timestamp": "2018-08-10T22:51:45.604Z"
},
{
"_id": "5b6e16fa73a1f60e53419636",
"type": "imu",
"data": {
"accelerometer": {
"x": 182,
"y": -102,
"z": 8283
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -204,
"y": 18,
"z": -42
}
},
"timestamp": "2018-08-10T22:51:38.602Z"
},
{
"_id": "5b6e16f373a1f60e53419632",
"type": "imu",
"data": {
"accelerometer": {
"x": 211,
"y": -135,
"z": 8284
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -200,
"y": 18,
"z": -52
}
},
"timestamp": "2018-08-10T22:51:31.605Z"
},
{
"_id": "5b6e16ec73a1f60e5341962e",
"type": "imu",
"data": {
"accelerometer": {
"x": 221,
"y": -126,
"z": 8284
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 34
},
"magnetometer": {
"x": -194,
"y": 8,
"z": -52
}
},
"timestamp": "2018-08-10T22:51:24.497Z"
},
{
"_id": "5b6e16e873a1f60e5341962d",
"type": "imu",
"data": {
"accelerometer": {
"x": 198,
"y": -52,
"z": 8286
},
"gyroscope": {
"x": 28,
"y": -24,
"z": 36
},
"magnetometer": {
"x": -194,
"y": 14,
"z": -54
}
},
"timestamp": "2018-08-10T22:51:20.396Z"
},
{
"_id": "5b6e16e373a1f60e5341962b",
"type": "imu",
"data": {
"accelerometer": {
"x": 159,
"y": -91,
"z": 8295
},
"gyroscope": {
"x": 32,
"y": -12,
"z": 79
},
"magnetometer": {
"x": -197,
"y": 11,
"z": -61
}
},
"timestamp": "2018-08-10T22:51:15.607Z"
},
{
"_id": "5b6e16df73a1f60e5341962a",
"type": "imu",
"data": {
"accelerometer": {
"x": 586,
"y": -1128,
"z": 7740
},
"gyroscope": {
"x": -479,
"y": 215,
"z": 832
},
"magnetometer": {
"x": -365,
"y": -107,
"z": -13
}
},
"timestamp": "2018-08-10T22:51:11.531Z"
},
{
"_id": "5b6e16db73a1f60e53419629",
"type": "imu",
"data": {
"accelerometer": {
"x": 510,
"y": -289,
"z": 8989
},
"gyroscope": {
"x": 373,
"y": 1187,
"z": -1434
},
"magnetometer": {
"x": -290,
"y": 30,
"z": 118
}
},
"timestamp": "2018-08-10T22:51:07.468Z"
},
{
"_id": "5b6e16d473a1f60e53419626",
"type": "imu",
"data": {
"accelerometer": {
"x": 834,
"y": -11,
"z": 8176
},
"gyroscope": {
"x": 2,
"y": 26,
"z": 20
},
"magnetometer": {
"x": -349,
"y": 141,
"z": -481
}
},
"timestamp": "2018-08-10T22:51:00.593Z"
},
{
"_id": "5b6e16cd73a1f60e53419622",
"type": "imu",
"data": {
"accelerometer": {
"x": 554,
"y": -261,
"z": 8230
},
"gyroscope": {
"x": 28,
"y": -71,
"z": 65
},
"magnetometer": {
"x": -364,
"y": 150,
"z": -462
}
},
"timestamp": "2018-08-10T22:50:53.596Z"
},
{
"_id": "5b6e16c673a1f60e5341961e",
"type": "imu",
"data": {
"accelerometer": {
"x": 584,
"y": -624,
"z": 8235
},
"gyroscope": {
"x": 142,
"y": -68,
"z": 67
},
"magnetometer": {
"x": -368,
"y": 138,
"z": -460
}
},
"timestamp": "2018-08-10T22:50:46.599Z"
},
{
"_id": "5b6e16bf73a1f60e5341961a",
"type": "imu",
"data": {
"accelerometer": {
"x": 167,
"y": -92,
"z": 8282
},
"gyroscope": {
"x": 23,
"y": -61,
"z": 76
},
"magnetometer": {
"x": -377,
"y": 159,
"z": -529
}
},
"timestamp": "2018-08-10T22:50:39.405Z"
},
{
"_id": "5b6e16ba73a1f60e53419618",
"type": "imu",
"data": {
"accelerometer": {
"x": 400,
"y": 161,
"z": 8458
},
"gyroscope": {
"x": -696,
"y": 116,
"z": -2383
},
"magnetometer": {
"x": -195,
"y": 95,
"z": -479
}
},
"timestamp": "2018-08-10T22:50:34.595Z"
},
{
"_id": "5b6e16b673a1f60e53419617",
"type": "imu",
"data": {
"accelerometer": {
"x": 1139,
"y": -1908,
"z": 9729
},
"gyroscope": {
"x": 1018,
"y": -129,
"z": 880
},
"magnetometer": {
"x": -403,
"y": 177,
"z": -375
}
},
"timestamp": "2018-08-10T22:50:30.487Z"
},
{
"_id": "5b6e16b273a1f60e53419616",
"type": "imu",
"data": {
"accelerometer": {
"x": 1079,
"y": -356,
"z": 7979
},
"gyroscope": {
"x": -729,
"y": 238,
"z": -1363
},
"magnetometer": {
"x": -416,
"y": 76,
"z": -184
}
},
"timestamp": "2018-08-10T22:50:26.378Z"
},
{
"_id": "5b6e16ad73a1f60e53419614",
"type": "imu",
"data": {
"accelerometer": {
"x": 247,
"y": -70,
"z": 8309
},
"gyroscope": {
"x": 34,
"y": -31,
"z": 35
},
"magnetometer": {
"x": -359,
"y": -23,
"z": -51
}
},
"timestamp": "2018-08-10T22:50:21.597Z"
},
{
"_id": "5b6e16a673a1f60e53419610",
"type": "imu",
"data": {
"accelerometer": {
"x": 145,
"y": -165,
"z": 8295
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 31
},
"magnetometer": {
"x": -354,
"y": -18,
"z": -52
}
},
"timestamp": "2018-08-10T22:50:14.600Z"
},
{
"_id": "5b6e169f73a1f60e5341960c",
"type": "imu",
"data": {
"accelerometer": {
"x": 185,
"y": -54,
"z": 8288
},
"gyroscope": {
"x": 26,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -367,
"y": -23,
"z": -57
}
},
"timestamp": "2018-08-10T22:50:07.402Z"
},
{
"_id": "5b6e169a73a1f60e5341960a",
"type": "imu",
"data": {
"accelerometer": {
"x": 202,
"y": -91,
"z": 8284
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -360,
"y": -16,
"z": -54
}
},
"timestamp": "2018-08-10T22:50:02.597Z"
},
{
"_id": "5b6e169373a1f60e53419606",
"type": "imu",
"data": {
"accelerometer": {
"x": 178,
"y": -102,
"z": 8285
},
"gyroscope": {
"x": 26,
"y": -24,
"z": 36
},
"magnetometer": {
"x": -358,
"y": -12,
"z": -58
}
},
"timestamp": "2018-08-10T22:49:55.604Z"
},
{
"_id": "5b6e168c73a1f60e53419602",
"type": "imu",
"data": {
"accelerometer": {
"x": 228,
"y": -74,
"z": 8280
},
"gyroscope": {
"x": 27,
"y": -26,
"z": 34
},
"magnetometer": {
"x": -354,
"y": -34,
"z": -54
}
},
"timestamp": "2018-08-10T22:49:48.401Z"
},
{
"_id": "5b6e168773a1f60e53419600",
"type": "imu",
"data": {
"accelerometer": {
"x": 218,
"y": -83,
"z": 8279
},
"gyroscope": {
"x": 29,
"y": -26,
"z": 33
},
"magnetometer": {
"x": -356,
"y": -26,
"z": -56
}
},
"timestamp": "2018-08-10T22:49:43.596Z"
},
{
"_id": "5b6e168073a1f60e534195fc",
"type": "imu",
"data": {
"accelerometer": {
"x": 127,
"y": -241,
"z": 8261
},
"gyroscope": {
"x": 13,
"y": 46,
"z": -291
},
"magnetometer": {
"x": -352,
"y": -26,
"z": -56
}
},
"timestamp": "2018-08-10T22:49:36.611Z"
},
{
"_id": "5b6e167c73a1f60e534195fb",
"type": "imu",
"data": {
"accelerometer": {
"x": 155,
"y": -114,
"z": 8284
},
"gyroscope": {
"x": 28,
"y": -27,
"z": 33
},
"magnetometer": {
"x": -358,
"y": -18,
"z": -50
}
},
"timestamp": "2018-08-10T22:49:32.552Z"
},
{
"_id": "5b6e167873a1f60e534195fa",
"type": "imu",
"data": {
"accelerometer": {
"x": 217,
"y": -39,
"z": 8286
},
"gyroscope": {
"x": 26,
"y": -24,
"z": 33
},
"magnetometer": {
"x": -351,
"y": -21,
"z": -53
}
},
"timestamp": "2018-08-10T22:49:28.492Z"
},
{
"_id": "5b6e1474861f5b0da046659b",
"type": "imu",
"data": {
"accelerometer": {
"x": 228,
"y": -97,
"z": 8285
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 33
},
"magnetometer": {
"x": -357,
"y": -21,
"z": -59
}
},
"timestamp": "2018-08-10T22:40:51.956Z"
},
{
"_id": "5b6e1470861f5b0da046659a",
"type": "imu",
"data": {
"accelerometer": {
"x": 224,
"y": -84,
"z": 8282
},
"gyroscope": {
"x": 26,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -354,
"y": -12,
"z": -60
}
},
"timestamp": "2018-08-10T22:40:47.900Z"
},
{
"_id": "5b6e146c861f5b0da0466599",
"type": "imu",
"data": {
"accelerometer": {
"x": 218,
"y": -88,
"z": 8279
},
"gyroscope": {
"x": 28,
"y": -26,
"z": 36
},
"magnetometer": {
"x": -353,
"y": -29,
"z": -49
}
},
"timestamp": "2018-08-10T22:40:43.844Z"
},
{
"_id": "5b6e1468861f5b0da0466598",
"type": "imu",
"data": {
"accelerometer": {
"x": 218,
"y": -96,
"z": 8290
},
"gyroscope": {
"x": 26,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -350,
"y": -22,
"z": -58
}
},
"timestamp": "2018-08-10T22:40:39.784Z"
},
{
"_id": "5b6e1463861f5b0da0466597",
"type": "imu",
"data": {
"accelerometer": {
"x": 193,
"y": -71,
"z": 8287
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -357,
"y": -21,
"z": -57
}
},
"timestamp": "2018-08-10T22:40:35.725Z"
},
{
"_id": "5b6e145f861f5b0da0466596",
"type": "imu",
"data": {
"accelerometer": {
"x": 234,
"y": -90,
"z": 8280
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -356,
"y": -24,
"z": -54
}
},
"timestamp": "2018-08-10T22:40:31.669Z"
},
{
"_id": "5b6e145b861f5b0da0466595",
"type": "imu",
"data": {
"accelerometer": {
"x": 232,
"y": -113,
"z": 8276
},
"gyroscope": {
"x": 27,
"y": -26,
"z": 36
},
"magnetometer": {
"x": -355,
"y": -11,
"z": -57
}
},
"timestamp": "2018-08-10T22:40:27.609Z"
},
{
"_id": "5b6e1457861f5b0da0466594",
"type": "imu",
"data": {
"accelerometer": {
"x": 238,
"y": -72,
"z": 8282
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -364,
"y": -26,
"z": -50
}
},
"timestamp": "2018-08-10T22:40:23.553Z"
},
{
"_id": "5b6e1453861f5b0da0466593",
"type": "imu",
"data": {
"accelerometer": {
"x": 230,
"y": -93,
"z": 8278
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -360,
"y": -18,
"z": -52
}
},
"timestamp": "2018-08-10T22:40:19.494Z"
},
{
"_id": "5b6e144f861f5b0da0466592",
"type": "imu",
"data": {
"accelerometer": {
"x": 235,
"y": -99,
"z": 8288
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -355,
"y": -11,
"z": -59
}
},
"timestamp": "2018-08-10T22:40:15.438Z"
},
{
"_id": "5b6e144b861f5b0da0466591",
"type": "imu",
"data": {
"accelerometer": {
"x": 199,
"y": -100,
"z": 8293
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 33
},
"magnetometer": {
"x": -363,
"y": -23,
"z": -43
}
},
"timestamp": "2018-08-10T22:40:11.378Z"
},
{
"_id": "5b6e1447861f5b0da0466590",
"type": "imu",
"data": {
"accelerometer": {
"x": 223,
"y": -100,
"z": 8277
},
"gyroscope": {
"x": 28,
"y": -27,
"z": 37
},
"magnetometer": {
"x": -356,
"y": -24,
"z": -42
}
},
"timestamp": "2018-08-10T22:40:07.318Z"
},
{
"_id": "5b6e1443861f5b0da046658f",
"type": "imu",
"data": {
"accelerometer": {
"x": 238,
"y": -122,
"z": 8274
},
"gyroscope": {
"x": 27,
"y": -26,
"z": 39
},
"magnetometer": {
"x": -353,
"y": -23,
"z": -51
}
},
"timestamp": "2018-08-10T22:40:03.263Z"
},
{
"_id": "5b6e143f861f5b0da046658e",
"type": "imu",
"data": {
"accelerometer": {
"x": 224,
"y": -80,
"z": 8266
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 38
},
"magnetometer": {
"x": -358,
"y": -18,
"z": -52
}
},
"timestamp": "2018-08-10T22:39:59.203Z"
},
{
"_id": "5b6e143b861f5b0da046658d",
"type": "imu",
"data": {
"accelerometer": {
"x": 190,
"y": -9,
"z": 8281
},
"gyroscope": {
"x": 28,
"y": -28,
"z": 38
},
"magnetometer": {
"x": -355,
"y": -23,
"z": -53
}
},
"timestamp": "2018-08-10T22:39:55.143Z"
},
{
"_id": "5b6e1437861f5b0da046658c",
"type": "imu",
"data": {
"accelerometer": {
"x": 230,
"y": -89,
"z": 8285
},
"gyroscope": {
"x": 31,
"y": -26,
"z": 36
},
"magnetometer": {
"x": -351,
"y": -27,
"z": -55
}
},
"timestamp": "2018-08-10T22:39:51.087Z"
},
{
"_id": "5b6e1433861f5b0da046658b",
"type": "imu",
"data": {
"accelerometer": {
"x": 233,
"y": -89,
"z": 8280
},
"gyroscope": {
"x": 28,
"y": -26,
"z": 35
},
"magnetometer": {
"x": -361,
"y": -21,
"z": -45
}
},
"timestamp": "2018-08-10T22:39:47.027Z"
},
{
"_id": "5b6e142f861f5b0da046658a",
"type": "imu",
"data": {
"accelerometer": {
"x": 230,
"y": -75,
"z": 8282
},
"gyroscope": {
"x": 28,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -366,
"y": -24,
"z": -58
}
},
"timestamp": "2018-08-10T22:39:42.972Z"
},
{
"_id": "5b6e142b861f5b0da0466589",
"type": "imu",
"data": {
"accelerometer": {
"x": 221,
"y": -82,
"z": 8285
},
"gyroscope": {
"x": 29,
"y": -26,
"z": 35
},
"magnetometer": {
"x": -354,
"y": -16,
"z": -58
}
},
"timestamp": "2018-08-10T22:39:38.912Z"
},
{
"_id": "5b6e1427861f5b0da0466588",
"type": "imu",
"data": {
"accelerometer": {
"x": 230,
"y": -95,
"z": 8281
},
"gyroscope": {
"x": 29,
"y": -25,
"z": 34
},
"magnetometer": {
"x": -361,
"y": -19,
"z": -57
}
},
"timestamp": "2018-08-10T22:39:34.856Z"
},
{
"_id": "5b6e1423861f5b0da0466587",
"type": "imu",
"data": {
"accelerometer": {
"x": 222,
"y": -65,
"z": 8270
},
"gyroscope": {
"x": 29,
"y": -25,
"z": 36
},
"magnetometer": {
"x": -355,
"y": -19,
"z": -63
}
},
"timestamp": "2018-08-10T22:39:30.796Z"
},
{
"_id": "5b6e141f861f5b0da0466586",
"type": "imu",
"data": {
"accelerometer": {
"x": 218,
"y": -95,
"z": 8271
},
"gyroscope": {
"x": 30,
"y": -25,
"z": 34
},
"magnetometer": {
"x": -351,
"y": -19,
"z": -53
}
},
"timestamp": "2018-08-10T22:39:26.740Z"
},
{
"_id": "5b6e141a861f5b0da0466585",
"type": "imu",
"data": {
"accelerometer": {
"x": 215,
"y": -88,
"z": 8284
},
"gyroscope": {
"x": 26,
"y": -24,
"z": 35
},
"magnetometer": {
"x": -359,
"y": -15,
"z": -57
}
},
"timestamp": "2018-08-10T22:39:22.681Z"
},
{
"_id": "5b6e1416861f5b0da0466584",
"type": "imu",
"data": {
"accelerometer": {
"x": 205,
"y": -46,
"z": 8284
},
"gyroscope": {
"x": 27,
"y": -20,
"z": 33
},
"magnetometer": {
"x": -348,
"y": -14,
"z": -62
}
},
"timestamp": "2018-08-10T22:39:18.625Z"
},
{
"_id": "5b6e140f861f5b0da0466580",
"type": "imu",
"data": {
"accelerometer": {
"x": 185,
"y": -107,
"z": 8279
},
"gyroscope": {
"x": 27,
"y": -24,
"z": 35
},
"magnetometer": {
"x": -353,
"y": -17,
"z": -57
}
},
"timestamp": "2018-08-10T22:39:11.612Z"
},
{
"_id": "5b6e1408861f5b0da046657c",
"type": "imu",
"data": {
"accelerometer": {
"x": 157,
"y": -99,
"z": 8278
},
"gyroscope": {
"x": 28,
"y": -24,
"z": 36
},
"magnetometer": {
"x": -350,
"y": -20,
"z": -52
}
},
"timestamp": "2018-08-10T22:39:04.614Z"
},
{
"_id": "5b6e1401861f5b0da0466578",
"type": "imu",
"data": {
"accelerometer": {
"x": 204,
"y": -88,
"z": 8279
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 34
},
"magnetometer": {
"x": -356,
"y": -12,
"z": -64
}
},
"timestamp": "2018-08-10T22:38:57.408Z"
},
{
"_id": "5b6e13fc861f5b0da0466576",
"type": "imu",
"data": {
"accelerometer": {
"x": 177,
"y": -96,
"z": 8276
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -351,
"y": -15,
"z": -55
}
},
"timestamp": "2018-08-10T22:38:52.611Z"
},
{
"_id": "5b6e13f5861f5b0da0466572",
"type": "imu",
"data": {
"accelerometer": {
"x": 231,
"y": -72,
"z": 8274
},
"gyroscope": {
"x": 29,
"y": -26,
"z": 34
},
"magnetometer": {
"x": -350,
"y": -12,
"z": -58
}
},
"timestamp": "2018-08-10T22:38:45.413Z"
},
{
"_id": "5b6e13f0861f5b0da0466570",
"type": "imu",
"data": {
"accelerometer": {
"x": 197,
"y": -89,
"z": 8291
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 35
},
"magnetometer": {
"x": -348,
"y": -10,
"z": -50
}
},
"timestamp": "2018-08-10T22:38:40.612Z"
},
{
"_id": "5b6e13ea861f5b0da046656c",
"type": "imu",
"data": {
"accelerometer": {
"x": 200,
"y": -62,
"z": 8290
},
"gyroscope": {
"x": 27,
"y": -25,
"z": 37
},
"magnetometer": {
"x": -343,
"y": -17,
"z": -59
}
},
"timestamp": "2018-08-10T22:38:34.078Z"
},
{
"_id": "5b6e0896a0e1d50c8f314a8f",
"type": "imu",
"data": {
"accelerometer": {
"x": 146,
"y": -111,
"z": 8280
},
"gyroscope": {
"x": 28,
"y": -22,
"z": 36
},
"magnetometer": {
"x": -336,
"y": 38,
"z": -62
}
},
"timestamp": "2018-08-10T21:50:13.410Z"
},
{
"_id": "5b6e0891a0e1d50c8f314a8d",
"type": "imu",
"data": {
"accelerometer": {
"x": 145,
"y": -113,
"z": 8284
},
"gyroscope": {
"x": 29,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -329,
"y": 45,
"z": -53
}
},
"timestamp": "2018-08-10T21:50:08.408Z"
},
{
"_id": "5b6e088ca0e1d50c8f314a8b",
"type": "imu",
"data": {
"accelerometer": {
"x": 150,
"y": -116,
"z": 8286
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 35
},
"magnetometer": {
"x": -338,
"y": 44,
"z": -64
}
},
"timestamp": "2018-08-10T21:50:03.615Z"
},
{
"_id": "5b6e0885a0e1d50c8f314a87",
"type": "imu",
"data": {
"accelerometer": {
"x": 143,
"y": -100,
"z": 8288
},
"gyroscope": {
"x": 29,
"y": -23,
"z": 38
},
"magnetometer": {
"x": -328,
"y": 46,
"z": -58
}
},
"timestamp": "2018-08-10T21:49:56.409Z"
},
{
"_id": "5b6e0880a0e1d50c8f314a85",
"type": "imu",
"data": {
"accelerometer": {
"x": 147,
"y": -115,
"z": 8278
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -331,
"y": 41,
"z": -63
}
},
"timestamp": "2018-08-10T21:49:51.408Z"
},
{
"_id": "5b6e087ba0e1d50c8f314a83",
"type": "imu",
"data": {
"accelerometer": {
"x": 143,
"y": -112,
"z": 8283
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -328,
"y": 38,
"z": -52
}
},
"timestamp": "2018-08-10T21:49:46.610Z"
},
{
"_id": "5b6e0874a0e1d50c8f314a7f",
"type": "imu",
"data": {
"accelerometer": {
"x": 143,
"y": -115,
"z": 8291
},
"gyroscope": {
"x": 29,
"y": -22,
"z": 36
},
"magnetometer": {
"x": -331,
"y": 51,
"z": -53
}
},
"timestamp": "2018-08-10T21:49:39.400Z"
},
{
"_id": "5b6e086fa0e1d50c8f314a7d",
"type": "imu",
"data": {
"accelerometer": {
"x": 140,
"y": -115,
"z": 8285
},
"gyroscope": {
"x": 28,
"y": -21,
"z": 35
},
"magnetometer": {
"x": -325,
"y": 37,
"z": -65
}
},
"timestamp": "2018-08-10T21:49:34.606Z"
},
{
"_id": "5b6e0868a0e1d50c8f314a79",
"type": "imu",
"data": {
"accelerometer": {
"x": 145,
"y": -106,
"z": 8274
},
"gyroscope": {
"x": 29,
"y": -22,
"z": 36
},
"magnetometer": {
"x": -331,
"y": 47,
"z": -57
}
},
"timestamp": "2018-08-10T21:49:27.597Z"
},
{
"_id": "5b6e0861a0e1d50c8f314a75",
"type": "imu",
"data": {
"accelerometer": {
"x": 146,
"y": -114,
"z": 8286
},
"gyroscope": {
"x": 29,
"y": -23,
"z": 37
},
"magnetometer": {
"x": -333,
"y": 41,
"z": -59
}
},
"timestamp": "2018-08-10T21:49:20.600Z"
},
{
"_id": "5b6e085aa0e1d50c8f314a71",
"type": "imu",
"data": {
"accelerometer": {
"x": 144,
"y": -111,
"z": 8279
},
"gyroscope": {
"x": 29,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -331,
"y": 45,
"z": -55
}
},
"timestamp": "2018-08-10T21:49:13.603Z"
},
{
"_id": "5b6e0853a0e1d50c8f314a6d",
"type": "imu",
"data": {
"accelerometer": {
"x": 136,
"y": -113,
"z": 8278
},
"gyroscope": {
"x": 29,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -326,
"y": 44,
"z": -56
}
},
"timestamp": "2018-08-10T21:49:06.598Z"
},
{
"_id": "5b6e084ca0e1d50c8f314a69",
"type": "imu",
"data": {
"accelerometer": {
"x": 146,
"y": -112,
"z": 8294
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -325,
"y": 51,
"z": -69
}
},
"timestamp": "2018-08-10T21:48:59.596Z"
},
{
"_id": "5b6e0845a0e1d50c8f314a65",
"type": "imu",
"data": {
"accelerometer": {
"x": 140,
"y": -109,
"z": 8287
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -329,
"y": 47,
"z": -51
}
},
"timestamp": "2018-08-10T21:48:52.595Z"
},
{
"_id": "5b6e083ea0e1d50c8f314a61",
"type": "imu",
"data": {
"accelerometer": {
"x": 148,
"y": -113,
"z": 8287
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -331,
"y": 41,
"z": -61
}
},
"timestamp": "2018-08-10T21:48:45.409Z"
},
{
"_id": "5b6e0839a0e1d50c8f314a5f",
"type": "imu",
"data": {
"accelerometer": {
"x": 143,
"y": -114,
"z": 8278
},
"gyroscope": {
"x": 30,
"y": -23,
"z": 37
},
"magnetometer": {
"x": -331,
"y": 45,
"z": -53
}
},
"timestamp": "2018-08-10T21:48:40.604Z"
},
{
"_id": "5b6e0832a0e1d50c8f314a5b",
"type": "imu",
"data": {
"accelerometer": {
"x": 143,
"y": -107,
"z": 8287
},
"gyroscope": {
"x": 29,
"y": -21,
"z": 37
},
"magnetometer": {
"x": -327,
"y": 39,
"z": -59
}
},
"timestamp": "2018-08-10T21:48:33.406Z"
},
{
"_id": "5b6e082da0e1d50c8f314a59",
"type": "imu",
"data": {
"accelerometer": {
"x": 147,
"y": -109,
"z": 8289
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -332,
"y": 42,
"z": -60
}
},
"timestamp": "2018-08-10T21:48:28.597Z"
},
{
"_id": "5b6e0826a0e1d50c8f314a55",
"type": "imu",
"data": {
"accelerometer": {
"x": 140,
"y": -109,
"z": 8290
},
"gyroscope": {
"x": 29,
"y": -24,
"z": 36
},
"magnetometer": {
"x": -331,
"y": 47,
"z": -61
}
},
"timestamp": "2018-08-10T21:48:21.596Z"
},
{
"_id": "5b6e081fa0e1d50c8f314a51",
"type": "imu",
"data": {
"accelerometer": {
"x": 148,
"y": -114,
"z": 8284
},
"gyroscope": {
"x": 29,
"y": -22,
"z": 37
},
"magnetometer": {
"x": -340,
"y": 42,
"z": -62
}
},
"timestamp": "2018-08-10T21:48:14.598Z"
},
{
"_id": "5b6e0818a0e1d50c8f314a4d",
"type": "imu",
"data": {
"accelerometer": {
"x": 139,
"y": -111,
"z": 8287
},
"gyroscope": {
"x": 30,
"y": -21,
"z": 35
},
"magnetometer": {
"x": -331,
"y": 43,
"z": -67
}
},
"timestamp": "2018-08-10T21:48:07.601Z"
},
{
"_id": "5b6e0811a0e1d50c8f314a49",
"type": "imu",
"data": {
"accelerometer": {
"x": 142,
"y": -111,
"z": 8289
},
"gyroscope": {
"x": 28,
"y": -23,
"z": 36
},
"magnetometer": {
"x": -333,
"y": 45,
"z": -61
}
},
"timestamp": "2018-08-10T21:48:00.596Z"
},
{
"_id": "5b6e080aa0e1d50c8f314a45",
"type": "imu",
"data": {
"accelerometer": {
"x": 133,
"y": -112,
"z": 8283
},
"gyroscope": {
"x": 28,
"y": -24,
"z": 35
},
"magnetometer": {
"x": -334,
"y": 42,
"z": -58
}
},
"timestamp": "2018-08-10T21:47:53.599Z"
},
{
"_id": "5b6e0803a0e1d50c8f314a41",
"type": "imu",
"data": {
"accelerometer": {
"x": 150,
"y": -112,
"z": 8277
},
"gyroscope": {
"x": 27,
"y": -22,
"z": 36
},
"magnetometer": {
"x": -323,
"y": 37,
"z": -59
}
},
"timestamp": "2018-08-10T21:47:46.598Z"
},
{
"_id": "5b6e07fca0e1d50c8f314a3d",
"type": "imu",
"data": {
"accelerometer": {
"x": 133,
"y": -114,
"z": 8287
},
"gyroscope": {
"x": 29,
"y": -22,
"z": 35
},
"magnetometer": {
"x": -337,
"y": 49,
"z": -67
}
},
"timestamp": "2018-08-10T21:47:39.568Z"
}
];

}
