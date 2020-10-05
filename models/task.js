class Task{
    constructor(taskId, tenderId, heading, detail, status, genrationTime, 
                genrationDate,attachment,owner,userAssigned,deadlineDate,deadlineTime,
                acceptance, comment){
        this.taskId = taskId;
        this.tenderId = tenderId;
        this.heading = heading;
        this.detail = detail;
        this.status = status;
        this.genrationTime = genrationTime;
        this.genrationDate = genrationDate;
        this.attachment = attachment;
        this.owner = owner;
        this.userAssigned = userAssigned;
        this.deadlineDate = deadlineDate;
        this.deadlineTime = deadlineTime;
        this.acceptance = acceptance;
        this.comment = comment;
    }
}

export default Task;