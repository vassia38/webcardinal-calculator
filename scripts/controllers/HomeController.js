const { WebcController } = WebCardinal.controllers;

class HomeController extends WebcController{

    initializeModel = () => ({
        displayedNum: {
            text:'0'
        },
        myDataset: {
            firstValue: '',
            operator: '',
            modValue: '',
            previousKeyType: ''
        },
        historyList: [

        ]
    });

    constructor(element, history) {
        super(element, history);

        this.model = this.initializeModel();
        this.onTagEvent('my-board', 'click', (model,target,event) => {
            console.log(event.target);
            if (event.target.matches("button")) {
                const btn = event.target;
                if (btn.dataset.tag == undefined)
                    btn.dataset.tag = "number";
                console.log("[before] displayed number is " + this.model.displayedNum.text);
            }
        });
        this.onTagEvent('number', 'click', (model, target, event) => {
            const btn = event.target;
            const action = btn.dataset.tag;
            let previousKeyType = this.model.myDataset.previousKeyType;
            let displayedNum = this.model.displayedNum.text;
            const btnContent = btn.textContent;
            console.log("number " + btnContent + " key!");
            this.model.displayedNum.text = displayedNum == "0" || previousKeyType == "operator" ||
                previousKeyType == "calculate"
                ? btnContent
                : displayedNum + btnContent;

            this.model.myDataset.previousKeyType = action;
            if (previousKeyType == "calculate") {
                this.clearDataset();
            }
        });
        this.onTagEvent('decimal', 'click', (model, target, event) => {
            const btn = event.target;
            const action = btn.dataset.tag;
            let previousKeyType = this.model.myDataset.previousKeyType;
            console.log("decimal key! ");
            if (previousKeyType == "calculate" || previousKeyType == "operator") {
                this.model.displayedNum.text = "0.";
            }
            if (this.model.displayedNum.text.includes(".") == false) {
                this.model.displayedNum.text += ".";
            }

            this.model.myDataset.previousKeyType = action;
            if (previousKeyType == "calculate") {
                this.clearDataset();
            }
        });
        this.onTagEvent('operator', 'click', (model, target, event) => {
            const btn = event.target;
            const action = btn.dataset.tag;
            let { firstValue, operator, modValue, previousKeyType } = this.model.myDataset;
            let displayedNum = this.model.displayedNum.text;
            console.log(action + " key!");
            let result = displayedNum;
            if (firstValue && operator && previousKeyType != "operator" && previousKeyType != "calculate") {
                result = this.calculate(firstValue, displayedNum, operator);
                this.updateHistory(firstValue, displayedNum, operator, result);
            }

            this.model.myDataset.previousKeyType = action;
            this.model.myDataset.operator = btn.dataset.operator;
            console.log("wanna update between " + result + " " + displayedNum)
            if (firstValue && operator && previousKeyType != "operator" && previousKeyType != "calculate") {
                this.model.myDataset.firstValue = result;
            }
            else {
                this.model.myDataset.firstValue = displayedNum;
            }
            console.log(this.model.myDataset.firstValue);
            this.model.displayedNum.text = result;
        });
        this.onTagEvent('calculate', 'click', (model, target, event) => {
            const btn = event.target;
            const action = btn.dataset.tag;
            let { firstValue, operator, modValue, previousKeyType } = this.model.myDataset;
            let displayedNum = this.model.displayedNum.text;
            let result = displayedNum;
            if (firstValue != '') {
                result = this.calculate(firstValue, displayedNum, operator);
                let first = firstValue;
                let second = displayedNum;
                if (previousKeyType == 'calculate') {
                    first = displayedNum;
                    second = modValue;
                }
                result = this.calculate(first, second, operator);
                this.updateHistory(first, second, operator, result);
            }

            this.model.myDataset.previousKeyType = action;
            this.model.myDataset.modValue = firstValue && previousKeyType == "calculate"
                ? modValue
                : displayedNum;
            this.model.displayedNum.text = result;
        });
        this.onTagEvent('clear', 'click', (model, target, event) => {
            this.model.displayedNum.text = '0';
            this.clearDataset();
        });
        this.onTagEvent('entry', 'click', (model, target, event) => {
            let n = `${model.vals.res}`;
            console.log("entry click! entry display number is " + n);
            this.model.displayedNum.text = n;
            this.clearDataset();
        });
    }

    calculate(n1, n2, op){
        console.log("[calculate op] " + n1 + " " + n2 + " " + op);
        const a = parseFloat(n1), b = parseFloat(n2);
        if (op == "add") return (a + b).toString();
        if (op == "subtract") return (a - b).toString();
        if (op == "multiply") return (a * b).toString();
        if (op == "divide") return (a / b).toString();
    }
    clearDataset() {
        this.model.myDataset.firstValue = '';
        this.model.myDataset.modValue = '';
        this.model.myDataset.operator = '';
        this.model.myDataset.previousKeyType = '';
    }
    updateHistory(first, second, op, res){
        let entry = { first, second, op, res };
        let entrytext = this.createExprString(entry);
        this.model.historyList.push({
            text: `${entrytext}`,
            vals: entry
        });
    }
    createExprString(entry){
        let { first, second, op, res } = entry;
        if (op == "add") return first + "+" + second + "=" + res;
        if (op == "subtract") return first + "-" + second + "=" + res;
        if (op == "multiply") return first + "*" + second + "=" + res;
        if (op == "divide") return first + "/" + second + "=" + res;
    }
}

export default HomeController