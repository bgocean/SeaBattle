const record = document.getElementById('record');
const shoot = document.getElementById('shoot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');

const game = {
    ships: [],
    shipCount: 0,
    optionShip: {
        count: [1, 2, 3, 4],
        size: [4, 3, 2, 1]
    },
    generateShip() {
        for (let i = 0; i < this.optionShip.count.length; i++) {
            console.log('count:' +
                this.optionShip.count[i]);
            for (let j = 0; j < this.optionShip.count[i]; j++) {
                console.log('size:' +
                    this.optionShip.size[i]);
                const size = this.optionShip.size[i];
                const ship = this.generateOptionShip(size);
                this.ships.push(ship);
                this.shipCount++;
            }
        }
    },
    generateOptionShip(shipSize) {
        const ship = {
            hit: [],
            location: [],
        };

        const direction = Math.random() < 0.5;
        // [0 до 0.99999999]
        // [0 - 0.499999] / [0.5 - 0.99999] 
        console.log('direction: ', direction);
        let x, y;

        if (direction) {
            console.log('горизонтальный');
            x = Math.floor((Math.random() * 10));
            y = Math.floor((Math.random() * 10));
        } else {
            console.log('вертикальный');
            x = Math.floor((Math.random() * 10));
            y = Math.floor((Math.random() * 10));
        }


        return ship;
    }

};

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
    shoot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shoot.textContent = this.shoot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    },
};

const show = {
    hit(elem) {
        this.changeClass(elem, 'hit');
    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead(elem) {
        this.changeClass(elem, 'dead');
    },
    changeClass(elem, value) {
        elem.className = value;
    }
};

const fire = (event) => {
    const target = event.target;
    if (target.classList.length > 0 || target.tagName !== 'TD' || !game.shipCount) return;
    show.miss(target);
    play.updateData = 'shoot';

    for (let i = 0; i < game.ships.length; i++) {
        const ship = game.ships[i];
        const index = ship.location.indexOf(target.id);
        if (index >= 0) {
            show.hit(target);
            play.updateData = 'hit';
            ship.hit[index] = 'x';
            const life = ship.hit.indexOf('');
            if (life < 0) {
                play.updateData = 'dead';
                for (const id of ship.location) {
                    show.dead(document.getElementById(id));
                }

                game.shipCount -= 1;

                if (!game.shipCount) {
                    header.textContent = 'Игра Окончена!';
                    header.style.color = 'red';

                    if (play.shoot < play.record || play.record === 0) {
                        localStorage.setItem('seaBattleRecord', play.shoot);
                        play.record = play.shoot;
                        play.render();
                    }
                }

            }
        }
    }
};
const init = () => {
    enemy.addEventListener('click', fire);
    play.render();
    game.generateShip();
    again.addEventListener('click', () => {
        location.reload();
    });
    record.addEventListener('dblclick', () => {
        localStorage.clear();
        play.record = 0;
        play.render();
    });
    console.log(game.ships);

};

init();