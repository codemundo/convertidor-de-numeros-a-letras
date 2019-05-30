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

    // Elimina los ceros a la izquierda
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
        // Validar que la cadena sea un número y que no esté vacía
        if (isNaN(number) || number === '') {
            return false;
        }
        // Validar que no tenga punto decimal
        if (number.indexOf('.') >= 0) {
            return false;
        }
        // Validar que el número no sea negativo
        if (number.indexOf('-') >= 0) {
            return false;
        }
        return true;
    }

    getName(number) {
        number = this.deleteZerosLeft(number);

        if (number.length === 1) {
            return this.getUnits(number);
        }
        if (number.length === 2) {
            return this.getTens(number);
        }
        if (number.length === 3) {
            return this.getHundreds(number);
        }
        if (number.length < 7) {
            return this.getThousands(number);
        }
        if (number.length < 13) {
            return this.getPeriod(number, 6, 'millón');
        }
        if (number.length < 19) {
            return this.getPeriod(number, 12, 'billón');
        }
        return 'Número demasiado grande.';
    }

    getUnits(number) {
        let numberInt = parseInt(number);
        return this.units[numberInt];
    }

    getTens(number) {
        // Obtener las unidades
        let units = number.charAt(1);

        if (number < 17) {
            return this.tenToSixteen[number - 10];
        }
        if (number < 20) {
            return 'dieci' + this.getUnits(units);
        }
        // Nombres especiales
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

    getHundreds(number) {
        let name = '';
        // Obtener las centenas
        let hundreds = number.charAt(0);
        // Obtener las decenas y unidades
        let tens = number.substr(1);

        if (number == 100) {
            return 'cien';
        }
        // Nombres especiales
        switch(hundreds) {
            case '1':
                name = 'ciento';
                break;
            case '5':
                name = 'quinientos';
                break;
            case '7':
                name = 'setecientos';
                break;
            case '9':
                name = 'novecientos';
        }
        if (name === '') {
            name = this.getUnits(hundreds) + 'cientos';
        }
        if (tens > 0) {
            name += ' ' + this.getName(tens);
        }
        return name;
    }

    getThousands(number) {
        let name = 'mil';
        // Obtener cuantos dígitos están en los miles
        let thousandsLength = number.length - 3;
        // Obtener los miles
        let thousands = number.substr(0, thousandsLength);
        // Obtener las centenas, decenas y unidades
        let hundreds = number.substr(thousandsLength);

        if (thousands > 1) {
            // Se reemplaza la palabra uno por un en numeros como 21000, 31000, 41000, etc.
            name = this.getName(thousands).replace('uno', 'un') + ' mil';
        }
        if (hundreds > 0) {
            name += ' ' + this.getName(hundreds);
        }
        return name;
    }

    // Obtiene periodos, por ejemplo: millones, billones, etc.
    getPeriod(number, digitsToTheRight, periodName) {
        let name = 'un ' + periodName;
        // Obtener cuantos dígitos están dentro del periodo
        let periodLength = number.length - digitsToTheRight;
        // Obtener los dítos del periodo
        let periodDigits = number.substr(0, periodLength);
        // Obtener los digitos previos al periodo
        let previousDigits = number.substr(periodLength);

        if (periodDigits > 1) {
            name = this.getName(periodDigits).replace('uno', 'un') + ' ' + periodName.replace('ó', 'o') + 'es';
        }
        if (previousDigits > 0) {
            name += ' ' + this.getName(previousDigits);
        }
        return name;
    }
}

new Converter();
