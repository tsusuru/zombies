import { ImageSource, Sound, Loader } from 'excalibur'

// laad hier al je sprites en geluiden
const Resources = {
  Player:    new ImageSource('images/player.png'),
  Zombie:    new ImageSource('images/zombie.png'),
  Bullet:    new ImageSource('images/bullet.png'),
  ShootSfx:  new Sound('sounds/shoot.wav'),
  HitSfx:    new Sound('sounds/hit.wav'),
  Background: new ImageSource('images/map.png'),
}

const ResourceLoader = new Loader()
for (const r of Object.values(Resources)) {
  ResourceLoader.addResource(r)
}

export { Resources, ResourceLoader }
