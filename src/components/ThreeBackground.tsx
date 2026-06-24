import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  activeScene: number;
  scrollProgress: number; // 0 to 1 within current scene
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ activeScene, scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // 3D Object Groups
  const starFieldRef = useRef<THREE.Points | null>(null);
  const brainGroupRef = useRef<THREE.Group | null>(null);
  const skillsGroupRef = useRef<THREE.Group | null>(null);
  const tunnelGroupRef = useRef<THREE.Group | null>(null);
  const projectsGroupRef = useRef<THREE.Group | null>(null);
  const githubGroupRef = useRef<THREE.Group | null>(null);
  const businessGroupRef = useRef<THREE.Group | null>(null);
  const achievementsGroupRef = useRef<THREE.Group | null>(null);
  const contactGroupRef = useRef<THREE.Group | null>(null);
  const tacticalGridRef = useRef<THREE.GridHelper | null>(null);

  // Animation targets
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 15));
  const targetCamLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 25));
  const currentCamLook = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse interactivity
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 25);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Clear old canvases
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00E5FF, 2.0);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00B0FF, 1.5);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x64FFDA, 3, 30);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // --- OBJECT GENERATION FUNCTIONS ---

    // 1. STARFIELD (Always Visible, reacts to speed)
    const starCount = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 120; // x
      starPos[i + 1] = (Math.random() - 0.5) * 120; // y
      starPos[i + 2] = (Math.random() - 0.5) * 120; // z

      // Color palette: deep blue, cyan, white
      const r = Math.random();
      if (r < 0.4) {
        starColors[i] = 0.0;     // R
        starColors[i + 1] = 0.9; // G
        starColors[i + 2] = 1.0; // B
      } else if (r < 0.7) {
        starColors[i] = 0.0;     // R
        starColors[i + 1] = 0.7; // G
        starColors[i + 2] = 1.0; // B
      } else {
        starColors[i] = 1.0;     // R
        starColors[i + 1] = 1.0; // G
        starColors[i + 2] = 1.0; // B
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Particle texture (drawn programmatically to avoid assets load)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d')!;
    const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 229, 255, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    starFieldRef.current = starField;

    // 2. BRAIN POINT CLOUD (Scene 1 - Arrival)
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);
    brainGroupRef.current = brainGroup;

    const brainNodeCount = 400;
    const brainGeo = new THREE.BufferGeometry();
    const brainPosArr = new Float32Array(brainNodeCount * 3);
    const brainNodeColors = new Float32Array(brainNodeCount * 3);

    for (let i = 0; i < brainNodeCount; i++) {
      // Left and right lobes modeled mathematically using organic sinusoids
      const isLeft = Math.random() > 0.5;
      const lobeSign = isLeft ? -1 : 1;
      
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;

      // Ellipsoid lobe shape with neural bumps
      const r = 2.8 + 0.4 * Math.sin(phi * 4) * Math.cos(theta * 3);
      const x = r * Math.sin(theta) * Math.cos(phi) * 0.7 + (lobeSign * 0.8);
      const y = r * Math.sin(theta) * Math.sin(phi) * 0.9;
      const z = r * Math.cos(theta) * 0.8;

      const idx = i * 3;
      brainPosArr[idx] = x;
      brainPosArr[idx + 1] = y;
      brainPosArr[idx + 2] = z;

      // Color node: left lobe is blue-cyan, right lobe is mint
      if (isLeft) {
        brainNodeColors[idx] = 0.0;     // R
        brainNodeColors[idx + 1] = 0.9; // G
        brainNodeColors[idx + 2] = 1.0; // B
      } else {
        brainNodeColors[idx] = 0.39;    // R
        brainNodeColors[idx + 1] = 1.0; // G
        brainNodeColors[idx + 2] = 0.85;// B
      }
    }

    brainGeo.setAttribute('position', new THREE.BufferAttribute(brainPosArr, 3));
    brainGeo.setAttribute('color', new THREE.BufferAttribute(brainNodeColors, 3));

    const brainMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const brainPoints = new THREE.Points(brainGeo, brainMat);
    brainGroup.add(brainPoints);

    // Create synapsic lines
    const lineIndices: number[] = [];
    const positions = brainPosArr;
    for (let i = 0; i < brainNodeCount; i++) {
      // Connect each node to closest neighbors
      const connections: { index: number; dist: number }[] = [];
      const ix = positions[i * 3];
      const iy = positions[i * 3 + 1];
      const iz = positions[i * 3 + 2];

      for (let j = i + 1; j < brainNodeCount; j++) {
        const jx = positions[j * 3];
        const jy = positions[j * 3 + 1];
        const jz = positions[j * 3 + 2];
        const d = Math.sqrt((ix - jx)**2 + (iy - jy)**2 + (iz - jz)**2);
        
        // Limit maximum connection distance to look like neural web
        if (d < 1.4) {
          connections.push({ index: j, dist: d });
        }
      }

      // Sort and keep top 2 connections
      connections.sort((a, b) => a.dist - b.dist);
      connections.slice(0, 3).forEach(c => {
        lineIndices.push(i, c.index);
      });
    }

    const brainLineGeo = new THREE.BufferGeometry();
    brainLineGeo.setAttribute('position', new THREE.BufferAttribute(brainPosArr, 3));
    brainLineGeo.setIndex(lineIndices);

    const brainLineMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    const brainLines = new THREE.LineSegments(brainLineGeo, brainLineMat);
    brainGroup.add(brainLines);

    // Dynamic Orbital rings around Brain
    const ringGeo1 = new THREE.RingGeometry(4.5, 4.55, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00E5FF, side: THREE.DoubleSide, transparent: true, opacity: 0.12 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    brainGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(5.0, 5.03, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00B0FF, side: THREE.DoubleSide, transparent: true, opacity: 0.1 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    brainGroup.add(ring2);

    // 3. ABOUT ME HOVER GRID (Scene 2)
    const gridHelper = new THREE.GridHelper(40, 40, 0x00E5FF, 0x004455);
    gridHelper.position.set(0, -5, 0);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.25;
    scene.add(gridHelper);
    tacticalGridRef.current = gridHelper;

    // 4. SKILLS GALAXY (Scene 3)
    const skillsGroup = new THREE.Group();
    skillsGroup.position.set(0, -40, 0); // Put it below
    scene.add(skillsGroup);
    skillsGroupRef.current = skillsGroup;

    // Center Core "AI Sun"
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x64FFDA, wireframe: true, transparent: true, opacity: 0.65 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    skillsGroup.add(coreMesh);

    // Core glow light aura
    const coreLight = new THREE.PointLight(0x64FFDA, 4, 15);
    skillsGroup.add(coreLight);

    // Planets Configuration
    const planetData = [
      { name: 'Python', r: 3.8, size: 0.45, color: 0x306998, speed: 0.015 },
      { name: 'Machine Learning', r: 5.5, size: 0.55, color: 0x00B0FF, speed: 0.010 },
      { name: 'Artificial Intelligence', r: 7.2, size: 0.65, color: 0x00E5FF, speed: 0.007 },
      { name: 'Web Development', r: 9.0, size: 0.50, color: 0x64FFDA, speed: 0.005 },
      { name: 'Data Analytics', r: 10.8, size: 0.40, color: 0xFF4081, speed: 0.004 },
      { name: 'Power BI', r: 12.2, size: 0.38, color: 0xFFD54F, speed: 0.003 }
    ];

    const planetMeshes: THREE.Mesh[] = [];
    const orbitMeshes: THREE.Line[] = [];

    planetData.forEach((pd) => {
      // Create orbit track line
      const orbitPoints: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(angle) * pd.r, 0, Math.sin(angle) * pd.r));
      }
      const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
      const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
      skillsGroup.add(orbitLine);
      orbitMeshes.push(orbitLine);

      // Create Planet Sphere
      const pGeo = new THREE.IcosahedronGeometry(pd.size, 1);
      const pMat = new THREE.MeshPhongMaterial({
        color: pd.color,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        shininess: 80
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      
      // Store angle and orbit on mesh object
      (pMesh as any).orbitRadius = pd.r;
      (pMesh as any).orbitSpeed = pd.speed;
      (pMesh as any).angle = Math.random() * Math.PI * 2;
      
      skillsGroup.add(pMesh);
      planetMeshes.push(pMesh);
    });

    // 5. EDUCATION TUNNEL (Scene 4)
    const tunnelGroup = new THREE.Group();
    tunnelGroup.position.set(0, 0, -100); // Place far in back
    scene.add(tunnelGroup);
    tunnelGroupRef.current = tunnelGroup;

    const tunnelSegCount = 30;
    const tunnelRad = 6;
    const tunnelLen = 80;
    const tunnelGeo = new THREE.CylinderGeometry(tunnelRad, tunnelRad, tunnelLen, 16, tunnelSegCount, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x00B0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide
    });
    const tunnelMesh = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnelMesh.rotation.x = Math.PI / 2;
    tunnelGroup.add(tunnelMesh);

    // 6. PROJECTS FLOATING PANEL SPACE (Scene 5)
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(0, -80, 0);
    scene.add(projectsGroup);
    projectsGroupRef.current = projectsGroup;

    // Floating digital grids and octahedrons
    const projGeo = new THREE.BoxGeometry(2, 2, 2);
    const projMat = new THREE.MeshPhongMaterial({
      color: 0x00E5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const projCubes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const cube = new THREE.Mesh(projGeo, projMat);
      cube.position.set((i - 1.5) * 6, Math.sin(i) * 2, (Math.cos(i) - 0.5) * 3);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      projectsGroup.add(cube);
      projCubes.push(cube);
    }

    // 7. GITHUB NEURAL NETWORK WEB (Scene 6)
    const githubGroup = new THREE.Group();
    githubGroup.position.set(0, -105, 0);
    scene.add(githubGroup);
    githubGroupRef.current = githubGroup;

    // Node geometry representing repositories
    const nodeGeo = new THREE.IcosahedronGeometry(0.4, 1);
    const nodeMat = new THREE.MeshPhongMaterial({
      color: 0x64FFDA,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    const nodes: THREE.Mesh[] = [];
    const nodePositions = [
      new THREE.Vector3(-4, 2, -2),
      new THREE.Vector3(4, 1, -1),
      new THREE.Vector3(-2, -3, 3),
      new THREE.Vector3(3, -2, 2),
      new THREE.Vector3(0, 3, 1),
      new THREE.Vector3(-5, -1, 0)
    ];

    nodePositions.forEach((pos) => {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      githubGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    });

    // Connections between repository nodes
    const connIndices = [
      0, 1, 0, 4, 0, 5,
      1, 3, 1, 4,
      2, 3, 2, 5,
      3, 4, 4, 5
    ];

    const connPosArr = new Float32Array(nodePositions.length * 3);
    nodePositions.forEach((pos, i) => {
      connPosArr[i * 3] = pos.x;
      connPosArr[i * 3 + 1] = pos.y;
      connPosArr[i * 3 + 2] = pos.z;
    });

    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute('position', new THREE.BufferAttribute(connPosArr, 3));
    connGeo.setIndex(connIndices);

    const connMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });

    const connLines = new THREE.LineSegments(connGeo, connMat);
    githubGroup.add(connLines);

    // Byte data particles flowing along coordinates
    const byteCount = 35;
    const byteGeo = new THREE.BufferGeometry();
    const bytePos = new Float32Array(byteCount * 3);
    for (let i = 0; i < byteCount; i++) {
      const p = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      bytePos[i * 3] = p.x + (Math.random() - 0.5) * 0.5;
      bytePos[i * 3 + 1] = p.y + (Math.random() - 0.5) * 0.5;
      bytePos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.5;
    }
    byteGeo.setAttribute('position', new THREE.BufferAttribute(bytePos, 3));
    const byteMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x00E5FF,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const bytePoints = new THREE.Points(byteGeo, byteMat);
    githubGroup.add(bytePoints);

    // 8. ENTREPRENEUR DISTRICT BUILDINGS (Scene 7)
    const businessGroup = new THREE.Group();
    businessGroup.position.set(0, -135, 0);
    scene.add(businessGroup);
    businessGroupRef.current = businessGroup;

    // Two big corporate towering grid models
    const towerGeo1 = new THREE.BoxGeometry(4, 12, 4);
    const towerMat1 = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const tower1 = new THREE.Mesh(towerGeo1, towerMat1);
    tower1.position.set(-6, 0, 0);
    businessGroup.add(tower1);

    const towerGeo2 = new THREE.BoxGeometry(4, 15, 4);
    const towerMat2 = new THREE.MeshBasicMaterial({
      color: 0x64FFDA,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const tower2 = new THREE.Mesh(towerGeo2, towerMat2);
    tower2.position.set(6, 1.5, -2);
    businessGroup.add(tower2);

    // Business coordinate ground grid
    const bGrid = new THREE.GridHelper(30, 20, 0x64FFDA, 0x002233);
    bGrid.position.y = -6;
    businessGroup.add(bGrid);

    // 9. ACHIEVEMENTS DIGI HALL (Scene 8)
    const achievementsGroup = new THREE.Group();
    achievementsGroup.position.set(0, -165, 0);
    scene.add(achievementsGroup);
    achievementsGroupRef.current = achievementsGroup;

    // Glowing geometric pedestal and spinning trophy structures
    const trophyGeo1 = new THREE.TorusGeometry(1.5, 0.3, 12, 48);
    const trophyMat1 = new THREE.MeshPhongMaterial({ color: 0x64FFDA, wireframe: true, transparent: true, opacity: 0.6 });
    const trophy1 = new THREE.Mesh(trophyGeo1, trophyMat1);
    trophy1.position.set(-4, 1, 0);
    achievementsGroup.add(trophy1);

    const trophyGeo2 = new THREE.OctahedronGeometry(1.5, 1);
    const trophyMat2 = new THREE.MeshPhongMaterial({ color: 0x00E5FF, wireframe: true, transparent: true, opacity: 0.6 });
    const trophy2 = new THREE.Mesh(trophyGeo2, trophyMat2);
    trophy2.position.set(4, 1, 0);
    achievementsGroup.add(trophy2);

    // Pedestals
    const pedGeo = new THREE.CylinderGeometry(1.8, 2.2, 2, 8);
    const pedMat = new THREE.MeshBasicMaterial({ color: 0x003344, wireframe: true, transparent: true, opacity: 0.3 });
    const ped1 = new THREE.Mesh(pedGeo, pedMat);
    ped1.position.set(-4, -1, 0);
    achievementsGroup.add(ped1);

    const ped2 = ped1.clone();
    ped2.position.set(4, -1, 0);
    achievementsGroup.add(ped2);

    // 10. CONTACT VORTEX (Scene 9)
    const contactGroup = new THREE.Group();
    contactGroup.position.set(0, -195, 0);
    scene.add(contactGroup);
    contactGroupRef.current = contactGroup;

    const vortexCount = 300;
    const vortexGeo = new THREE.BufferGeometry();
    const vortexPos = new Float32Array(vortexCount * 3);
    const vortexAngles = new Float32Array(vortexCount);
    const vortexRadii = new Float32Array(vortexCount);

    for (let i = 0; i < vortexCount; i++) {
      const radius = Math.random() * 8 + 1;
      const angle = Math.random() * Math.PI * 2;
      vortexRadii[i] = radius;
      vortexAngles[i] = angle;

      const idx = i * 3;
      vortexPos[idx] = Math.cos(angle) * radius;
      vortexPos[idx + 1] = (Math.random() - 0.5) * 5;
      vortexPos[idx + 2] = Math.sin(angle) * radius;
    }
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPos, 3));
    const vortexMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x00E5FF,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const vortexPoints = new THREE.Points(vortexGeo, vortexMat);
    contactGroup.add(vortexPoints);

    // --- MOUSE TRACKING ---
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse movement interpolation (lag filter for cinematic feel)
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05;

      // Rotate Brain Group
      if (brainGroup) {
        brainGroup.rotation.y = time * 0.15;
        brainGroup.rotation.z = Math.sin(time * 0.2) * 0.08;
        // Float slightly
        brainGroup.position.y = Math.sin(time * 0.5) * 0.25;
      }

      // Rotate Skills planets in orbits
      planetMeshes.forEach((pMesh) => {
        const pd = pMesh as any;
        pd.angle += pd.orbitSpeed;
        pMesh.position.x = Math.cos(pd.angle) * pd.orbitRadius;
        pMesh.position.z = Math.sin(pd.angle) * pd.orbitRadius;
        pMesh.rotation.y += 0.02;
        pMesh.rotation.x += 0.01;
      });

      // Animate projects cubes
      projCubes.forEach((cube, i) => {
        cube.rotation.x += 0.005 * (i + 1);
        cube.rotation.y += 0.008 * (i + 1);
        cube.position.y = Math.sin(time + i) * 0.5;
      });

      // Animate GitHub Constellation Web
      if (githubGroup) {
        githubGroup.rotation.y = time * 0.06;
        nodes.forEach((node, idx) => {
          node.rotation.x += 0.01 * (idx + 1);
          node.rotation.y += 0.005 * (idx + 1);
          node.position.y = nodePositions[idx].y + Math.sin(time + idx) * 0.15;
        });

        // Pulse byte points
        const bytePosAttr = byteGeo.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < byteCount; i++) {
          const idx = i * 3;
          // Pulse bytes slowly toward neighboring nodes
          bytePosAttr.setY(i, bytePosAttr.getY(i) + Math.sin(time + i) * 0.005);
        }
        bytePosAttr.needsUpdate = true;
      }

      // Animate business district
      if (businessGroup) {
        tower1.rotation.y = time * 0.05;
        tower2.rotation.y = -time * 0.03;
      }

      // Animate achievements
      if (achievementsGroup) {
        trophy1.rotation.y = time * 0.5;
        trophy1.rotation.x = Math.sin(time) * 0.2;
        trophy2.rotation.y = -time * 0.4;
        trophy2.rotation.z = Math.cos(time * 0.5) * 0.3;
      }

      // Animate contact vortex
      if (vortexPoints) {
        const posAttr = vortexGeo.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < vortexCount; i++) {
          vortexAngles[i] += 0.01 * (10 / vortexRadii[i]); // faster closer to center
          const idx = i * 3;
          posAttr.setX(i, Math.cos(vortexAngles[i]) * vortexRadii[i]);
          posAttr.setZ(i, Math.sin(vortexAngles[i]) * vortexRadii[i]);
          posAttr.setY(i, posAttr.getY(i) + Math.sin(time + i) * 0.002);
        }
        posAttr.needsUpdate = true;
      }

      // Starfield parallax and motion lines in tunnel mode
      if (starField) {
        starField.rotation.y = time * 0.01 + mouse.current.x * 0.02;
        starField.rotation.x = mouse.current.y * 0.02;

        const starPosAttr = starGeo.getAttribute('position') as THREE.BufferAttribute;
        
        // If tunnel mode is highly active, simulate warp speed lines!
        const isTunnel = activeScene === 4;
        const speedMultiplier = isTunnel ? 8.0 : 1.0;

        for (let i = 2; i < starCount * 3; i += 3) {
          starPosAttr.setZ(i / 3, starPosAttr.getZ(i / 3) + 0.05 * speedMultiplier);
          if (starPosAttr.getZ(i / 3) > 60) {
            starPosAttr.setZ(i / 3, -60);
          }
        }
        starPosAttr.needsUpdate = true;
      }

      // --- CALCULATE CAMERA DESTINATION FOR THE CURRENT SCENE ---
      // We set coordinates based on the active scene.
      // We blend smoothly between coordinates using scrollProgress for micro parallax.
      const localP = scrollProgress;

      switch (activeScene) {
        case 1: // Arrival - Approach Rotating Brain
          targetCamPos.current.set(0, 0, 14 - localP * 5);
          targetCamLook.current.set(0, 0, 0);
          break;
        case 2: // About Me - Zoom out, look down at grid
          targetCamPos.current.set(0, 4 - localP * 2, 13);
          targetCamLook.current.set(0, -3, 0);
          break;
        case 3: // Skills - Drop camera down to Skills Galaxy plane
          targetCamPos.current.set(0, -40 + 3, 14 - localP * 2);
          targetCamLook.current.set(0, -40, 0);
          break;
        case 4: // Tunnel - Enter cylinder far space
          // Zoom through tunnel coordinate space
          targetCamPos.current.set(0, 0, -60 - localP * 50);
          targetCamLook.current.set(0, 0, -160);
          break;
        case 5: // Projects - Float in project sphere
          targetCamPos.current.set(0, -80 + Math.sin(localP * Math.PI) * 1.5, 12 - localP * 4);
          targetCamLook.current.set(0, -80, 0);
          break;
        case 6: // GitHub Command Center
          targetCamPos.current.set(0, -105 + Math.sin(localP * Math.PI) * 1.5, 11 - localP * 3);
          targetCamLook.current.set(0, -105, 0);
          break;
        case 7: // Entrepreneur - Look down at towering businesses
          targetCamPos.current.set(0, -135 + 8, 16 - localP * 3);
          targetCamLook.current.set(0, -135, -2);
          break;
        case 8: // Achievements - Look at pedestal trophies
          targetCamPos.current.set(0, -165 + 2, 11 - localP * 2);
          targetCamLook.current.set(0, -165 + 1, 0);
          break;
        case 9: // Contact - Centered on swirling portal
        default:
          targetCamPos.current.set(0, -195, 10 - localP * 3);
          targetCamLook.current.set(0, -195, 0);
          break;
      }

      // Smooth camera interpolation (Linear Interpolation / Slerp-like)
      currentCamPos.current.lerp(targetCamPos.current, 0.06);
      currentCamLook.current.lerp(targetCamLook.current, 0.06);

      // Add mouse cursor parallax to camera position for realistic 3D feel
      const parallaxX = mouse.current.x * 1.2;
      const parallaxY = mouse.current.y * 1.2;

      camera.position.x = currentCamPos.current.x + parallaxX;
      camera.position.y = currentCamPos.current.y + parallaxY;
      camera.position.z = currentCamPos.current.z;

      // Constantly look at target look vector
      camera.lookAt(currentCamLook.current);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE EVENT HANDLING ---
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose materials/geometries to avoid GPU memory leaks
      starGeo.dispose();
      starMat.dispose();
      pTexture.dispose();
      brainGeo.dispose();
      brainMat.dispose();
      brainLineGeo.dispose();
      brainLineMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      gridHelper.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      tunnelGeo.dispose();
      tunnelMat.dispose();
      projGeo.dispose();
      projMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      connGeo.dispose();
      connMat.dispose();
      byteGeo.dispose();
      byteMat.dispose();
      towerGeo1.dispose();
      towerMat1.dispose();
      towerGeo2.dispose();
      towerMat2.dispose();
      bGrid.dispose();
      trophyGeo1.dispose();
      trophyMat1.dispose();
      trophyGeo2.dispose();
      trophyMat2.dispose();
      pedGeo.dispose();
      pedMat.dispose();
      vortexGeo.dispose();
      vortexMat.dispose();

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [activeScene]);

  // Handle immediate local changes to scroll progress (micro frame adjustments)
  // This is used for fast, stutter-free local scroll tracking
  useEffect(() => {
    // Left empty since we read local scrollProgress in the animate loop directly
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-black select-none pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
