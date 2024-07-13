"use client";
import { useEffect, useRef } from "react";
import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  private bird: any;
  private pipes: any;
  private score: number = 0;
  private scoreText: any;
  private gameOver: boolean = false;

  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("bird", "FlappyBirdAssets/bird.png");
    this.load.image("pipe", "FlappyBirdAssets/pipe.png");
    this.load.image("background", "FlappyBirdAssets/background2.png");
  }

  create() {
    const background = this.add.image(0, 0, "background");
    background.setOrigin(0, 0);
    background.displayWidth = this.sys.canvas.width;
    background.displayHeight = this.sys.canvas.height;

    this.bird = this.physics.add.sprite(100, 300, "bird");
    this.bird.setGravityY(1000);
    this.bird.displayHeight = 50;
    this.bird.displayWidth = 50;

    this.pipes = this.physics.add.group();

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#000",
    });

    this.input.on("pointerdown", this.flap, this);
    this.time.addEvent({
      delay: 1500,
      callback: this.addRowOfPipes,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.bird,
      this.pipes,
      this.hitPipe,
      undefined,
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.bird.y > 600 || this.bird.y < 0) {
      this.endGame();
    }
  }

  private flap() {
    if (this.gameOver) return;
    this.bird.setVelocityY(-350);
  }

  private addRowOfPipes() {
    if (this.gameOver) return;

    const hole = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < 8; i++) {
      if (i !== hole && i !== hole + 1) {
        const pipe = this.pipes.create(800, i * 100, "pipe");
        pipe.displayWidth = 80;
        pipe.displayHeight = 100;

        pipe.body.allowGravity = false;
        pipe.setVelocityX(-200);
      }
    }

    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  private hitPipe() {
    this.endGame();
  }

  private endGame() {
    this.gameOver = true;
    this.physics.pause();
    this.bird.setTint(0xff0000);
    this.time.removeAllEvents();
    this.showGameOverPopup();
  }

  private showGameOverPopup() {
    const gameOverPopup = document.getElementById("game-over-popup");
    const finalScore = document.getElementById("final-score");
    if (gameOverPopup && finalScore) {
      finalScore.innerText = `Your Score: ${this.score}`;
      gameOverPopup.style.display = "block";
    }
  }

  private restartGame() {
    this.gameOver = false;
    this.score = 0;
    this.scene.restart();
    const gameOverPopup = document.getElementById("game-over-popup");
    if (gameOverPopup) {
      gameOverPopup.style.display = "none";
    }
  }
}

export default function FlappyBird() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "game-container",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 300 },
            debug: false,
          },
        },
        scene: MainScene,
      };

      gameRef.current = new Phaser.Game(config);

      // Add event listener to the restart button
      const restartButton = document.getElementById("restart-button");
      restartButton?.addEventListener("click", () => {
        gameRef.current?.scene.keys["MainScene"].restartGame();
      });
    }

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return (
    <div>
      <h1>Flappy Bird</h1>
      <div id="game-container"></div>
      <div
        id="game-over-popup"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white hidden"
      >
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p id="final-score" className="text-2xl mb-4"></p>
          <button
            id="restart-button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            重新開始
          </button>
        </div>
      </div>
    </div>
  );
}
