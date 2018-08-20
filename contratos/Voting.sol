pragma solidity ^0.4.24;

contract Voting {
    //variáveis
    mapping (uint8 => Candidate) public votesCandidates;
    mapping (address => bool) public voter;
    uint8[] public candidateCodesListing;
    
    //struct de candidato
    struct Candidate {
        uint8 code;
        uint8 votes;
    }
    //modificador para validar se candidato existe
    modifier onlyValidCandidate(uint8 _candidateCode) {
        require(votesCandidates[_candidateCode].code != 0X0);
        _;
    }
    //construtor adicionar código dos candidatos
    constructor(uint8[] _candidateCodes) public {
        addCandidates(_candidateCodes);
        candidateCodesListing = _candidateCodes;
    }
    //função interna para adicionar candidatos
    function addCandidates (uint8[] _candidateCodes) internal {
        for(uint i = 0; i < _candidateCodes.length; i++) {
            votesCandidates[_candidateCodes[i]] = Candidate(_candidateCodes[i], 0);
        }
    }
    //função para retornar a quantidade de votos de um candidato
    function getTotal(uint8 _candidateCode) public view onlyValidCandidate(_candidateCode) returns (uint8) {
        return votesCandidates[_candidateCode].votes;
    }
    //função recebe o código do candidato para realizar o voto
    function vote(uint8 _candidateCode) public onlyValidCandidate(_candidateCode) {
        require(!voter[msg.sender]);
        voter[msg.sender] = true;
        votesCandidates[_candidateCode].votes++;
    }
}
