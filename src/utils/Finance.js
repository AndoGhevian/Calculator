import { Finance } from 'financejs'

// creating this custom class because fincancejs class does not have IMPT function init!
class CustomFinance extends Finance {
    IPMT(rate, period, periods, present, future, type) {
        var type = (typeof type === 'undefined') ? 0 : type;

        rate = eval(rate);
        periods = eval(periods);

        var payment = this.PMT(rate, periods, present, future, type);

        var interest;
        if (period === 1) {
            if (type === 1) {
                interest = 0;
            } else {
                interest = -present;
            }
        } else {
            if (type === 1) {
                interest = this.FV(rate, period - 2, payment, present, 1) - payment;
            } else {
                interest = this.FV(rate, period - 1, payment, present, 0);
            }
        }

        return interest * rate;
    }
}

export default CustomFinance;