/**
 * Created by harsh on 9/5/16.
 */

var dhis2API = dhis2API || {};


/*Event*/
dhis2API.event = function(){
    this.orgUnit = "";
    this.tei = "";
    this.enrollmentDate = "";
    this.program = "";
    this.programStage = "";
    this.dataValues = []
}


dhis2API.event.prototype.POST = function(msgType,smsDate,phone,callback){
    var event = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: '../../events',
        data: JSON.stringify(event),
        success: function(response){
            response.smsDate = smsDate;
            response.messageType = msgType;
            response.importType = CREATE_EVENT;
            response.phone = phone;

            callback(response)
        },
        error: function(response){
            response.smsDate = smsDate;
            response.messageType = msgType;
            response.importType = CREATE_EVENT;
            response.phone = phone;

            callback(response)
        }
    });

    return def;
}

dhis2API.event.prototype.PUT = function(msgType,smsDate,phone,callback,eventUID){
    var event = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        url: '../../events/'+eventUID,
        data: JSON.stringify(event),
        success: function(response){
            response.smsDate = smsDate;
            response.messageType = msgType;
            response.importType = UPDATE;
            response.reference = eventUID;
            response.phone = phone;

            callback(response)
        },
        error: function(response){
            response.smsDate = smsDate;
            response.messageType = msgType;
            response.importType = UPDATE;
            response.reference = eventUID;
            response.phone = phone;

            callback(response)
        }
    });

    return def;
}

dhis2API.event.prototype.getAPIObject = function(){
    var ent = {
        orgUnit : this.orgUnit,
        trackedEntityInstance : this.tei,
        eventDate : this.eventDate,
        programStage : this.programStage,
        program : this.program,
        dataValues : this.dataValues
    }
    return ent;
}
