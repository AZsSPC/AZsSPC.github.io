import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = [];  // just an array we can use to rotate the cubes
    const loader = new THREE.TextureLoader();
    loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg', (texture) => {
        const material = new THREE.MeshBasicMaterial({
            map: texture,
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cubes.push(cube);  // add to our list of cubes to rotate
    });

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = .2 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
const EVENTS = [
    /*{
     "location": [{w:0-360deg,h:0-180deg}],     область, где произошло событие; указывается точками, по часовой стрелке
     "year_start": 0,                           начало события
     "year_end": 2,                             конец события
     "title": "Title",                          заголовок
     "lore_short": "short lore",                краткое описание
     "lore": "full lore about event",           полное поисание
     "tags": []                                 теги; регистр игнорируется
                                                    *   - тег
                                                    P_* - человек, относящийся к событию
                                                    N_* - страна, относящаяся к событию
                                                    D_* - документ относящийся к событию
                                                    E_* - другое событие, относящееся к данному

     }*/
    {
        "location": [],
        "year_start": 0,
        "year_end": 2,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 0,
        "year_end": 2,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }
];
