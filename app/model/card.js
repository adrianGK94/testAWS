export default class Card{
    constructor(pan, expDate){
        this.pan = pan;
        this.expDate = expDate;
    }

    getCardNumber() {
        return this.pan.substring(12, 16);
    }

    getExpDate() {
        let month = this.expDate.substring(0, 2);
        let year = this.expDate.substring(2, 6);
        return this.getMonthName(month) + ' ' + year;
    }

    getMonthName(month) {
        let monthNames = new Array();
        monthNames[0] = "January";
        monthNames[1] = "February";
        monthNames[2] = "March";
        monthNames[3] = "April";
        monthNames[4] = "May";
        monthNames[5] = "June";
        monthNames[6] = "July";
        monthNames[7] = "August";
        monthNames[8] = "September";
        monthNames[9] = "October";
        monthNames[10] = "November";
        monthNames[11] = "December";
        return monthNames[parseInt(month) - 1];
    }
}