import React, { Component } from "react";

import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

import { setMouseEvent, setButtonEvent, setInputEvent, setKeyboardEvent } from "./module/_event";
import { addGrid, addLight, addRoom } from "./module/_addObject";

import Detailer from "./Detailer/Detailer"

import room_data from "../data/room_1_data.json";

class Editor extends Component {
	componentDidMount() {
		// === THREE.JS CODE START ===

		// scene setting
		const width = this.mount.clientWidth
		const height = this.mount.clientHeight
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();

		renderer.setClearColor("#ffffff")
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.renderReverseSided = false;
		camera.position.y = 10;
		this.mount.appendChild(renderer.domElement);

		let target = [];
		let drag_target = [];
		let context_target = [];
		const controls = new OrbitControls(camera, renderer.domElement);
		const dragControls = new DragControls(drag_target, camera, renderer.domElement);
		const viewControls = new PointerLockControls(camera, renderer.domElement);
		const mapControls = new MapControls (camera, renderer.domElement);
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		controls.enabled = false;
		dragControls.transformGroup = true;
		dragControls.enabled = false;
		mapControls.enabled = false;

		const light = new THREE.Group();
		var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		light.add(ambientLight);
		addLight(light, {x : 0, y : 3, z : 0}, 0.3);
		light.name = 'light_group';
		scene.add(light);

		// add something
		const room = new THREE.Group();
		room.view_mode = 2;
		room.is_zoom_mode = true;
		room.is_edit_mode = false;
		room.edit_mode = 'None';
		room.is_person_view_mode = false;
		room.name = "room";
		room.size = room_data.room.size;
		room_data.room.forEach(room_info => {
			addRoom(room, room_info, 2);

		})
		scene.add(room);

		// add grid
		const grid = new THREE.Group();
		grid.name = "group_grid";
		addGrid(grid, 100, 100);
		scene.add(grid);
		
		// set event
		setKeyboardEvent(viewControls, controls, raycaster, camera, scene, room);
		setMouseEvent(width, height, mouse, viewControls, camera, scene, raycaster, target, drag_target, dragControls, room, context_target);
		setButtonEvent(camera, viewControls, controls, mapControls, scene, target, drag_target, room, light, context_target);
		setInputEvent(room, target);

		const animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();
	}

	render() {
		return (
			<div>
				<div
					className="Scene"
					style={{ width: "900px", height: "400px" }}
					ref={(mount) => { this.mount = mount }} />
				<Detailer />
			</div>
		)
	}
}

export default Editor