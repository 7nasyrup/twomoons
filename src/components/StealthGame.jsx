import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function StealthGame({ onComplete }) {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameClear, setGameClear] = useState(false);
  const [clearTarget, setClearTarget] = useState(null);

  // デバッグ用のフラグ
  const DEBUG_ZOOM_OUT = false;
  const HIDE_ENTITIES = false;
  
  const stateRef = useRef({
    player: { x: 400, y: 400, size: 20, speed: 4, vx: 0, vy: 0 },
    keys: { w: false, a: false, s: false, d: false },
    camera: { x: 0, y: 0 },
    enemies: [
      { x: 800, y: 500, vx: 2, vy: 0, patrolStart: 500, patrolEnd: 1100, size: 40, type: 'horizontal' },
      { x: 1200, y: 800, vx: 0, vy: 2, patrolStart: 400, patrolEnd: 1200, size: 40, type: 'vertical' },
      { x: 600, y: 1500, vx: 3, vy: 0, patrolStart: 400, patrolEnd: 1000, size: 40, type: 'horizontal' },
      { x: 1800, y: 1000, vx: 0, vy: -3, patrolStart: 600, patrolEnd: 1400, size: 40, type: 'vertical' },
    ],
    targets: [
      { id: 'Mutsunori', name: '睦典', x: 1300, y: 300, width: 80, height: 80, image: null },
      { id: 'Nagisa', name: '凪砂', x: 1300, y: 2000, width: 80, height: 80, image: null }
    ],
    images: {
      map: null,
      shadow: null,
      mutsunori: null,
      nagisa: null
    },
    // 当たり判定画像から読み取ったピクセルデータ
    collisionData: null,
    // 屋根だけを描画するためのCanvas
    roofCanvas: null,
    isLoaded: false
  });

  useEffect(() => {
    // Load Images
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    };

    Promise.all([
      loadImage('/stealth_game/2dmap.png'),
      loadImage('/stealth_game/2dmap_cal.png'),
      loadImage('/stealth_game/shadow.jpg'),
      loadImage('/stealth_game/Mutsunori.png'),
      loadImage('/stealth_game/Nagisa.png')
    ]).then(([mapImg, colImg, shadowImg, mutsunoriImg, nagisaImg]) => {
      stateRef.current.images.map = mapImg;
      stateRef.current.images.shadow = shadowImg;
      stateRef.current.images.mutsunori = mutsunoriImg;
      stateRef.current.images.nagisa = nagisaImg;

      stateRef.current.targets[0].image = mutsunoriImg;
      stateRef.current.targets[1].image = nagisaImg;

      // 画像判定マップの読み込みと屋根レイヤーの生成
      if (colImg && mapImg) {
        // 1. 衝突判定用のデータを取得
        const colCanvas = document.createElement('canvas');
        colCanvas.width = colImg.width;
        colCanvas.height = colImg.height;
        const colCtx = colCanvas.getContext('2d', { willReadFrequently: true });
        colCtx.drawImage(colImg, 0, 0);
        const colData = colCtx.getImageData(0, 0, colImg.width, colImg.height);
        stateRef.current.collisionData = colData;

        // 2. 青色ピクセルをもとに屋根用のレイヤーを自動生成する
        const roofCanvas = document.createElement('canvas');
        roofCanvas.width = mapImg.width;
        roofCanvas.height = mapImg.height;
        const roofCtx = roofCanvas.getContext('2d');
        // 一度マップ全体を描画
        roofCtx.drawImage(mapImg, 0, 0);
        const roofData = roofCtx.getImageData(0, 0, mapImg.width, mapImg.height);

        // colDataとroofDataは同じサイズのはず
        for (let i = 0; i < colData.data.length; i += 4) {
          const r = colData.data[i];
          const g = colData.data[i + 1];
          const b = colData.data[i + 2];
          
          // 青色でない場合は、屋根レイヤーから消す（透明にする）
          // ※ Bが高く、RとGが低いものを青と判定
          if (!(b > 150 && r < 100 && g < 100)) {
            roofData.data[i + 3] = 0; // Alphaを0にする
          }
        }
        roofCtx.putImageData(roofData, 0, 0);
        stateRef.current.roofCanvas = roofCanvas;
      }

      stateRef.current.isLoaded = true;
    });

    const handleKeyDown = (e) => {
      if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        stateRef.current.keys[e.key.toLowerCase()] = true;
      }
    };
    const handleKeyUp = (e) => {
      if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        stateRef.current.keys[e.key.toLowerCase()] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const gameLoop = () => {
      if (gameOver || gameClear || !stateRef.current.isLoaded) {
        if (!gameOver && !gameClear) {
          animationFrameId = requestAnimationFrame(gameLoop);
        }
        return;
      }

      const state = stateRef.current;
      const { player, keys, enemies, targets, images, collisionData, roofCanvas } = state;

      // ピクセルベースの当たり判定
      const isWall = (x, y) => {
        if (!collisionData) return true; // 万が一画像がなければ動けないようにする
        
        const px = Math.floor(x);
        const py = Math.floor(y);

        // マップ外は壁
        if (px < 0 || px >= collisionData.width || py < 0 || py >= collisionData.height) {
          return true;
        }

        const index = (py * collisionData.width + px) * 4;
        const r = collisionData.data[index];
        const g = collisionData.data[index + 1];
        const b = collisionData.data[index + 2];
        const a = collisionData.data[index + 3];

        // 透明な場所（塗られていない）は壁
        if (a < 50) return true;

        // 赤色（Rが高くてGBが低い）は「通れる道」
        if (r > 150 && g < 100 && b < 100) {
          return false;
        }

        // 青色（Bが高くてRGが低い）は「通れる＋隠れる」
        if (b > 150 && r < 100 && g < 100) {
          return false;
        }

        // それ以外（黒など）は壁
        return true;
      };

      // Update Player
      player.vx = 0;
      player.vy = 0;
      if (keys.w) player.vy = -player.speed;
      if (keys.s) player.vy = player.speed;
      if (keys.a) player.vx = -player.speed;
      if (keys.d) player.vx = player.speed;

      // Normalize diagonal speed
      if (player.vx !== 0 && player.vy !== 0) {
        const length = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
        player.vx = (player.vx / length) * player.speed;
        player.vy = (player.vy / length) * player.speed;
      }

      // Check X axis collision
      if (player.vx !== 0) {
        let testX = player.x + player.vx;
        let left = testX - player.size;
        let right = testX + player.size;
        let hit = false;
        if (player.vx > 0) {
          hit = isWall(right, player.y - player.size * 0.8) || isWall(right, player.y) || isWall(right, player.y + player.size * 0.8);
        } else {
          hit = isWall(left, player.y - player.size * 0.8) || isWall(left, player.y) || isWall(left, player.y + player.size * 0.8);
        }
        if (!hit) player.x = testX;
      }

      // Check Y axis collision
      if (player.vy !== 0) {
        let testY = player.y + player.vy;
        let top = testY - player.size;
        let bottom = testY + player.size;
        let hit = false;
        if (player.vy > 0) {
          hit = isWall(player.x - player.size * 0.8, bottom) || isWall(player.x, bottom) || isWall(player.x + player.size * 0.8, bottom);
        } else {
          hit = isWall(player.x - player.size * 0.8, top) || isWall(player.x, top) || isWall(player.x + player.size * 0.8, top);
        }
        if (!hit) player.y = testY;
      }

      // Zoom level
      const scale = DEBUG_ZOOM_OUT ? 0.4 : 1.0;
      const canvasW = canvas.width / scale;
      const canvasH = canvas.height / scale;

      const mapW = images.map ? images.map.width : 3000;
      const mapH = images.map ? images.map.height : 3000;

      // Camera Follow Player
      state.camera.x = player.x - canvasW / 2;
      state.camera.y = player.y - canvasH / 2;

      // Clamp camera
      if (state.camera.x < 0) state.camera.x = 0;
      if (state.camera.y < 0) state.camera.y = 0;
      if (state.camera.x > mapW - canvasW) state.camera.x = Math.max(0, mapW - canvasW);
      if (state.camera.y > mapH - canvasH) state.camera.y = Math.max(0, mapH - canvasH);

      // Update Enemies
      if (!HIDE_ENTITIES) {
        for (const enemy of enemies) {
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;

          if (enemy.type === 'horizontal') {
            if (enemy.x > enemy.patrolEnd) {
              enemy.x = enemy.patrolEnd;
              enemy.vx *= -1;
            } else if (enemy.x < enemy.patrolStart) {
              enemy.x = enemy.patrolStart;
              enemy.vx *= -1;
            }
          } else {
            if (enemy.y > enemy.patrolEnd) {
              enemy.y = enemy.patrolEnd;
              enemy.vy *= -1;
            } else if (enemy.y < enemy.patrolStart) {
              enemy.y = enemy.patrolStart;
              enemy.vy *= -1;
            }
          }

          // Collision Check (Circle based)
          const dx = player.x - enemy.x;
          const dy = player.y - enemy.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < player.size + enemy.size / 2) {
            setGameOver(true);
            return;
          }
        }
      }

      // Check Target Collision
      if (!HIDE_ENTITIES) {
        for (const target of targets) {
          if (
            player.x + player.size > target.x &&
            player.x - player.size < target.x + target.width &&
            player.y + player.size > target.y &&
            player.y - player.size < target.y + target.height
          ) {
            setClearTarget(target.id);
            setGameClear(true);
            return;
          }
        }
      }

      // ---------------- DRAWING ----------------
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      
      // ズーム処理
      ctx.scale(scale, scale);
      ctx.translate(-state.camera.x, -state.camera.y);

      // Draw Map (Layer 1)
      if (images.map) {
        ctx.drawImage(images.map, 0, 0);
      } else {
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, mapW, mapH);
      }

      if (!HIDE_ENTITIES) {
        // Draw Targets
        for (const target of targets) {
          if (target.image) {
            ctx.drawImage(target.image, target.x, target.y, target.width, target.height);
          } else {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(target.x, target.y, target.width, target.height);
          }
          ctx.fillStyle = 'white';
          ctx.font = '20px sans-serif';
          ctx.fillText(target.name, target.x, target.y - 10);
        }

        // Draw Enemies
        for (const enemy of enemies) {
          if (images.shadow) {
            ctx.drawImage(images.shadow, enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
          } else {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Player
      ctx.fillStyle = '#00aaff';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Roof Layer (Layer 3: drawn ON TOP of player)
      if (roofCanvas) {
        ctx.drawImage(roofCanvas, 0, 0);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, gameClear]);

  const handleRetry = () => {
    stateRef.current.player.x = 400;
    stateRef.current.player.y = 400;
    setGameOver(false);
  };

  const handleEnd = () => {
    onComplete(clearTarget);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <div className="relative border-4 border-gray-800 rounded-lg shadow-2xl overflow-hidden bg-gray-900" style={{ width: 800, height: 600 }}>
        {!stateRef.current.isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
            マップロード中...
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="block"
        />

        {/* UI Overlay */}
        <div className="absolute top-4 left-4 text-white font-bold drop-shadow-md bg-black/50 p-4 rounded-lg pointer-events-none">
          <p className="text-xl mb-2">WASDキーで移動</p>
          <p>敵から逃げて、仲間のもとへ向かえ</p>
        </div>

        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center text-white z-40"
          >
            <h2 className="text-6xl font-bold mb-4">GAME OVER</h2>
            <p className="text-xl mb-8">見つかってしまった……</p>
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-white text-red-900 font-bold rounded-full hover:bg-gray-200 transition"
            >
              リトライ
            </button>
          </motion.div>
        )}

        {gameClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-blue-900/80 flex flex-col items-center justify-center text-white z-40"
          >
            <h2 className="text-5xl font-bold mb-4">ESCAPE SUCCESS</h2>
            <p className="text-xl mb-8">{clearTarget === 'Mutsunori' ? '睦典' : '凪砂'}の元へ逃げ込んだ！</p>
            <button
              onClick={handleEnd}
              className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-gray-200 transition"
            >
              シナリオへ
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
