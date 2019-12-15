function IPMT(rate, period, periods, present, future, type) {
    var type = (typeof type === 'undefined') ? 0 : type;
  
    rate = eval(rate);
    periods = eval(periods);
  
    var payment = PMT(rate, periods, present, future, type);
    
    var interest;
    if (period === 1) {
      if (type === 1) {
        interest = 0;
      } else {
        interest = -present;
      }
    } else {
      if (type === 1) {
        interest = FV(rate, period - 2, payment, present, 1) - payment;
      } else {
        interest = FV(rate, period - 1, payment, present, 0);
      }
    }
    
    return interest * rate;
  }