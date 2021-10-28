const assert= require('chai').assert;
//npm i chai

const inLogs = async (logs,eventName)=>{
    const event = logs.find(e=>e.event === eventName);
    assert.exists(event);
}
module.exports = {
    inLogs
}