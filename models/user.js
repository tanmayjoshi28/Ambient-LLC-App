class User{
    constructor(email,tokenId,userId,username,adminStatus){
        this.email = email;
        this.tokenId = tokenId;
        this.userId = userId;
        this.username = username;
        this.adminStatus = adminStatus;
    }
}

export default User;