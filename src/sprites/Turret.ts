import { BASE_URL, map } from '@/const'

export default class Turret extends Phaser.GameObjects.Image {
  map: any
  nextTic: any
  constructor(scene: any, x: any, y: any, map: any) {
    super(scene, x, y, 'tower')
    this.scene = scene
    this.map = map
    this.nextTic = 0
    this.scene.add.existing(this)
    this.setScale(-0.8)
  }

  update(time: any, delta: any) {
    if (time > this.nextTic) {
      this.fire()
      this.nextTic = time + 1000
    }
  }

  place(i: any, j: any) {
    this.y = i * 64 + 32
    this.x = j * 64 + 32
    this.map[i][j] = 1
  }

  fire() {
    const enemy = this.scene.getEnemy(this.x, this.y, 100)
    if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
      this.scene.addBullet(this.x, this.y, angle)
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
    }
  }
}
