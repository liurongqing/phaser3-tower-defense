import { BASE_URL, PATH_URL } from '@/const'
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)
    this.load.image('logo', 'logo/zenva_logo.png')
  }

  create() {
    this.scene.start('PreloaderScene')
    // const logo = this.add.image(400, 150, 'logo')
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   loop: -1
    // })
  }
}
