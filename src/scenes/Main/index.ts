import { map, levelConfig } from '@/const'
import Enemy from '@/sprites/Enemy'
import Turret from '@/sprites/Turret'
import Bullet from '@/sprites/Bullet'

export default class MainScene extends Phaser.Scene {
  bgMap: any
  tiles: any
  backgroundLayer: any
  graphics: any
  path: any
  map: any
  cursor: any
  nextEnemy: any
  enemies: any
  turrets: any
  bullets: any
  score: any
  baseHealth: any
  availableTurrets: any
  roundStarted: any
  uiScene: any
  constructor() {
    super('MainScene')
    console.log('mainscene....')
  }

  init() {
    this.map = map.map((arr: any) => arr.slice())
    this.nextEnemy = 0
    this.score = 0
    this.baseHealth = 3
    this.availableTurrets = 2
    this.roundStarted = false

    this.events.emit('displayUI')
    this.events.emit('updateHealth', this.baseHealth)
    this.events.emit('updateScore', this.score)
    this.events.emit('updateTurrets', this.availableTurrets)
    // grab a reference to the UI scene
    this.uiScene = this.scene.get('UI')
  }

  create() {
    this.events.emit('startRound')
    this.uiScene.events.on('roundReady', () => {
      this.roundStarted = true
    })

    this.createMap()
    this.createPath()
    this.createCursor()
    this.createGroups()
  }

  update(time: any, delta: any) {
    if (time > this.nextEnemy && this.roundStarted) {
      let enemy = this.enemies.getFirstDead()
      if (!enemy) {
        enemy = new Enemy(this, 0, 0, this.path)
        this.enemies.add(enemy)
      }
      if (enemy) {
        enemy.setActive(true)
        enemy.setVisible(true)
        // enemy.update(time, delta)
        enemy.startOnPath()
        this.nextEnemy = time + 2000
      }
    }
  }

  updateScore(score: any) {
    this.score += score
    this.events.emit('updateScore', this.score)
  }
  updateHealth(health: any) {
    this.baseHealth -= health
    this.events.emit('updateHealth', this.baseHealth)
    if (this.baseHealth <= 0) {
      this.events.emit('hideUI')
      this.scene.start('Title')
    }
  }
  updateTurrets() {
    this.availableTurrets--
    this.events.emit('updateTurrets', this.availableTurrets)
  }

  createMap() {
    this.bgMap = this.make.tilemap({ key: 'level1' })
    this.tiles = this.bgMap.addTilesetImage('terrainTiles_default')
    this.backgroundLayer = this.bgMap.createStaticLayer(
      'Background',
      this.tiles,
      0,
      0
    )
    this.add.image(480, 480, 'base')
  }
  createPath() {
    this.graphics = this.add.graphics()
    this.path = this.add.path(96, -32)
    this.path.lineTo(96, 164)
    this.path.lineTo(480, 164)
    this.path.lineTo(480, 544)

    this.graphics.lineStyle(3, 0xffffff, 1)
    this.path.draw(this.graphics)
  }
  createCursor() {
    this.cursor = this.add.image(32, 32, 'cursor')
    this.cursor.setScale(2)
    this.cursor.setAlpha(0)
    this.input.on('pointermove', (pointer: any) => {
      const i = Math.floor(pointer.y / 64)
      const j = Math.floor(pointer.x / 64)
      if (this.canPlaceTurret(i, j)) {
        this.cursor.setPosition(j * 64 + 32, i * 64 + 32)
        this.cursor.setAlpha(0.8)
      } else {
        this.cursor.setAlpha(0)
      }
    })
  }
  createGroups() {
    this.enemies = this.physics.add.group({
      classType: Enemy,
      maxSize: 2,
      runChildUpdate: true
    })
    this.turrets = this.add.group({
      classType: Turret,
      runChildUpdate: true
    })
    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

    // 子弹与敌人碰撞
    this.physics.add.overlap(
      this.enemies,
      this.bullets,
      this.damageEnemy.bind(this)
    )

    this.input.on('pointerdown', this.placeTurret.bind(this))
  }

  canPlaceTurret(i: any, j: any) {
    return this.map[i][j] === 0
  }

  getEnemy(x: any, y: any, distance: any) {
    const enemyUnits = this.enemies.getChildren()
    for (let i = 0; i < enemyUnits.length; i++) {
      if (
        enemyUnits[i].active &&
        Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <=
          distance
      ) {
        return enemyUnits[i]
      }
    }
    return false
  }

  addBullet(x: any, y: any, angle: any) {
    let bullet = this.bullets.getFirstDead()
    if (!bullet) {
      bullet = new Bullet(this, 0, 0)
      this.bullets.add(bullet)
    }
    bullet.fire(x, y, angle)
  }

  placeTurret(pointer: any) {
    let i = Math.floor(pointer.y / 64)
    let j = Math.floor(pointer.x / 64)
    if (this.canPlaceTurret(i, j)) {
      let turret = this.turrets.getFirstDead()
      if (!turret) {
        turret = new Turret(this, 0, 0, this.map)
        this.turrets.add(turret)
      }
      turret.setActive(true)
      turret.setVisible(true)
      turret.place(i, j)
      // TODO: add logic to update num of turrets
    }
  }

  damageEnemy(enemy: any, bullet: any) {
    if (enemy.active === true && bullet.active === true) {
      bullet.setActive(false)
      bullet.setVisible(false)
      // @ts-ignore
      enemy.receiveDamage(levelConfig.bulletDamage)
    }
  }
}
