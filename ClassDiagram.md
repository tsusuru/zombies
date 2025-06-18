```mermaid
classDiagram
    %% Engine (Excalibur) basis
    class Engine

    %% Game
    class Game {
        - spawner
        - player
        + constructor()
        + startGame()
        + onPreUpdate(engine)
    }

    %% ZombieSpawner
    class ZombieSpawner {
        - engine
        - interval
        - timer
        + constructor(engine, interval)
        + update(delta)
        + spawn()
    }

    %% Player
    class Player {
        - speed
        - score
        - currentWeapon
        - healthBar
        - currentAim
        + constructor(startPos)
        + onInitialize(engine)
        + onPreUpdate(engine)
        + takeDamage(amount)
    }

    %% Weapon
    class Weapon {
        - ammo
        - damage
        - durability
        - speed
        + constructor(opts)
        + fire(origin, direction, scene)
        + reload(amount)
        + uniqueShot(origin, direction, scene)
    }

    %% Projectile
    class Projectile {
        - direction
        - speed
        - damage
        + constructor(pos, direction, speed, damage)
        + onInitialize(engine)
        + handleCollision(event)
    }

    %% Zombie
    class Zombie {
        - speed
        - droppedMoney
        - maxHealth
        - healthBar
        + constructor(spawnPos, speed, droppedMoney, maxHealth)
        + onInitialize(engine)
        + onPreUpdate(engine)
        + handleCollision(event)
        + takeDamage(amount)
    }

    %% HealthBar
    class HealthBar {
        - healthBar
        + onInitialize(engine)
        + reduceHealth()
    }

    %% Background
    class Background {
        + constructor()
        + onInitialize(engine)
    }

    %% Excalibur basis
    class Actor
    class ScreenElement

    %% RELATIES ONDERAAN
    Engine <|-- Game
    Game o-- ZombieSpawner
    Game o-- Player
    Actor <|-- Player
    Actor <|-- Zombie
    Actor <|-- Projectile
    Actor <|-- Background
    Player o-- Weapon
    Player o-- HealthBar
    ZombieSpawner o-- Zombie
    Zombie o-- HealthBar
    Weapon o-- Projectile
    ScreenElement <|-- HealthBar

    ```