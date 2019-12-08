import { levelConfig } from '@/const'

export default class Enemy extends Phaser.GameObjects.Image {
  path: any
  hp: any
  enemySpeed: any
  follower: any
  constructor(scene: any, x: any, y: any, path: any) {
    super(scene, x, y, 'enemy')
    this.scene = scene
    this.path = path
    this.hp = 0
    this.enemySpeed = 0
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() }
    this.scene.add.existing(this)
  }

  update(time: any, delta: any) {
    // console.log('enemy.update...')
    this.follower.t += this.enemySpeed * delta
    this.path.getPoint(this.follower.t, this.follower.vec)
    if (this.follower.vec.y > this.y && this.follower.vec.y !== this.y)
      this.angle = 0
    if (this.follower.vec.x > this.x && this.follower.x !== this.x) {
      this.angle = -90
    }
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
    if (this.follower.t >= 1) {
      this.setActive(false)
      this.setVisible(false)
      this.scene.updateHealth(1)
    }
  }
  startOnPath() {
    this.hp =
      // @ts-ignore
      levelConfig.initial.enemyHealth + levelConfig.incremental.enemyHealth

    this.enemySpeed =
      // @ts-ignore
      levelConfig.initial.enemySpeed * levelConfig.incremental.enemySpeed

    this.follower.t = 0
    this.path.getPoint(this.follower.t, this.follower.vec)
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
  }

  recieveDamage(damage: any) {
    this.hp -= damage
    if (this.hp <= 0) {
      this.setActive(false)
      this.setVisible(false)
      this.scene.updateScore(10)
    }
  }
}
