function getAttackValue(min,max) {
    return Math.floor(Math.random() * (max-min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0,
            winner: null,
            logs: []
        };
    },
    watch: {
        playerHealth(value) {
            if (value <=0 && this.monsterHealth <=0) {
                this.winner = "draw";
            }
            else if (value <=0) {
                this.winner = "monster";
            }
            
        },
        monsterHealth(value) {
            if (value <=0 && this.playerHealth <=0) {
                this.winner = "draw";
            }
            else if (value <=0) {
                this.winner = "player";
            }
        }
    },
    computed: {
        monsterHealthValue() {
            return { width: this.monsterHealth + '%' };
        },

        playerHealthValue() {
            return  {width: this.playerHealth + '%' };
        },
        isSpecialAttack() {
            return this.round % 3 !== 0;
        }
    },

    methods: {
        attackMonster() {
        this.round++;
        const attackValue = getAttackValue(5,12);
        console.log(attackValue);
        this.monsterHealth = this.monsterHealth - attackValue;
        this.attackPlayer();
        var logInfo = "Player dealt "+attackValue+" to Monster\n";
        this.logs.push(logInfo);
        },

        attackPlayer() {
            const attackValue = getAttackValue(8,15);
            this.playerHealth = this.playerHealth - attackValue;
            var logInfo = "Monster Dealt back "+attackValue+" to Player";
            this.logs.push(logInfo);
        },
        specialAttack() {
            this.round++;
            const attackValue = getAttackValue(12,16);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
            var logInfo = "Player dealt "+attackValue+" to Monster\n";
            this.logs.push(logInfo);
        },
        healPlayer() {
            this.round++;
            const healValue = getAttackValue(12,20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth = this.playerHealth + healValue;
            }
            this.attackPlayer(); 
        },
        restartGame() {
            this.winner = null;
            this.round = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.logs = [];
        }
    }


});

app.mount("#game");