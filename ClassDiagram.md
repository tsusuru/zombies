```mermaid
classDiagram

    %% Game
    class Game {
         spawner
         player
         startGame()
         onPreUpdate(engine)
    }

    %% ZombieSpawner
    class ZombieSpawner {
         interval
         timer
         update(delta)
         spawn()
    }

    %% Player
    class Player {
         speed
         score
         currentWeapon
         healthBar
         currentAim
         onInitialize(engine)
         onPreUpdate(engine)
         takeDamage(amount)
    }

    %% Weapon
    class Weapon {
         ammo
         damage
         durability
         speed
         fire(origin, direction, scene)
         reload(amount)
         uniqueShot(origin, direction, scene)
    }

    %% Projectile
    class Projectile {
         direction
         speed
         damage
         onInitialize(engine)
         handleCollision(event)
    }

    %% Zombie
    class Zombie {
         speed
         droppedMoney
         maxHealth
         healthBar
         onInitialize(engine)
         onPreUpdate(engine)
         handleCollision(event)
         takeDamage(amount)
    }

    %% Background
    class Background {
         onInitialize(engine)
    }

    %% RELATIES ONDERAAN
    Game o-- ZombieSpawner
    Game o-- Player
    Actor <|-- Player
    Actor <|-- Zombie
    Actor <|-- Projectile
    Actor <|-- Background
    Player o-- Weapon
    ZombieSpawner o-- Zombie
    Weapon o-- Projectile


    ```