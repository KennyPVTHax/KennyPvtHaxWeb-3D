import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { themes, useExperience } from "../context/ExperienceContext";

export default function CoreScene({ exploded = true, wireframe = false, playing = true, resetKey = 0, onAvailabilityChange }) {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const { theme, motionEnabled } = useExperience();
  const settings = useRef({ exploded, playing, motionEnabled });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  settings.current = { exploded, playing, motionEnabled };

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch { setFailed(true); onAvailabilityChange(false); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    renderer.domElement.setAttribute("aria-label", "Interactive exploded processor model");
    renderer.domElement.setAttribute("role", "img");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(6.8, 5.2, 8.8);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI * 0.7;
    // Vertical touch gestures remain page scrolls; horizontal drags rotate the model.
    renderer.domElement.style.touchAction = "pan-y";
    scene.add(new THREE.HemisphereLight(0xeaf2f7, 0x31343e, 3.5));
    const key = new THREE.DirectionalLight(0xffffff, 7);
    key.position.set(2, 7, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x76e5d5, 55, 20);
    rim.position.set(-4, 2, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0xff5267, 40, 20);
    fill.position.set(4, 0, 3);
    scene.add(fill);

    const core = new THREE.Group();
    core.rotation.y = -0.25;
    scene.add(core);
    const metal = new THREE.MeshStandardMaterial({ color: 0x555c67, metalness: 0.72, roughness: 0.3 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x161c23, metalness: 0.55, roughness: 0.42 });
    const silver = new THREE.MeshStandardMaterial({ color: 0xb3bac3, metalness: 0.72, roughness: 0.22 });
    const accent = new THREE.MeshStandardMaterial({ color: 0xff5267, emissive: 0xff5267, emissiveIntensity: 1.3, metalness: 0.3, roughness: 0.3 });
    const secondary = new THREE.MeshStandardMaterial({ color: 0x76e5d5, emissive: 0x76e5d5, emissiveIntensity: 0.7 });
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff5267, transparent: true, opacity: 0.5 });
    const solidMaterials = [metal, dark, silver];
    const layers = [];
    const box = (parent, x, y, z, w, h, d, material) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const plate = (parent, size, thickness, material) => {
      const s = size / 2;
      const c = size * 0.1;
      const shape = new THREE.Shape();
      shape.moveTo(-s + c, -s);
      [[s - c, -s], [s, -s + c], [s, s - c], [s - c, s], [-s + c, s], [-s, s - c], [-s, -s + c]].forEach(([x, y]) => shape.lineTo(x, y));
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.025, bevelThickness: 0.025 });
      geometry.rotateX(-Math.PI / 2);
      geometry.translate(0, -thickness / 2, 0);
      const mesh = new THREE.Mesh(geometry, material);
      parent.add(mesh);
      return mesh;
    };

    for (let layerIndex = 0; layerIndex < 4; layerIndex += 1) {
      const layer = new THREE.Group();
      layer.userData.closedY = -0.36 + layerIndex * 0.24;
      layer.userData.openY = -1.25 + layerIndex * 0.91;
      layer.position.y = settings.current.exploded ? layer.userData.openY : layer.userData.closedY;
      core.add(layer);
      layers.push(layer);
      const size = [3.65, 2.95, 2.5, 3.1][layerIndex];
      const body = plate(layer, size, layerIndex === 3 ? 0.17 : 0.12, layerIndex === 3 ? metal : dark);
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry), edgeMaterial);
      layer.add(edge);

      if (layerIndex === 0) {
        for (let side = -1; side <= 1; side += 2) {
          for (let i = 0; i < 16; i += 1) {
            box(layer, side * 1.77, 0, -1.4 + i * 0.185, 0.28, 0.065, 0.085, silver);
            box(layer, -1.4 + i * 0.185, 0, side * 1.77, 0.085, 0.065, 0.28, silver);
          }
        }
        for (let i = 0; i < 8; i += 1) {
          const z = -1.35 + i * 0.38;
          box(layer, 0, 0.08, z, 2.8, 0.012, 0.018, i % 3 === 0 ? secondary : metal);
        }
      } else if (layerIndex === 1) {
        plate(layer, 1.4, 0.18, silver);
        for (let i = 0; i < 4; i += 1) {
          box(layer, i % 2 ? 1.07 : -1.07, 0.12, i < 2 ? 0.55 : -0.55, 0.32, 0.13, 0.58, metal);
        }
      } else if (layerIndex === 2) {
        plate(layer, 1.7, 0.19, accent);
        const die = plate(layer, 1.35, 0.22, dark);
        die.position.y = 0.1;
        for (let i = 0; i < 5; i += 1) box(layer, -0.43 + i * 0.21, 0.24, 0, 0.06, 0.015, 0.87, secondary);
      } else {
        for (let i = 0; i < 12; i += 1) box(layer, -1.1 + i * 0.2, 0.2, 0, 0.075, 0.15, 2.28, silver);
        box(layer, 0, 0.295, 0, 1.2, 0.05, 1.2, dark);
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 256; labelCanvas.height = 256;
        const ctx = labelCanvas.getContext("2d");
        ctx.fillStyle = "#10151b"; ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = "#6e7b87"; ctx.strokeRect(12, 12, 232, 232);
        ctx.textAlign = "center"; ctx.fillStyle = "#f1f5f8";
        ctx.font = "bold 92px sans-serif"; ctx.fillText("K/X", 128, 138);
        ctx.font = "18px monospace"; ctx.fillStyle = "#8b97a4"; ctx.fillText("CORE // 001", 128, 188);
        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const label = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), new THREE.MeshBasicMaterial({ map: texture }));
        label.rotation.x = -Math.PI / 2; label.position.y = 0.323;
        layer.add(label);
      }
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([x, z]) => {
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 8), silver);
        bolt.position.set(x * (size / 2 - 0.25), 0.105, z * (size / 2 - 0.25));
        layer.add(bolt);
      });
    }
    const guidePositions = [];
    for (const x of [-1.18, 1.18]) for (const z of [-1.18, 1.18]) guidePositions.push(x, -1.5, z, x, 1.85, z);
    const guides = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(guidePositions, 3)), new THREE.LineDashedMaterial({ color: 0x768693, dashSize: 0.07, gapSize: 0.09, transparent: true, opacity: 0.4 }));
    guides.computeLineDistances(); core.add(guides);
    const grid = new THREE.GridHelper(18, 36, 0x303f46, 0x1b242b);
    grid.position.y = -1.9;
    grid.material.transparent = true; grid.material.opacity = 0.3;
    scene.add(grid);

    let visible = true;
    let disposed = false;
    let raf = 0;
    let last = 0;
    let time = 0;
    let previous = 0;
    let dirty = true;
    const invalidate = () => { dirty = true; };
    controls.addEventListener("change", invalidate);
    sceneRef.current = { accent, secondary, edgeMaterial, solidMaterials, fill, rim, controls, core, invalidate };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.zoom = width < 500 ? 0.84 : 1;
      camera.updateProjectionMatrix();
      invalidate();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; invalidate(); });
    intersection.observe(host);
    const lost = (event) => { event.preventDefault(); setFailed(true); onAvailabilityChange(false); };
    const restored = () => { setFailed(false); onAvailabilityChange(true); invalidate(); };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);

    const animate = (now) => {
      if (disposed) return;
      raf = requestAnimationFrame(animate);
      const dt = Math.min((now - previous) / 1000 || 0.016, 0.04);
      previous = now;
      if (!visible || document.hidden || now - last < 1000 / 40) return;
      last = now;
      const current = settings.current;
      const moving = current.motionEnabled && current.playing;
      controls.enableDamping = current.motionEnabled;
      if (moving) { time += dt; core.rotation.y += dt * 0.12; core.position.y = Math.sin(time * 0.7) * 0.045; }
      let transitioning = false;
      layers.forEach((layer) => {
        const target = current.exploded ? layer.userData.openY : layer.userData.closedY;
        if (Math.abs(layer.position.y - target) > 0.001) {
          layer.position.y = current.motionEnabled ? THREE.MathUtils.lerp(layer.position.y, target, 0.1) : target;
          transitioning = true;
        }
      });
      guides.visible = current.exploded;
      controls.update();
      if (dirty || moving || transitioning) {
        renderer.render(scene, camera);
        dirty = false;
      }
    };
    resize();
    raf = requestAnimationFrame(animate);
    setReady(true);
    onAvailabilityChange(true);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect(); intersection.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      const geometries = new Set(); const materials = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) => materials.add(m));
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => { m.map?.dispose(); m.dispose(); });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      sceneRef.current = null;
    };
  }, [onAvailabilityChange]);

  useEffect(() => {
    const state = sceneRef.current;
    if (!state) return;
    const colors = themes[theme];
    state.accent.color.set(colors.color); state.accent.emissive.set(colors.color);
    state.secondary.color.set(colors.secondary); state.secondary.emissive.set(colors.secondary);
    state.edgeMaterial.color.set(colors.color);
    state.fill.color.set(colors.color); state.rim.color.set(colors.secondary);
    state.solidMaterials.forEach((material) => { material.wireframe = wireframe; });
    state.invalidate();
  }, [theme, wireframe, ready]);

  useEffect(() => {
    const state = sceneRef.current;
    if (state) { state.controls.reset(); state.core.rotation.y = -0.25; state.invalidate(); }
  }, [resetKey]);

  return <div className={`core-scene ${failed ? "scene-failed" : ""}`} ref={hostRef} data-ready={ready && !failed}>
    {(!ready || failed) && <div className="core-fallback" role="img" aria-label="Layered processor illustration"><i /><i /><i /><strong>K/X</strong></div>}
  </div>;
}
