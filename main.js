const record = document.getElementById('record');
const shoot = document.getElementById('shoot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');

const game = {
    ships: [{
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        },
        {
            location: ['11', '12', '13'],
            hit: ['', '', '']
        },
        {
            location: ['69', '79'],
            hit: ['', '']
        },
        {
            location: ['32'],
            hit: ['']
        },
    ],
    shipCount: 4,
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
    if (target.classList.length > 0 || target.tagName !== 'TD') return;
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

                if (game.shipCount < 1) {
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

    again.addEventListener('click', () => {
        location.reload();
    });

};

init();