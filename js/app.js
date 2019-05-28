class Converter {
    constructor() {
        this.units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        this.tenToSixteen = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis'];
        this.tens = ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        this.elMessage = document.getElementById('message');
        this.addListener();
    }

    addListener() {
        let elInput = document.getElementById('field-number');
        elInput.addEventListener('keyup', () => {
            if (elInput.value !== '') {
                this.convertToText(elInput.value);
            } else {
                this.elMessage.innerText = '';
            }
        });
    }

    convertToText(number) {
        number = this.deleteZerosLeft(number);
        if (!this.validateNumber(number)) {
            this.elMessage.innerText = 'Sólo se aceptan números enteros positivos.';
            return;
        }
        this.elMessage.innerText = this.getName(number);
    }

    deleteZerosLeft(number) {
        let i = 0;
        let isZero = true;
        for (i = 0; i < number.length; i++) {
            if (number.charAt(i) != 0) {
                isZero = false;
                break;
            }
        }
        return isZero ? '0' : number.substr(i);
    }

    validateNumber(number) {
        if (isNaN(number) || number === '') {
            return false;
        }

        if (number.indexOf('.') >= 0) {
            return false;
        }

        if (number.indexOf('-') >= 0) {
            return false;
        }
        return true;
    }

    getName(number) {
        if (number.length === 1) {
            return this.getUnits(number);
        }

        if (number.length === 2) {
            return this.getTens(number);
        }

        return 'Número demasiado grande.';
    }

    getUnits(number) {
        let numberInt = parseInt(number);
        return this.units[numberInt];
    }

    getTens(number) {
        let units = number.charAt(1);
        if (number < 17) {
            return this.tenToSixteen[number - 10];
        }
        if (number < 20) {
            return 'dieci' + this.getUnits(units);
        }

        switch (number) {
            case '20':
                return 'veinte';
            case '22':
                return 'veintidós';
            case '23':
                return 'veintitrés';
            case '26':
                return 'veintiséis';
        }

        if (number < 30) {
            return 'veinti' + this.getUnits(units);
        }

        let name = this.tens[number.charAt(0) - 3];
        if (units > 0) {
            name += ' y ' + this.getUnits(units);
        }
        return name;
    }
}

new Converter();
