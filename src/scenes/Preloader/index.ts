import { BASE_URL, PATH_URL } from '@/const'
export default class PreloaderScene extends Phaser.Scene {
  readyCount: any
  constructor() {
    super('PreloaderScene')
    console.log('Preloader...')
  }

  init() {
    this.readyCount = 0
  }

  preload() {
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)

    this.time.delayedCall(1, this.ready, [], this)

    this.createPreloader()
    this.loadAssets()
  }

  createPreloader() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const progressBox = this.add.graphics()
    const progressBar = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50)

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      },
      origin: [0.5, 0.5]
    })

    const percenText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      },
      origin: [0.5, 0.5]
    })

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      },
      origin: [0.5, 0.5]
    })

    this.load.on('progress', (value: number) => {
      percenText.setText(parseInt(String(value * 100)) + '%')
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 0.9)
      progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30)
    })

    this.load.on('fileprogress', (file: any) => {
      assetText.setText(`Loading asset: ${file.key}`)
    })

    this.load.on('complete', () => {
      progressBox.destroy()
      progressBar.destroy()
      assetText.destroy()
      loadingText.destroy()
      percenText.destroy()
      this.ready()
    })
  }

  loadAssets() {
    this.load.image('bullet', 'level/bulletDark2_outline.png')
    this.load.image('tower', 'level/tank_bigRed.png')
    this.load.image('enemy', 'level/tank_sand.png')
    this.load.image('base', 'level/tankBody_darkLarge_outline.png')
    this.load.image('title', 'ui/title.png')
    this.load.image('cursor', 'ui/cursor.png')
    this.load.image('blueButton1', 'ui/blue_button02.png')
    this.load.image('blueButton2', 'ui/blue_button03.png')

    // tile map in JSON format
    this.load.tilemapTiledJSON('level1', 'level/level1.json')
    this.load.spritesheet(
      'terrainTiles_default',
      'level/terrainTiles_default.png',
      { frameWidth: 64, frameHeight: 64 }
    )
  }

  ready() {
    // console.log('2...')
    this.readyCount++
    if (this.readyCount === 2) {
      this.scene.start('MainScene')
      // this.scene.start('TitleScene')
    }
  }
}
