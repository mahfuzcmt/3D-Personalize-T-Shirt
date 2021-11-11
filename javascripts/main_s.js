if (!Detector.webgl) Detector.addGetWebGLMessage();
var colors = ['rgb(255, 255, 255)', 'rgb(255, 248, 241)', 'rgb(233, 233, 225)', 'rgb(223, 224, 222)', 'rgb(197, 205, 210)', 'rgb(255, 243, 231)', 'rgb(255, 236, 213)', 'rgb(237, 210, 171)', 'rgb(194, 155, 119)', 'rgb(169, 154, 154)',
    'rgb(144, 118, 113)', 'rgb(98, 78, 75)', 'rgb(115, 105, 93)', 'rgb(118, 47, 21)', 'rgb(80, 5, 0)', 'rgb(94, 0, 0)', 'rgb(255, 234, 92)', 'rgb(255, 242, 0)', 'rgb(255, 210, 0)', 'rgb(237, 183, 48)', 'rgb(242, 168, 50)', 'rgb(239, 146, 28)', 'rgb(232, 78, 46)', 'rgb(213, 0, 50)', 'rgb(206, 17, 64)', 'rgb(230, 28, 62)', 'rgb(185, 61, 48)', 'rgb(95, 0, 42)', 'rgb(117, 0, 48)', 'rgb(160, 14, 75)', 'rgb(138, 5, 54)', 'rgb(188, 35, 101)', 'rgb(132, 66, 127)', 'rgb(165, 42, 117)', 'rgb(227, 3, 140)', 'rgb(167, 108, 147)', 'rgb(233, 108, 160)', 'rgb(229, 152, 168)', 'rgb(121, 125, 174)', 'rgb(87, 71, 143)', 'rgb(84, 53, 112)', 'rgb(46, 51, 112)', 'rgb(26, 24, 25)', 'rgb(59, 59, 60)', 'rgb(0, 0, 60)', 'rgb(0, 23, 69)', 'rgb(0, 38, 87)', 'rgb(0, 50, 98)', 'rgb(0, 66, 105)', 'rgb(0, 107, 163)', 'rgb(0, 83, 124)', 'rgb(0, 119, 172)', 'rgb(0, 152, 196)', 'rgb(0, 180, 221)', 'rgb(209, 228, 246)', 'rgb(0, 166, 219)', 'rgb(18, 195, 244)', 'rgb(16, 180, 208)', 'rgb(0, 157, 179)', 'rgb(87, 197, 202)', 'rgb(128, 196, 210)', 'rgb(0, 181, 173)', 'rgb(0, 171, 163)', 'rgb(0, 177, 135)', 'rgb(175, 219, 190)', 'rgb(182, 208, 82)', 'rgb(116, 184, 110)', 'rgb(80, 176, 112)', 'rgb(0, 162, 114)', 'rgb(164, 176, 106)', 'rgb(0, 105, 119)', 'rgb(0, 109, 107)', 'rgb(0, 103, 71)', 'rgb(0, 85, 59)', 'rgb(0, 72, 21)', 'rgb(0, 52, 31)'];

var fonts = ['Abril Fatface', 'Advent Pro', 'Arvo', 'Bahiana', 'Baloo Da', 'Bigshot One', 'Bowlby One', 'Bungee', 'Bungee Hairline', 'Bungee Outline', 'Bungee Shade', 'Codystar', 'Coiny', 'Creepster', 'Emblema One', 'Erica One', 'Expletus Sans', 'Fascinate', 'Finger Paint', 'Goblin One', 'Graduate', 'Iceberg', 'Impact', 'Jolly Lodger', 'Keania One', 'Kumar One', 'Kumar One Outline', 'Krona One', 'Lalezar', 'Londrina Solid', 'Metamorphous', 'Mogra', 'Mr Dafoe', 'Nosifer', 'Overlock SC', 'Piedra', 'Pirata One', 'Plaster', 'Rakkas', 'Raleway', 'Revalia', 'Roboto', 'Ruslan Display', 'Rye', 'Sancreek', 'Sarina', 'Sedgwick Ave Display', 'Slackey', 'Smokum', 'Sonsie One', 'Space Mono', 'Trade Winds', 'UnifrakturCook', 'UnifrakturMaguntia', 'Unlock', 'Vampiro One', 'Vibur', 'Viga', 'VT323', 'Wallpoet', 'Warnes', 'Wire One', 'Work Sans'];

var container, stats, controls;
var camera, scene, renderer, light, material, materialCount;
var selectedMaterial = 'ZONE(base)';
var selectedText = "TEXT(team-name)";
var animations = [];

var manager = new THREE.LoadingManager();

var mixers = [];
var object;
var operand1, operand2, operator1, operator2, solution, question, answer;
var textureLoader, map, textureMaterial;
var mesh;
var materials = [];
var geometries = [];

var width = window.innerWidth;
var height = window.innerHeight;
if (width < height) {
    height = width;
}
var pixelRatio = window.devicePixelRatio;
console.log('pixelRatio', pixelRatio);
init();

function init() {

    var modelContainer = document.getElementById('model-container');
    container = document.createElement('div');
    document.getElementById('container').appendChild(container);

    scene = new THREE.Scene();
    var screen_rate = width / height;

    camera = new THREE.PerspectiveCamera(30, screen_rate, 100, 1200);
    camera.position.set(500, 0, 0);
    scene.add(camera);
    controls = new THREE.OrbitControls(camera, container);
    controls.minDistance = 200;
    controls.maxDistance = 700;
    controls.update();
    var light, materials;
    //scene.add(new THREE.AmbientLight(0xffffff));
    scene.add(new THREE.AmbientLight(0x666666));

    var lights = [
        {color: 0xffffff, intensity: 0.53, position: {x: -500, y: 320, z: 500}, lookAt: {x: 0, y: 0, z: 0}},
        {color: 0xffffff, intensity: 0.3, position: {x: 200, y: 50, z: 500}, lookAt: {x: 0, y: 0, z: 0}},
        {color: 0xffffff, intensity: 0.4, position: {x: 0, y: 100, z: -500}, lookAt: {x: 0, y: 0, z: 0}},
        {color: 0xffffff, intensity: 0.3, position: {x: 1, y: 0, z: 0}, lookAt: {x: 0, y: 0, z: 0}},
        {color: 0xffffff, intensity: 0.3, position: {x: -1, y: 0, z: 0}, lookAt: {x: 0, y: 0, z: 0}}
    ]
    //{color:0xffffbb,intensity: 0.5,position:{x: 0, y: 0, z: 4},lookAt:  {x: 0, y: 0, z: 0},angle:0.5,distance:6}
    lights.forEach(function (light) {

        var dlight = new THREE.DirectionalLight(light.color, light.intensity);
        var p = light.position;
        var l = light.lookAt;
        dlight.position.set(p.x, p.y, p.z);
        dlight.lookAt(l.x, l.y, l.z);
        if (light.angle) {
        }
        scene.add(dlight);

    })
    object = new THREE.Object3D();
    var slight = new THREE.SpotLight(0xffffbb, 0.1);
    slight.position.set(0, 0, 0);
    slight.lookAt(0, 0, 0);
    //slight.angle(0.5);
    slight.distance = 100;
    slight.target = object;
    slight.angle = 0.4;
    //scene.add(slight);

    //light = new THREE.DirectionalLight(0xffffff, 1.75);
    light = new THREE.DirectionalLight(0xdfebff, 0.3);
    light.position.set(500, 100, 80);


    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    var d = 300;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 100;
    light.shadowDarkness = 0.5;
    light.shadowCameraVisible = true;
    scene.add(light);

    textureLoader = new THREE.TextureLoader();
    changeProduct();
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;

    window.addEventListener('resize', onWindowResize, false);

    animate();

}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width < height) {
        height = width;
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

//
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}


function render() {
    renderer.render(scene, camera);
}

var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};

var onError = function (xhr) {
    console.error(xhr);
};


function obj2_model_load(model) {
    var loader = new THREE.OBJLoader2(manager);
    loader.load('assets/' + model + '.obj', function (data) {
        if (object != null) {
            scene.remove(object);
        }
        object = null;
        object = data.detail.loaderRootNode;
        console.log(object);
        materials = [];
        object.traverse(function (node) {
            if (node.isMesh) {
                node.material = textureMaterial
                node.geometry.uvsNeedUpdate = true;
                //object = node;
            }
        });
        var scale = height / 3;
        object.scale.set(scale, scale, scale);
        object.position.set(0, -scale * 1.36, 15);
        object.rotation.set(0, Math.PI / 2, 0);
        object.receiveShadow = true;
        object.castShadow = true;
        scene.add(object);
    });
}


function selectMaterial(id) {
    selectedMaterial = id;
    load_materials();
}

var selectedColors = [];

function setColorBk(color) {
    selectedColors.push(color);
    object.traverse(function (node) {
        if (node.isMesh) {
            node.material[selectedMaterial].color.set(color);
        }
    });
    render();
    console.log('color', selectedColors);
}

function changeProduct() {
    loadSvg(function (resp) {
        obj2_model_load(gender + '/cat' + category + '/model');

    });

}

function loadSvg(response) {
    $.get('assets/' + gender + '/cat' + category + '/prod' + product + '/pattern.svg', function (data) {
        var svgData = new XMLSerializer().serializeToString(data.documentElement);
        $('#svgContainer').empty();
        $('#svgContainer').append(svgData).html();
        set_materials(function (resp) {
            response(resp);
        });
    });
}

function set_materials(response) {

    var baseSvg = document.getElementById("svgContainer").querySelector("svg");
    var baseSvgData = (new XMLSerializer()).serializeToString(baseSvg);

    $('#svgPathContainer').empty();
    $('#svgTextContainer').empty();
    $('#svgPathContainer').append(baseSvgData).html();
    $('#svgTextContainer').append(baseSvgData).html();
    var texts = $('#svgPathContainer text');
    for (var i = 0; i < texts.length; i++) {
        $(texts[i]).remove();
    }
    var paths = $('#svgTextContainer path');
    for (var i = 0; i < paths.length; i++) {
        $(paths[i]).remove();
    }

    var svg = document.getElementById("svgPathContainer").querySelector("svg");
    var svgData = (new XMLSerializer()).serializeToString(svg);
    var canvas = document.createElement("canvas");
    canvas.width = $(svg).width();
    canvas.height = $(svg).height();
    var ctx = canvas.getContext("2d");

    var img = document.createElement("img");
    var material;
    img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))));

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        var oImg = document.createElement("img");
        oImg.width = "100px";
        oImg.height = "100px";
        oImg.setAttribute("src", 'assets/' + gender + '/cat' + category + '/texture.png');
        oImg.onload = function () {
            ctx.globalAlpha = 0.4;
            ctx.scale(0.3, 0.3);
            var pattern = ctx.createPattern(oImg, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width * 3.33, canvas.height * 3.33);
            ctx.globalAlpha = 1;
            ctx.scale(3.33, 3.33);
            var svgText = document.getElementById("svgTextContainer").querySelector("svg");
            var svgTextData = (new XMLSerializer()).serializeToString(svgText);
            var imgT = document.createElement("img");
            imgT.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgTextData))));
            imgT.onload = function () {
                ctx.drawImage(imgT, 0, 0);
                var texture = new THREE.Texture(canvas);
                texture.needsUpdate = true;
                map = texture;
                textureMaterial = new THREE.MeshPhongMaterial({map: map});
                load_materials();
                response(true);
            }
        }
    };
}

function load_materials() {
    var paths = $('#svgContainer path');
    console.log('paths', paths.length);
    var materialContainer = '';
    for (var i = 0; i < paths.length; i++) {
        var bg = $(paths[i]).attr('fill');
        var id = $(paths[i]).attr('id');
        if (bg != undefined && id != undefined) {
            var data = id.split('(')[1].split(')')[0];
            var selected = (selectedMaterial == id) ? 'active' : '';
            materialContainer += '<div id="mat_' + data + '" class="xixcust ' + selected + '" onclick="selectMaterial(\'' + id + '\')"><span class="molids" style="background:' + bg + '"></span><span class="egseas">' + id + '</span></div>';
        }
    }
    load_texts();

    $('.materials').empty();
    $('.materials').append(materialContainer).html();
}

function load_texts() {
    var texts = $('#svgContainer text');
    console.log('texts', texts);
    var textContainer = '';
    for (var i = 0; i < texts.length; i++) {
        var id = $(texts[i]).attr('id');
        var bg = $(texts[i]).css('fill');
        var selected = (selectedText == id) ? 'active' : '';
        if (id != undefined) {
            textContainer += '<div id="txt_' + id + '" class="xixcust ' + selected + '" onclick="load_text_details(\'' + id + '\')"><span class="molids" style="background:' + bg + '"></span><span class="egseas">' + id + '</span></div>';
        }
    }
    $('.texts').empty();
    $('.texts').append(textContainer).html();
}

function load_text_details(idd) {

    selectedText = idd;
    load_texts();
    var id = document.getElementById(idd);
    var text = $(id).html();
    var ff = $(id).attr('font-family');
    var sff = $(id).css('font-family');
    var fs = $(id).css('font-size');
    var textEditContainer = '<div class="text-editor-container"><h1>' + idd + '</h1>';
    textEditContainer += '<div class="form-group"><input id="ftext" onchange="changeTeamName(event)" type="text" class="form-control" value="' + text + '"/></div>';
    var fontFamilies = '<select id="ff" onchange="changeTeamName(event)" class="form-control"><option value="">choose font</option>';
    fonts.forEach(function (font) {
        var selected = (ff == font) ? 'selected' : '';
        fontFamilies += '<option ' + selected + ' value="' + font + '">' + font + '</option>';
    })
    fontFamilies += '</select>';
    textEditContainer += '<div class="form-group"><label for="ff-list">Font-Family</label>' + fontFamilies + '</div>';
    textEditContainer += '<div class="form-group"><label for="fs">Font-Family</label><input id="fs" type="text" onchange="changeTeamName(event)" class="form-control" value="' + fs + '"/></div></div>';
    $('.text-editor').empty();
    $('.text-editor').append(textEditContainer).html();
}

function changeTeamName(e) {

    console.log('e', e.target.value);
    update_svg(e.target.id, e.target.value);
}

function downloadSvg(fileName) {
    var svgData = $("svg")[0].outerHTML;
    var svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "3d-custom-t-shirt-design.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function downloadImage(value) {
    console.info("Downloading....")
    var texts = $('#svgContainer text');
    for (var i = 0; i < texts.length; i++) {
        var id = $(texts[i]).attr('id');
        console.log("ID:" + id + ", Value:" + $(texts[i])[0].innerHTML);
    }
    var paths = $('#svgContainer path');
    for (var i = 0; i < paths.length; i++) {
        var id = $(paths[i]).attr('id');
        $('#svgContainer path')[4].getAttribute("fill")
        console.log("ID:" + id + ", Value:" + $(paths[i])[0].getAttribute("fill"));
    }
    downloadSvg("test.png")
}

function setGender(value) {
    gender = value;
    $('#gender').html(value);
    changeProduct();
    render();
}

function setCategory(value) {
    category = value;
    $('#category').html(value);
    changeProduct();
    render();
}

function setProduct(value) {
    product = value;
    $('#product').html(value);
    changeProduct();
    render();
}

loadColors();

function loadColors() {
    var colorContainer = "<h3>Colors</h3>";
    colors.forEach(function (color) {
        colorContainer += '<div class="colaz" onClick="setColor(\'' + color + '\')" style="background:' + color + ';"></div>';
    });
    $('.color-palete').append(colorContainer).html();
}


function setColor(color) {
    update_svg('color', color);

}

function update_svg(op, value) {
    if (op == 'color') {
        document.getElementById(selectedMaterial).setAttribute("fill", value);
    }
    if (op == 'ftext') {
        document.getElementById(selectedText).innerHTML = value;
    }
    if (op == 'ff') {
        document.getElementById(selectedText).setAttribute('font-family', value);
        document.getElementById(selectedText).style.fontFamily = value;
    }
    if (op == 'fs') {
        document.getElementById(selectedText).style.fontSize = value;
    }

    set_materials(function (resp) {
        object.children[0].material = textureMaterial;
        render();
    });

}

function createCircleTexture(color, size, response) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    // create texture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    response(texture);
}