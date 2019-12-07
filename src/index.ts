import * as scenes from '@/scenes'

const scene = []
for (let i in scenes) {
  scene.push(scenes[i])
}

const config: any = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  parent: 'app',
  width: 640,
  height: 512,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  // scale: {
  //   mode: Phaser.Scale.ENVELOP,
  //   parent: 'app',
  //   width: 800,
  //   height: 600,
  //   autoCenter: Phaser.Scale.CENTER_BOTH
  // },
  scene
}

window.game = new Phaser.Game(config)
