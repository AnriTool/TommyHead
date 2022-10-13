import * as THREE from "./THREE/build/three.module.js"
import { GUI } from './THREE/examples/jsm/libs/lil-gui.module.min.js';
import {GLTFLoader} from "./THREE/examples/jsm/loaders/GLTFLoader.js"


window.onload = function(){
		var width = window.innerWidth;
		var height = window.innerHeight;
		var canvas = document.getElementById('canvas');
		var isLoad = false;
		//Структура с "настройками в gui"
		let options = {
			ToCursor: true, 
			reset: function () {

				Reset();

			}
		};
		
		//Настройки канваса
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		
		//Рендерер
		var renderer = new THREE.WebGLRenderer({canvas: canvas});
		renderer.setClearColor(0x454545);
		
		//Главная сцена
		var scene = new THREE.Scene();
		
		//Камера
		var camera = new THREE.PerspectiveCamera(45, width/height, 100, 1000);
		
		camera.position.set(0,0,300);
		
		//Свет
		var light = new THREE.DirectionalLight(0xFFFFFF,2);
		light.position.set(0,0,10);
		scene.add(light);

		//Загрузчик gltf модели
		const loader = new GLTFLoader()
		var root; //Вся gltf сцена
			var Head;
			var llid;
			var lbrow1;
			var lbrow2;
			var rlid;
			var rbrow1;
			var rbrow2;
			var jaw1;
			var leye;
			var reye;
			var lcheek;
			var rcheek;

		const Texloader = new THREE.TextureLoader();
		const bgTexture = Texloader.load('assets/background.png');
		scene.background = bgTexture;

		//Материал, у которого будет меняться color.
		var newMat = new THREE.MeshLambertMaterial();

		//Вспомогательные переменные
		var scalefactor = 600;

		//Загружаю модель
		loader.load('assets/face.gltf', function(gltf) {	
			root = gltf.scene; //Загружаю модель
			root.scale.set(scalefactor,scalefactor,scalefactor); //Увеличиваю в размерах
			root.position.y -= 100; //Меняю позицию по высоте
			root.rotation.x = Math.PI/2
			scene.add(root); // Добавляю модель на основную сцену
			isLoad = true; //Изменяю вспомогательную переменную
		
			console.log(dumpObject(root).join('\n')); //Log информация для отладки
			console.log(root) //Log информация для отладки


			Head =  root.getObjectByName('Head'); 

			llid =  root.getObjectByName('llid');  //Левое веко
			lbrow1 = root.getObjectByName('lbrow1'); //Левая бровь1
			lbrow2 = root.getObjectByName('lbrow2'); //Левая бровь2


			rlid =  root.getObjectByName('rlid');  //Правое веко
			rbrow1 = root.getObjectByName('rbrow1'); //Левая бровь1
			rbrow2 = root.getObjectByName('rbrow2'); //Левая бровь2

			jaw1 =  root.getObjectByName('jaw1');  //Челюсть1

			leye =  root.getObjectByName('leye');  //Левый глаз
			reye =  root.getObjectByName('reye');  //Правый глаз

			lcheek = root.getObjectByName('lcheek');
			rcheek = root.getObjectByName('rcheek');
		

			const gui = new GUI();
			//GUI
			
				//Голова
				const headFolder = gui.addFolder('Head');
				headFolder.add(options, "ToCursor");
				headFolder.add(Head.rotation, "z",-1,1,-0.01).onChange(function(value){
					Head.rotation.z = value;
				});
				headFolder.add(Head.rotation, "x",-1,1,0.01).onChange(function(value){
					Head.rotation.x = value;
				});

				//Веки верхние
				const lidFolder = gui.addFolder('Eyelids');
				lidFolder.add(llid.rotation, 'z',1.3,1.6,0.01).onChange(function(value){
					llid.rotation.z = value;
				}).name('llid');
				lidFolder.add(rlid.rotation, 'z',1.3,1.6,0.01).onChange(function(value){
					rlid.rotation.z = value;
				}).name('rlid');
				//Веки нижние
				const cheekFolder = gui.addFolder('Cheeks');
				cheekFolder.add(lcheek.rotation, 'z',1.2,1.6,0.01).onChange(function(value){
					lcheek.rotation.z = value;
				}).name('lcheek');
				cheekFolder.add(rcheek.rotation, 'z',1.2,1.6,0.01).onChange(function(value){
					rcheek.rotation.z = value;
				}).name('rcheek');

				//Брови
				const browFolder = gui.addFolder('Eyebrows');
				browFolder.add(lbrow1.rotation,'z',1,1.7,0.01).onChange(function(value){
					lbrow1.rotation.z = value;
				}).name('lbrow1');
				browFolder.add(lbrow2.rotation,'z',1.1,1.9,0.01).onChange(function(value){
					lbrow2.rotation.z = value;
				}).name('lbrow2');
				browFolder.add(rbrow1.rotation,'z',1,1.7,0.01).onChange(function(value){
					rbrow1.rotation.z = value;
				}).name('rbrow1');
				browFolder.add(rbrow2.rotation,'z',1.1,1.9,0.01).onChange(function(value){
					rbrow2.rotation.z = value;
				}).name('rbrow2');

				//Глаза
				const eyeFolder = gui.addFolder('Eyes');
				eyeFolder.add(leye.rotation,'z',1.29,2,0.01).onChange(function(value){
					leye.rotation.z = value;
				}).name('leye z');
				eyeFolder.add(leye.rotation,'x',-0.4,0.4,0.01).onChange(function(value){
					leye.rotation.x = value;
				}).name('leye x');
				eyeFolder.add(reye.rotation,'z',1.29,2,0.01).onChange(function(value){
					reye.rotation.z = value;
				}).name('reye z');
				eyeFolder.add(reye.rotation,'x',-0.4,0.4,0.01).onChange(function(value){
					reye.rotation.x = value;
				}).name('reye x');

				//Челюсть
				const jawFolder = gui.addFolder('Jaw');
				jawFolder.add(jaw1.rotation,'z',2.72,3.2,0.01).onChange(function(value){
					jaw1.rotation.z = value;})
			
				gui.add( options, 'reset' );
		
		
		
		
		
		
		
		
		}) 



		/*

		Head [Bone]
      │   ├─Bip01_HeadNub [Bone]
      │   ├─lbrow2 [Bone]
      │   ├─llid [Bone]
      │   ├─rlid [Bone]
      │   ├─lbrow1 [Bone]
      │   ├─rbrow1 [Bone]
      │   ├─rbrow2 [Bone]
      │   ├─jaw1 [Bone]
      │   │ └─jaw2 [Bone]
      │   │   └─llip [Bone]
      │   │     └─llip01 [Bone]
      │   ├─rtlip1 [Bone]
      │   │ └─rtlip2 [Bone]
      │   │   └─rtlip3 [Bone]
      │   ├─ltlip1 [Bone]
      │   │ └─ltlip2 [Bone]
      │   │   └─ltlip3 [Bone]
      │   ├─leye [Bone]
      │   ├─reye [Bone]
      │   ├─lcheek [Bone]
      │   ├─rcheek [Bone]
      │   ├─lcorner [Bone]
      │   └─rcorner [Bone]
      └─neutral_bone [Bone]

*/


		//Основная рекурсивная функция, в которой обновляются кадры
		function loop(){
			if(isLoad){
					
					
			}	
			
			//Перестройка размеров окна, возможно ненужная функция, потому что центр сцены всё-равно не сбрасывается
			

			//Выставляю мсвет в позицию камеры
			//light.position.x = camera.position.x
			//light.position.z = camera.position.z
			
			//Рендерю сцену
			renderer.render(scene, camera);
			

			requestAnimationFrame(function() {loop();});
		}
		loop();



		//Функция для отладки, показывает всю иерархию gltf файла
		function dumpObject(obj, lines = [], isLast = true, prefix = '') {
			const localPrefix = isLast ? '└─' : '├─';
			lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
			const newPrefix = prefix + (isLast ? '  ' : '│ ');
			const lastNdx = obj.children.length - 1;
			obj.children.forEach((child, ndx) => {
			  const isLast = ndx === lastNdx;
			  dumpObject(child, lines, isLast, newPrefix);
			});
			return lines;
		  }	
		 
////////////////////////////


function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
  }


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left - width/2) / (width/2);
    const y = (event.clientY - rect.top - height/2) / (height/2);
   // console.log("x: " + x + " y: " + y)
if(isLoad && options.ToCursor){
	Head.rotation.z = y;
	Head.rotation.x = x;
}

}

canvas.addEventListener('mousemove', function(e) {
    getCursorPosition(canvas, e)
})

document.addEventListener('keydown', (event) => {
	//console.log(event);
	if(isLoad){
		
		/*
		if(event.code == "Space"){
			EyesClose();
			console.log(lcheek.rotation.z)
			console.log(rcheek.rotation.z)
		}

		if(event.code == "KeyZ"){
			lcheek.rotation.z += 0.1;
			
		}

		if(event.code == "KeyX"){
			lcheek.rotation.z -= 0.1;
		}

		*/
		if(event.code == "KeyR"){
			Reset();
		}
		}
	})

/*
	document.addEventListener('keyup', (event) => {
		console.log(event);
		if(isLoad){
			if(event.code == "Space"){
				EyesOpen();
				console.log("")
				}
			}
		}) */
	

	function EyesClose(){
		llid.rotation.z = 1.5976783211021395 //Math.PI/180; //1.5976783211021395
		rlid.rotation.z = 1.6250295525042124 //Math.PI/180; //1.6250295525042124
	}

	function EyesOpen(){
		llid.rotation.z = 1.3358789333029897 //Math.PI/180; //1.5976783211021395
		rlid.rotation.z = 1.3632301647050626 //Math.PI/180; //1.6250295525042124
	}


	function Reset(){
		llid.rotation.z = 1.3358789333029897 
		rlid.rotation.z = 1.3632301647050626 
		lbrow1.rotation.z = 1.4585172080354663
		lbrow2.rotation.z = 1.4760492431134211
		rbrow1.rotation.z = 1.4567894586012808
		rbrow2.rotation.z = 1.5022247981209778
		jaw1.rotation.z = 2.7296986917417243
		reye.rotation.z = 1.497013131982095
		reye.rotation.x = -0.005633773742790441
		leye.rotation.z = 1.497010086157584
		leye.rotation.x = 0.004388112749735037
		lcheek.rotation.z = 1.505587302711953
		rcheek.rotation.z = 1.4960062860206629
	}


}	
