// simple calculator script

// select all the buttons and display elem
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

// add event listener to each button in doc
buttons.forEach(function (button) {
    button.addEventListener('click', calculate);
});

const operator_function = {
    '+': function (a, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        return a + b;
    },

    '-': function (a, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        return a - b;
    },

    '*': function (a, b) {
        if (a === '0' || b === '0')
            return 0;
        else {
            a = parseFloat(a);
            b = parseFloat(b);
            return a * b;
        }
    },

    '/': function (a, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        if (b !== 0.0) {
            return a / b;
        } else
            return 0;
    }
}

const stack_handler = {
    VARSTACK: [],
    OPSTACK: [],
    var_length: 0,
    op_length: 0,

    PUSH_VAR: function (value) {
        this.VARSTACK.push(value);
        this.var_length++;
    },
    POP_VAR: function () {
        this.var_length--;
        return this.VARSTACK.pop();
    },
    PUSH_OP: function (value) {
        this.OPSTACK.push(value);
        this.op_length++;
    },
    POP_OP: function () {
        this.op_length--;
        return this.OPSTACK.pop();
    },
    CLEAR_VARSTACK: function () {
        this.VARSTACK = [];
        this.var_length = 0;
    },
    CLEAR_OPSTACK: function () {
        this.OPSTACK = [];
        this.op_length = 0;
    }
}

const event_caller = {
    float: false,

    NUMBER: function (value) {
        if (value !== '.') {
            display.value += value;
        } else if (!this.float) {
            this.float = true;
            display.value += value;
        }

    },

    OPERATOR: function (value) {
        if (display.value !== '') {
            stack_handler['PUSH_VAR'](parseFloat(display.value));
            stack_handler['PUSH_OP'](value);
            display.value = '';
            this.float = false;
        }
    },

    RESULT: function () {
        if (display.value !== '')
            stack_handler['PUSH_VAR'](parseFloat(display.value));
        if (stack_handler['var_length'] === 1)
            display.value = stack_handler['POP_VAR']();
        else {
            display.value = compute();
        }
        this.float = false;
    },

    CLEAR: function () {
        display.value = '';
        this.float = false;
    },

    ALLCLEAR: function () {
        display.value = '';
        stack_handler['CLEAR_VARSTACK']();
        stack_handler['CLEAR_OPSTACK']();
        this.float = false;
    },

    DELETE: function () {
        display.value = display.value.slice(0, -1);
        if (!display.value.includes('.'))
            this.float = false;
    }
}

const button_type = {
    "/": event_caller['OPERATOR'],
    "*": event_caller['OPERATOR'],
    "-": event_caller['OPERATOR'],
    "+": event_caller['OPERATOR'],
    "=": event_caller['RESULT'],
    "C": event_caller['CLEAR'],
    "AC": event_caller['ALLCLEAR'],
    "DEL": event_caller['DELETE']
}

function calculate(event) {
    const clickedButtonValue = event.target.value;

    if (button_type.hasOwnProperty(clickedButtonValue)) {
        let callEvent = button_type[clickedButtonValue];
        callEvent(clickedButtonValue);
    } else {
        let callEvent = event_caller['NUMBER'];
        callEvent(clickedButtonValue);
    }


}

function compute() {
    var a = 0;
    var b = 0;
    var op = '';
    var func;

    while (stack_handler['op_length'] > 0) {
        op = stack_handler['POP_OP']();
        a = stack_handler['POP_VAR']();
        b = stack_handler['POP_VAR']();
        func = operator_function[op];
        stack_handler['PUSH_VAR'](func(b, a));
    }

    return stack_handler['POP_VAR']();
}