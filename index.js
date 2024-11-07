import * as three from './threejs/build/three.module.js'
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js'

var scene, camera, renderer, controller;

const init = () =>{
    //buat scene
    scene = new three.Scene();

    //buat camera
    let fov = 45;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let aspect = w/h;
    let near = 0.1;
    let far = 1000;

    camera = new three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 34, 30);
    camera.lookAt(0, 10, 0);

    //buat render
    renderer = new three.WebGLRenderer({antialias: true});
    renderer.setSize(w, h);
    renderer.setClearColor('#EEEEEE');
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //buat controller
    controller = new OrbitControls(camera, renderer.domElement);

    createObject();

}

const render = () =>{
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controller.update();
}

window.onload = () =>{
    init();
    render();
}

window.onresize = () =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}

const createObject = () =>{
    let floor = createBox(9, 2, 9, '#888888');
    floor.position.set(0, 0, 0);

    let body = createCylinder(2.6, 4, 20, 100, 1, false, '#FFFFFF');
    body.position.set(0, 10, 0);

    let neck = createCylinder(3.6, 3.6, 0.5, 20, 1, false, '#AC443C');
    neck.position.set(0, 20, 0);

    let fence = createFence(3.2, 3.2, 1, 10, 1, true, '#5C0000', true);
    fence.position.set(0, 21, 0);

    let head = createCylinder(2.2, 2.2, 3, 30, 1, false, '#FFFFFF');
    head.position.set(0, 22, 0);

    let roof = createCone(3.5, 3.5, 100, 1, false, '#AC443C');
    roof.position.set(0, 25, 0);

    let top = createSphere(0.5, '#AC443C');
    top.position.set(0, 26.5, 0);

    let plane = createPlane(100, 100, '#EFDBB9');
    plane.position.set(0, -1, 0);
    plane.rotation.set(Math.PI/2, 0, 0);

    let pointLight = createPointLight('#FFFFFF', 1.2, 10000, 0);
    pointLight.position.set(80, 100, 100);

    let ambient = createAmbientLight('#FFFFFF', 0.2);


    let objects = [
        floor,
        body,
        neck,
        fence,
        head,
        roof,
        top,
        plane,
        pointLight,
        ambient
    ];

    objects.forEach(obj =>{
        scene.add(obj)
    });
}

const createBox = (width, height, depth, color) =>{
    //buat geometry
    let geometry = new three.BoxGeometry(width, height, depth);

    //buat material
    let material = new three.MeshLambertMaterial({
        color: color
    });

    //buat mesh
    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createCylinder = (radTop, radBot, height, radSeg, heightSeg, openEd, color) =>{
    //buat geometry
    let geometry = new three.CylinderGeometry(radTop, radBot, height, radSeg, heightSeg, openEd);

    //buat material
    let material = new three.MeshStandardMaterial({
        color: color
    });

    //buat mesh
    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createFence = (radTop, radBot, height, radSeg, heightSeg, openEd, color, wireframe) =>{
    //buat geometry
    let geometry = new three.CylinderGeometry(radTop, radBot, height, radSeg, heightSeg, openEd);

    //buat material
    let material = new three.MeshStandardMaterial({
        color: color,
        wireframe: wireframe
    });

    //buat mesh
    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createCone = (radius, height, radSeg, heightSeg, openEd, color) =>{
    //buat geometry
    let geometry = new three.ConeGeometry(radius, height, radSeg, heightSeg, openEd);

    //buat material
    let material = new three.MeshStandardMaterial({
        color: color
    });

    //buat mesh
    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createSphere = (radius, color) =>{
    //buat geometry
    let geometry = new three.SphereGeometry(radius);

    //buat material
    let material = new three.MeshStandardMaterial({
        color: color
    });

    //buat mesh
    let mesh = new three.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}

const createPlane = (width, height, color) =>{
    //buat geometry
    let geometry = new three.PlaneGeometry(width, height);

    //buat material
    let material = new three.MeshLambertMaterial({
        color: color,
        side: three.DoubleSide
    });

    //buat mesh
    let mesh = new three.Mesh(geometry, material);
    mesh.receiveShadow = true;

    return mesh;
}

const createPointLight = (color, intensity, distance, decay) =>{
    let light = new three.PointLight(color, intensity, distance, decay);
    light.castShadow = true;

    return light;
}

const createAmbientLight = (color, intensity) =>{
    let light = new three.AmbientLight(color, intensity);

    return light;
}