import md5 from "md5";

export default class Setup{
    constructor(issuerId, secret, fileName){
        this.issuerId = issuerId;
        this.secret = md5(secret);
        this.fileName = fileName;
        this.storageClear();
        this.save();
    }

    storageClear() {
        sessionStorage.clear();
    }

    save() {
        localStorage.setItem('issuerid', this.issuerId);
        sessionStorage.setItem('secret', this.secret);
        localStorage.setItem('fileName', this.fileName);
    }
}