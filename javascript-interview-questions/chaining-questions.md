# Chaining based Questions

Q1 - **Implement computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value()**

***// output - 143545000***

    function computeAmount() {
        let totalAmount = 0;
        function Calc() {
            this.lacs = function (amount) {
                totalAmount += amount * 100000;
                return this;
            };
            this.crore = function (amount) {
                totalAmount += amount * 10000000;
                return this;
            };
            this.thousand = function (amount) {
                totalAmount += amount * 1000;
                return this;
            };
            this.value = function () {
                return totalAmount;
            };
        }
        return new Calc();
    }

    console.log(computeAmount().lacs(15).crore(5). crore(2).lacs(20).thousand(45).crore(7).value()); // output - 143545000


Q2 - **Implement calc.add(10).mul(5).sub(30).add(10).value()**

***// output - 30***

    const calc = {
    	  total : 0,
    	  add : function (a) {
    		this.total += a;
    		return this;
    	  },
    	  sub : function (a) {
    		this.total -= a;
    		return this;
    	  },
    	  mul : function (a) {
    		this.total *= a;
    		return this;
    	  },
    	  div : function (a) {
    		this.total /= a;
    		return this;
    	  },
    	  value: function () {
    		return this.total;
    	  } 
    }
    
    const result = calc.add(10).mul(5).sub(30).add(10).value();
    console.log(result); // 30