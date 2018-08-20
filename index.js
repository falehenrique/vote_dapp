var web3;
var abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateCodesListing","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"votesCandidates","outputs":[{"name":"code","type":"uint8"},{"name":"votes","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_candidateCode","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_candidateCode","type":"uint8"}],"name":"getTotal","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_candidateCodes","type":"uint8[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var contractVote;
let addressContract = '0xdda6327139485221633a1fcd65f4ac932e60a2e1';
let candidates = {
    "Alice": 1,
    "Bob": 2,
    "Nick": 3
};

$(document).ready(function () {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    contractVote = web3.eth.contract(abi);
    contractInstance = contractVote.at(addressContract);
    showCandidates();
});

$("#btnVote").click(function () {
    candidateName = $("#candidate").val();
    contractInstance.vote(candidateName, {
        from: web3.eth.accounts[1]
    }, function (error, result) {
        if (error) {
            console.info(error);
        } else {
            let div_id = candidates[candidateName];
            $("#" + div_id).html(contractInstance.getTotal.call(candidateName).toString());
        }
    });
})


function showCandidates() {
    names = Object.values(candidates);
    for (var i = 0; i < names.length; i++) {
        let name = names[i];

        contractInstance.getTotal(name, (err, result) => {
          if (!err) {
            console.info(result);
            $("#" + candidates[name]).html(result);
          } else {
            console.error(error)
          }
        })
    }
}
