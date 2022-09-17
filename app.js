const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll("[data-operator]")
const equalsButton = document.querySelector('[data-equalto]')
const deleteButton = document.querySelector("[data-del]")
const clearButton = document.querySelector("[data-clr]")
const display = document.querySelector('displayInput')
const previousElement = document.querySelector("[data-previous-operand]")
const currentElement = document.querySelector("[data-current-operand]")
const buttons = document.querySelector(".btn")
class Calculator{
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    compute() {
        let result
        let op1 = parseFloat(this.previousOperand)
        let op2 = parseFloat(this.currentOperand)
        if (isNaN(op1) || isNaN(op2)) return
        switch (this.operation) {
            case '+':
                result = op1+op2
                break;
            case '-':
                result = op1-op2
                break;
            case 'x':
                result = op1*op2
                break;
            case '÷':
                result = op1/op2
                break;
            case '%':
                result = (op1*op2)/100
                break;
        
            default:
                return
                break;
        }
        this.operation = undefined
        this.currentOperand = result
        this.previousOperand = ''
    }
    updatedisplay() {
        this.currentElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousElement.innerText = this.currentElement +this.operation
        }
    
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }    
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
}
const Calc = new Calculator(previousElement,currentElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        Calc.appendNumber(button.innerText)
        Calc.updatedisplay()
    })
            
});
opButtons.forEach(button => {
    button.addEventListener('click', () => {
        Calc.chooseOperation(button.innerText)
        Calc.updatedisplay()
    })
})
equalsButton.addEventListener('click', button => {
    Calc.compute()
    Calc.updatedisplay()
})
clearButton.addEventListener('click', button => {
    Calc.clear()
    Calc.updatedisplay()
})
deleteButton.addEventListener('click', button => {
    Calc.delete()
    Calc.updatedisplay()
})
// buttons.addEventListener('click',() => {
//         buttons.style.transform = "scale(1.2)"
//         buttons.style.transition = "transform 100ms ease"
    
// })