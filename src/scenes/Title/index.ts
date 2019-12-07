import { BASE_URL, PATH_URL } from '@/const'
export default class TitleScene extends Phaser.Scene {
  titleImage: any
  gameButton: any
  gameText: any
  constructor() {
    super('TitleScene')
    console.log('Title...')
  }

  create() {
    this.createTitle()
    this.createPlayButton()
  }

  createTitle() {
    this.titleImage = this.add.image(0, 0, 'title')
    this.centerObject(this.titleImage, 1)
  }
  createPlayButton() {
    this.gameButton = this.add.sprite(0, 0, 'blueButton1').setInteractive()
    this.centerObject(this.gameButton, -1)

    this.gameText = this.add.text(0, 0, 'play', {
      fontSize: '32px',
      fill: '#fff'
    })
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton)

    this.gameButton.on('pointerdown', (pointer: any) => {
      this.scene.start('MainScene')
    })

    this.gameButton.on('pointerover', (pointer: any) => {
      this.gameButton.setTexture('blueButton2')
    })

    this.gameButton.on('pointerout', (pointer: any) => {
      this.gameButton.setTexture('blueButton1')
    })
  }
  centerObject(gameObject: any, offset = 0) {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // console.log('width %o, height %o', width, height)

    gameObject.x = width / 2
    gameObject.y = height / 2 - offset * 100
  }
}
