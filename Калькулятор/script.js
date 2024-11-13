// файл script.js
window.onload = function(){

    let a = ''
    let b = ''
    //let expressionResult = ''
    let selectedOperation = null
    let last = ''
    let lastOper = null
    // окно вывода результата
    outputElement = document.getElementById("result")

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function Update(){
        outputElement.innerHTML =  ` ${a} ${selectedOperation} ${b}`
    }
    //очистка от Infinity
    function onDigitButtonClicked(digit) {
        if (outputElement.innerHTML === "Infinity") {
            outputElement.innerHTML = 0;
            a = '';
            b = '';
            selectedOperation = null;
        }

        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
            }
        }
        outputElement.innerHTML = selectedOperation ? `${a} ${selectedOperation} ${b}` : a.slice(0,15);
    }
    //Циферблат по событиям нажатий
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // Переключение тем
    const themeToggleButton = document.getElementById("theme-toggle");
        themeToggleButton.onclick = function() {
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
        };
    // Кнопоки операций
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return
        selectedOperation = 'x'
        Update();
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return
        selectedOperation = '+'
        Update();
    }

    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return
        selectedOperation = '-'
        Update();

    }

    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return
        selectedOperation = '/'
        Update();
    }
    document.getElementById("btn_op_sign").onclick = function() {
        if(a === '') return
        if(!selectedOperation){
            a = a * (-1)
            outputElement.innerHTML = a
        }
        else{
            b = b * (-1)
            outputElement.innerHTML = b
        }
        Update()
    }
    document.getElementById("btn_op_percent").onclick = function() {
        if(a === '') return
        if (!selectedOperation){
            a = (+a) / 100
        }
        else{
            if(selectedOperation){
                b = (+b) / 100 * a
            }
        }
        Update();
    }
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    document.getElementById('btn_op_backspace').onclick = function(){
        if(!selectedOperation){
            a = a.slice(0, -1);
            Update();
        } else{
            if(selectedOperation){
                b = b.slice(0, -1);
                Update();
            }
        }
    }
    document.getElementById('btn_op_stepen').onclick = function(){
        a = a * a
        outputElement.innerHTML = a.toString().slice(0,15)
    }
    document.getElementById('btn_op_coren').onclick = function(){
        a = Math.sqrt(a)
        a = a
        outputElement.innerHTML = a.toString().slice(0,15)
    }
    document.getElementById('btn_op_factorial').onclick = function(){

        factorial = 1
        if(a > 100){
            outputElement.innerHTML = Infinity
            return;
        }

        while (a > 1){
            factorial *= a
            a -= 1
        }
        a = factorial
        outputElement.innerHTML = a.toString().slice(0,15)
    }
    document.getElementById('btn_op_three_zero').onclick = function(){
        if(!selectedOperation){
            a = a * 1000
            outputElement.innerHTML = a
        }
        else{
            b = b * 1000
            outputElement.innerHTML = b
        }
        outputElement.innerHTML = `${a} ${selectedOperation} ${b}`
    }
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' && expressionResult) {
            // Если `a` пустое, то приравниваем его к предыдущему результату
            a = expressionResult;
        }

        if (b === '' && last && lastOper) {
            // Если `b` пустое, используем последнее введённое значение и операцию
            b = last;
            selectedOperation = lastOper;
        }

        if (a === '' || b === '' || !selectedOperation)
            return;

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
        }
        // Обновляем `a` на результат для отображения
        a = expressionResult.toString()
        // Запоминаем последний операнд и операцию для накопления
        last = b;
        lastOper = selectedOperation;
        // Очищаем `b` и текущую операцию, чтобы быть готовыми к следующему вводу
        b = '';
        selectedOperation = '';

        // Отображаем результат на экране
        outputElement.innerHTML = a.slice(0, 15);
    };

};
