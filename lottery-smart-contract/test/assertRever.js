module.export = async(promise)=>{
    try{
        await promise;
        assert.fail('Expectee rever not recedived');
    }catch(error){
        const revertFound = error.message.search('revert') >= 0;
        assert(revertFound, `Expected "revert", got ${error} instead`);
    }
}