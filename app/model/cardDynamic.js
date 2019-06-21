export default class CardDynamic{
    constructor(){
        let merchantList;
        let oldCard;
        let newCard;
    }

    setMerchantList(merchantList){
        this.merchantList = merchantList;
    }

    getMerchantList(){
        return this.merchantList;
    }

    setNewCard(card){
        this.newCard = card;
    }

    addMerchantsToList(list){
        return this.merchantList.push(list);
    }

    getNewCard(){
        return this.newCard;
    }

    setOldCard(card){
        this.oldCard = card;
    }

    getOldCard(){
        return this.oldCard;
    }

}