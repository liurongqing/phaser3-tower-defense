export default class UIScene extends Phaser.Scene {
  scoreText: any
  MainScene: any
  constructor() {
    super({ key: 'UI', active: true })
  }
  init() {
    this.MainScene = this.scene.get('MainScene')
  }
  create() {
    this.setupUIElements()
    this.setupEvenets()
  }
  setupUIElements() {
    this.scoreText = this.add.text(5, 5, 'Score: 0', {
      fontSize: '16px',
      fill: '#fff'
    })
  }
  setupEvenets() {
    this.MainScene.events.on('displayUI', () => {
      this.scoreText.alpha = 1
    })

    this.MainScene.events.on('updateScore', (score: any) => {
      this.scoreText.setText('Score: ' + score)
    })
  }
}
