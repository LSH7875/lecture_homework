const Lottery = artifacts.require("Lottery");
const assertRevert = require('./assertRever');
const expectEvent = require('./expectEvent')


contract('Lottery',function ([deployer,user1,user2]){
    let lottery;
    let betAmount = 5 * 10 ** 15;
    let bet_block_interval = 3;
    let betAmountBN = new web3.utils.BN('5000000000000000');

    beforeEach(async()=>{
        console.log('Before each');
        lottery = await Lottery.new();//배포해 줄 수 있다. 
    })

    it ('Basic test',async()=>{
        console.log('Basic test');
        let owner = await lottery.owner();
        // let value = await lottery.getSomeValue();
        console.log(`owner ${owner}`);
        // console.log(`value ${value}`);
        // assert.equal(value,5);
    })
    // it.only('getPot should return current pot',async()=>{
    //     //mochatest에서 특정 부분만 테스트할 때 only를 써주면 된다.
    //     let pot = await lottery.getPot();
    //     assert.equal(pot,0); 
    // })

    describe('Bet',function () {
        it('shold fail when the bet money is not 0.005 ETH', async () => {
            //Fail transaction
            //스마트 컨트랙트를 만들때는 transaction object이라는 것을 줄 수가 있다.
            //transaction object {chainId, value, to from, gas(Limit), gasPrice} 
            await lottery.bet('0xab',{from :user1, value:4000000000000000});
            //try catch 문으로 보내서 revert가 들어있으면 제대로 잡았다. 
        })
        it('should put the bet to the bet queue with 1 bet', async () => {
            //bet
            let receipt = await lottery.bet('0xab',{from :user1, value:betAmount});
            console.log(receipt);
            
            let pot=  await lottery.getPot();
            assert.equal(pot,0);
            
            //check contract balance ==0.005
            let contractBalance = await web3.eth.getBalance(lottery.address);
            assert.equal(contractBalance,betAmount);

            //check bet info betinfo에 제대로 들어갔는지 확인해봐야 한다
            let currentBlockNumber = await web3.eth.getBlockNumber();//현재 마이닝된 블럭 넘버를 가져온다. 
            let bet = await lottery.getBetInfo(0);
            assert.equal(bet.answerBlockNumber,currentBlockNumber + bet_block_interval);
            assert.equal(bet.bettor,user1);
            assert.equal(bet.challenges,'0xab');
            //check log
            // console.log(receipt.logs
        await expectEvent.inLogs(receipt.logs,'BET');        
        })
    
    
    })

    describe('isMatch',function(){
        let blockHash = "0xd3b8938e583c758a102be9b53419707f3258044a01c15be194a4a74690eedf82";
        it('should be BettingResult',async () =>{           
            let matchingResult = await lottery.isMatch('0xd3',blockHash);
            assert.equal(matchingResult,1);
        })

        it('should be BettingResult.Fail',async()=>{
            let matchingResult = await lottery.isMatch('0xf2',blockHash);
            assert.equal(matchingResult,0);
        })
        it('shold be BettingResult.Draw',async()=>{
            let matchingResult = await lottery.isMatch('0xd2',blockHash);
            assert.equal(matchingResult,2);
        })
    })

    describe('Distribute',function () {
        describe('When the answer is checkable', function () {
            it.only('should give the user the pot when the answer matches',async ()=>{
                await lottery.setAnswerForTest('0xd3b8938e583c758a102be9b53419707f3258044a01c15be194a4a74690eedf82',{from:deployer});
                await lottery.betAndDistribute('0xef',{from:user2,value:betAmount});
                await lottery.betAndDistribute('0xef',{from:user2,value:betAmount});
                await lottery.betAndDistribute('0xd3',{from:user1,value:betAmount});
                await lottery.betAndDistribute('0xef',{from:user2,value:betAmount});
                await lottery.betAndDistribute('0xef',{from:user2,value:betAmount});
                await lottery.betAndDistribute('0xef',{from:user2,value:betAmount});
                
                let potBefore = await lottery.getPot();//0.01ETH
                // console.log(`value :`,potBefore.toString())
                let user1BalanceBefore = await web3.eth.getBalance(user1);
                
                await lottery.betAndDistribute('0xef',{from:user2,value:betAmount});//이 때 user1에게 pot이 간다.ㅣ

                let potAfter = await lottery.getPot();//0
                let user1BalanceAfter = await web3.eth.getBalance(user1);

                //pot의 변화량 확인
                assert.equal(potBefore.toString(), new web3.utils.BN('10000000000000000').toString());
                assert.equal(potAfter.toString(), new web3.utils.BN('0').toString());

                user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
                assert.equal(user1BalanceBefore.add(potBefore).add(betAmountBN).toString(), new web3.utils.BN(user1BalanceAfter).toString());
            } )
        })
        describe('When the answer is not revealed(Not Minded',function (){

        })
        describe('When the answer is not revealed(Block limit is passed',function (){

        })
    })
})