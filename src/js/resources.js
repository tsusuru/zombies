import { ImageSource, Loader } from 'excalibur';

const Resources = {
  Player:    new ImageSource('images/player.png'),
  Zombie:    new ImageSource('images/zombie.png'),
  Bullet:    new ImageSource('images/bullet.png'),
  Background: new ImageSource('images/map.png'),

  ZombieWalk1: new ImageSource('images/zombiewalk.png'),
  ZombieWalk2: new ImageSource('images/zombiewalk2.png'),
  ZombieWalk3: new ImageSource('images/zombiewalk3.png'),
  ZombieWalk4: new ImageSource('images/zombiewalk4.png'),
  ZombieWalk5: new ImageSource('images/zombiewalk5.png'),
};

const ResourceLoader = new Loader();
for (const r of Object.values(Resources)) {
  ResourceLoader.addResource(r);
}

export { Resources, ResourceLoader };
