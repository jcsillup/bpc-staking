import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {useEffect, useState} from 'react'
import Link from "next/link";
import WalletLink from "walletlink";

export default function Mint() {

    const [webbi3, setWebbi3] = useState(null)
    const [connected, setConnected] = useState(false)
    const [wallet, setWallet] = useState(null)
    const [hash, setHash] = useState(null)
    const [mintAmount, setMintAmount] = useState(1)
    const [activeTab, setActiveTab] = useState(0)
    const [stakingSize, setStakingSize] = useState(1000)
    const [walletID, setWalletID] = useState(null)
    // const [web3Modal, setWeb3Modal] = useState(null)
    const [stakes, setStakes] = useState(null)
    const [loadingStakes, setLoadingStakes] = useState(null)
    const [ticketPrice, setTicketPrice] = useState(null)
    const [ticketCount, setTicketCount] = useState(null)
    const [ticketAmount, setTicketAmount] = useState(1)
    const [currentLotteryId, setCurrentLotteryId] = useState(null)
    const [currentLotteryPot, setCurrentLotteryPot] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [rawTicketPrice, setRawTicketPrice] = useState(null)
    const [p, setP] = useState(null)
    const [termsOpen, setTermsOpen] = useState(false)
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [customStakingSize, setCustomStakingSize] = useState(false)
    const [allowedAmount, setAllowedAmount] = useState(true)

    let contractAddress = "0x3b5587810ca83612fcb75b10c6c5d7c54f61a362"
    let lotteryContract = "0xAd0A7E99Deb22d59A724f620a5273e914fBacB84"
    let abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_rate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_stake_limit",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_company_account",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "BeforeTokenTransfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Staked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "operatorData",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fromBalance",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "toBalance",
                    "type": "uint256"
                }
            ],
            "name": "TokensReceivedCalled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "operatorData",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fromBalance",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "toBalance",
                    "type": "uint256"
                }
            ],
            "name": "TokensToSendCalled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawn",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "_TOKENS_RECIPIENT_INTERFACE_HASH",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_TOKENS_SENDER_INTERFACE_HASH",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_erc1820",
            "outputs": [
                {
                    "internalType": "contract IERC1820Registry",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC777",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "interfaceHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "canImplementInterfaceForAddress",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllowedStakeSizes",
            "outputs": [
                {
                    "internalType": "string[10]",
                    "name": "",
                    "type": "string[10]"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_stake_id",
                    "type": "uint256"
                }
            ],
            "name": "getStake",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "account_owner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stake",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Stake",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStakeIds",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStakingLimit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "recipientFor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                }
            ],
            "name": "registerRecipient",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "registerSender",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC777",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "send",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "senderFor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_bpc",
                    "type": "address"
                }
            ],
            "name": "setERC777",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "new_APY_rate",
                    "type": "uint256"
                }
            ],
            "name": "setRate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "shouldRevert",
                    "type": "bool"
                }
            ],
            "name": "setShouldRevertReceive",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "shouldRevert",
                    "type": "bool"
                }
            ],
            "name": "setShouldRevertSend",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "bpc_tokens",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "addr_from",
                    "type": "address"
                }
            ],
            "name": "stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "userData",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "operatorData",
                    "type": "bytes"
                }
            ],
            "name": "tokensReceived",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "userData",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "operatorData",
                    "type": "bytes"
                }
            ],
            "name": "tokensToSend",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_stake_id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "addr_for",
                    "type": "address"
                }
            ],
            "name": "withdrawStake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    let lotteryAbi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_ticket_price","type":"uint256"},{"internalType":"address","name":"_company_account","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[],"name":"BeforeTokenTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"operatorData","type":"bytes"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"fromBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toBalance","type":"uint256"}],"name":"TokensReceivedCalled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"operatorData","type":"bytes"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"fromBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toBalance","type":"uint256"}],"name":"TokensToSendCalled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"winner_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lottery_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"prize_size","type":"uint256"}],"name":"WinnerAnnounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"lottery_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"prize_size","type":"uint256"}],"name":"WinnerPaid","type":"event"},{"inputs":[],"name":"_TOKENS_RECIPIENT_INTERFACE_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_TOKENS_SENDER_INTERFACE_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_erc1820","outputs":[{"internalType":"contract IERC1820Registry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"announceWinnerAndRevolve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC777","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"bpc_tokens_amount","type":"uint256"},{"internalType":"address","name":"participant","type":"address"}],"name":"buyTicket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"interfaceHash","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"canImplementInterfaceForAddress","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forceAnnounceWinnerAndRevolve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentLotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentLotteryPot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"getCurrentLotteryTicketsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTicketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"recipientFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"registerRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"registerSender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC777","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"send","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"senderFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_bpc","type":"address"}],"name":"setERC777","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"shouldRevert","type":"bool"}],"name":"setShouldRevertReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"shouldRevert","type":"bool"}],"name":"setShouldRevertSend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"new_ticket_price","type":"uint256"}],"name":"setTicketPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"},{"internalType":"bytes","name":"operatorData","type":"bytes"}],"name":"tokensReceived","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"},{"internalType":"bytes","name":"operatorData","type":"bytes"}],"name":"tokensToSend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unPause","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    let provider;
    let account;
    let web3Modal;

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                    infuraId: "3098d5501f6049309b14eef22dc0bd40"
                }
            },
            walletlink: {
                package: WalletLink, // Required
                options: {
                  appName: "Big Picture Coin", // Required
                  infuraId: "3098d5501f6049309b14eef22dc0bd40"
                }
              }
      };
      
      useEffect(() => {
        web3Modal = new Web3Modal({
            providerOptions, // required,
            cacheProvider: false
      });
      setTermsOpen(false)
      setAcceptedTerms(false)
      }, [activeTab])

      useEffect(() => {
          if(currentLotteryId && p) {
            getTicketCount(currentLotteryId)
          }
      }, [currentLotteryId, p])

      useEffect(() => {
        if(p) {
          getLotteryData()
        }
    }, [wallet, p])

    useEffect(() => {
        if(p && currentLotteryId) {
            getTicketCount(currentLotteryId)
        }
    }, [wallet, p])


      async function connect() {
        window.localStorage.removeItem("walletconnect")
 
        try {
            web3Modal.clearCachedProvider() 
            provider = await web3Modal.connect();
            setP(provider)
            provider.on("accountsChanged", (accounts) => {
              fetchAccountData();
              console.log("Changed account to: " + accounts[0])
          });
         
           // Subscribe to chainId change
           provider.on("chainChanged", (chainId) => {
             setChainId(chainId)
             console.log("changed to: " + chainId)
           });
         
           // Subscribe to networkId change
           provider.on("networkChanged", (networkId) => {
            setChainId(networkId)
               fetchAccountData();
           });
         if(provider) {
            console.log("REFRESGIN")
            refreshAccountData()
         }
         } catch (addError) {
           console.log("Error")
         }
        
     }

    async function getStakedInfo(wallet) {
        console.log("Getting staked info for "+ wallet)
        const web3 = new Web3(provider);
        setLoadingStakes(true)
        const contract = new web3.eth.Contract(abi, contractAddress)

        let stakes = []
        let sortedStakes;


        /*try {
            const ids = await contract.methods.getStakeIds().call({'from': wallet})
            stakeIDs = ids
          } catch (addError) {
            setLoadingStakes(false)
            setStakes(null)
            return
          }*/


        const stakeIDs = await contract.methods.getStakeIds().call({'from': wallet}, function (err, res) {
            if (err) {
                console.log("An error occured", err)
                setStakes(null)
                setLoadingStakes(false)
                return
            }
            console.log(res)
            return(res)
        })

        for(var i = 0; i < stakeIDs.length; i++) {
            await contract.methods.getStake(stakeIDs[i]).call({'from': wallet}, function (err, res) {
                if (err) {
                    console.log("An error occured", err)
                    
                    return
                }
                const web3 = new Web3(provider);
                const stakeDate = new Date(res.timestamp*86400*1000)
                const amount = web3.utils.fromWei(res.stake)
                stakes.push({
                    id: stakeIDs[i], account_owner: res.account_owner, stake: amount, timestamp: stakeDate
                })
                return
            })
        }
        
        sortedStakes = stakes.sort((a, b) => a.id - b.id)

        setStakes(stakes)
        setLoadingStakes(false)
    }


    async function fetchAccountData() {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId()
        setWallet(accounts[0])
        setChainId(chainId)
        if(chainId == "1") {
            getLotteryData()
          getStakedInfo(accounts[0])
        }
    }

    /*async function getHands(i) {
        const contract = new webbi3.eth.Contract(abi, contractAddress)
        const data = await contract.methods.getTokenIdCardId(i).call()
        return(data)
    }*/

    async function stake() {
        
        const web3 = new Web3(p);
        const contract = new web3.eth.Contract(abi, contractAddress)
        const amount = web3.utils.toWei(stakingSize.toString(), 'ether')
        //const amount = web3.utils.toBN(stakingSize*10**18)
        let encoded = contract.methods.stake(amount, wallet).encodeABI()

        let tx = {
            from: wallet,
            to : contractAddress
        }

        contract.methods.stake(amount, wallet).send(tx,function (error, result){ 
            if(!error){
              setHash(result)
            } else{
                console.log(error);
          }})

    }

    async function withdraw(id) {

        const web3 = new Web3(p);
        const contract = new web3.eth.Contract(abi, contractAddress)
        //const amount = web3.utils.toWei(stakingSize.toString(), 'ether')
        //const amount = web3.utils.toBN(stakingSize*10**18)
        let encoded = contract.methods.withdrawStake(id, wallet).encodeABI()

        let tx = {
            from: wallet,
            to : contractAddress
        }

        contract.methods.withdrawStake(id, wallet).send(tx,function (error, result){ 
            if(!error){
              setHash(result)
            } else{
                console.log(error);
          }})  

    }


    async function getLotteryData() {
            console.log("Getting lottery data for: " + wallet)
            let web3;
            if(p) {
                web3 = new Web3(p);
            } else if (provider) {
                web3 = new Web3(provider);

            }
            const contract = new web3.eth.Contract(lotteryAbi, lotteryContract)
            const ticketPrice= await contract.methods.getTicketPrice().call({'from': wallet}, 
            function (err, res) {
                if (err) {
                    console.log("An error occured", err)
                    
                    return
                }
                console.log(res)
                return(res)
            })
    
    
            const currentLotteryId = await contract.methods.getCurrentLotteryId().call({'from': wallet}, function (err, res) {
                if (err) {
                    console.log("An error occured", err)
                    
                    return
                }
                console.log(res)
                return(res)
            })
    
            const currentLotteryPot = await contract.methods.getCurrentLotteryPot().call({'from': wallet}, function (err, res) {
                if (err) {
                    console.log("An error occured", err)
                    
                    return
                }
                console.log(res)
                return(res)
            })
            setTicketPrice(web3.utils.fromWei(ticketPrice.toString(), 'ether'));
            setRawTicketPrice(ticketPrice);
            setCurrentLotteryId(currentLotteryId)
            setCurrentLotteryPot(web3.utils.fromWei(currentLotteryPot.toString(), 'ether'))
    }

    async function getTicketCount(currentLotteryId) {
        const web3 = new Web3(p);
        const contract = new web3.eth.Contract(lotteryAbi, lotteryContract)
        const tickets = await contract.methods.getCurrentLotteryTicketsCount(wallet).call({'from': wallet}, function (err, res) {
            if (err) {
                console.log("An error occured", err)
                
                return
            }
            console.log(res)
            return(res)
        })
        setTicketCount(tickets)
    }

    async function buyTicket() {
        const web3 = new Web3(p);
        const contract = new web3.eth.Contract(lotteryAbi, lotteryContract)
        const amount = web3.utils.toWei((ticketPrice*ticketAmount).toString(), 'ether')
        const weiValue = Web3.utils.toWei((ticketPrice*ticketAmount).toString(), 'ether');
        //const amount = web3.utils.toBN(stakingSize*10**18)
        let encoded = contract.methods.buyTicket(weiValue, wallet).encodeABI()

        let tx = {
            from: wallet,
            to : lotteryContract
        }

        contract.methods.buyTicket(weiValue, wallet).send(tx,function (error, result){ 
            if(!error){
              setHash(result)
            } else{
                console.log(error);
          }})
    }

    function changeStakingSize(amount) {
        setCustomStakingSize(false)
        setStakingSize(amount)
        setAllowedAmount(true)
    }

    function handleCustomStakingSize() {
        setStakingSize(10001)
        setCustomStakingSize(true)
    }

    function setCustomStakeAmount(amount) {
        setStakingSize(amount)
        if(amount > 10000) {
            setAllowedAmount(true)
        } else {
            setAllowedAmount(false)
        }
    }

    function handleCustomValue(e) {
        if(e.target.value < 10001) {
            setStakingSize(10001)
        } else {
            setStakingSize(e.target.value)
        }
    }

    const stakingSizes = [
        {
            amount: 1000,
            text: "1,000"
        },
        {
            amount: 3000,
            text: "3,000"
        },
        {
            amount: 5000,
            text: "5,000"
        },
        {
            amount: 10000,
            text: "10,000"
        }
    ]
    async function refreshAccountData() {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        setWallet(accounts[0])
        const networkId = await web3.eth.getChainId()
        setChainId(networkId)
        if(provider) {
            getStakedInfo(wallet)
            getLotteryData()
        }
  }

    return(
        <div className="bg-white rounded-lg shadow-xl p-4">
        <div className="text-xl">
            <div className="rounded-full border-2 border-red-300 bg-white p-1">
            <div className="flex items-center justify-center w-full">
                <button onClick={() => setActiveTab(0)} className={`rounded-full w-1/2 white px-8 py-4 font-medium ${activeTab == 0 ? "bg-red-300 text-red-700" : "text-red-300"}`}>Staking</button>
                <button onClick={() => setActiveTab(1)} className={`rounded-full w-1/2 px-8 py-4 font-medium ${activeTab == 1 ? "bg-red-200 text-red-600" : "text-red-300"}`}>Lottery</button>

            </div>
            </div>
            {/*<div className="flex items-center justify-center w-full">
            <button onClick={() => setActiveTab(0)} className={`w-1/2 border-b border-b-white pl-8 rounded-tl-lg pr-4 py-4 font-medium ${activeTab == 0 ? "text-black border-r" : "text-gray-500 border-b-gray-200"}`}>Staking</button>
            <button onClick={() => setActiveTab(1)} className={`border-b border-b-white w-1/2 pr-8 pl-4 py-4 font-medium ${activeTab == 1 ? "text-black border-l" : "text-gray-500 border-b border-b-gray-200"}`}>Lottery</button>

    </div>*/}
        </div>
        {wallet ?
        <>
        {activeTab == 0 ?
            <div className="p-4 md:p-12">
                <img src="/staking.png" className="mx-auto mb-12" />
                <p className="px-4 mb-6 text-gray-700">Stake your Big Picture Coin to earn 3% APY. You may only have one active stake at a time and withdrawing your stake prematurely will result in a penalty.</p>
                <div className="mx-4 p-4 mb-6 flex flex-col bg-gray-100 border border-gray-200 rounded-lg mt-4">
                            <button className="flex justify-between items-center" onClick={() => setTermsOpen(!termsOpen)}>
                        <h2 className={`text-left flex items-center text-sm font-medium uppercase pr-4`}>
                        Click to Read our Staking Terms and Conditions
                        </h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`transition-all h-5 w-5 sm:h-6 sm:w-6 ${termsOpen ? "rotate-90" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>

                </button>
                <div className="accordion-content" aria-expanded={!termsOpen}>
                <div className="mt-4">
                    <h2 className="text-sm font-medium mb-1">WHY STAKE BPC TOKEN?</h2>
                    <p className="text-sm mb-4">EARN HIGH 3% APY YIELDS FOR 3 YEARS. BPC TOKEN HOLDERS WHO STAKE WILL BE GIVEN UNIQUE OPPORTUNITIES TO PARTICIPATE IN THE PRODUCTION PROCESS. HOW DOES THIS WORK? BPC TOKEN HOLDERS WHO STAKE WILL BE RANDOMLY CHOSEN FOR RED CARPET ACCESS, BACKSTAGE PASSES, AND OTHER FREE GIVE-AWAYS DURING THE PRODUCTION PROCESS.</p>
                    <h2 className="text-sm font-medium mb-1">WHO CAN STAKE BPC TOKEN?</h2>
                    <p className="text-sm mb-4">ANYONE! THERE ARE 3 TYPES OF BPC TOKEN HOLDERS WHO CHOOSE TO STAKE.</p>
                    <ul className="list-disc pl-5 text-sm">
                        <li className="mb-2">ANY CRYPTO ENTHUSIAST WHO OWNS BPC TOKEN HOLDER WHO CHOOSES TO STAKE THEIR BPC TOKEN TO SIMPLY EARN A 3% APY FOR 3 YEARS.</li>
                        <li className="mb-2">A BPC TOKEN HOLDER WHO IS A PRODUCTION-INVESTOR, WHO HAS SIGNED OR MADE SOME FORM OF AGREEMENT BETWEEN THEIR ALIGNED PRODUCTION COMPANY, AND THIS PRODUCTION COMPANY HAS IN-TURN SIGNED AN AGREEMENT WITH THE BPC TOKEN PRODUCTION TEAM.</li>
                        <li className="mb-4">A BPC TOKEN HOLDER WHO CHOOSES TO PARTICIPATE IN THE PRODUCTION PROCESS, AND WANTS TO HAVE THE OPPORTUNITY FOR PRODUCTION PROCESS ‘PERKS’, WHILE EARNING POSITIVE APY ON THEIR BPC TOKEN.</li>
                    </ul>
                    <h2 className="text-sm font-medium mb-1">WHEN I STAKE MY BPC TOKEN, DO I LOSE IT, OR IS IT STILL IN MY POSSESSION?</h2>
                    <p className="text-sm mb-4">STAKING BPC TOKEN REMAINS 100% IN THE POSSESSION OF (YOUR) THE BPC TOKEN HOLDER’S CRYPTO WALLET.</p>
                    <h2 className="text-sm font-medium mb-1">CAN I LOSE ANY BPC TOKEN, BY STAKING IN THE BPC TOKEN STAKING?</h2>
                    <p className="text-sm mb-4">YES. THE BPC TOKEN STAKING IS A 3-YEAR AGREEMENT, STAKING TERMS BEGINS ON THE DAY OF STAKING. 3% APY IS ACCUMULATED EARNED EVERY 30-DAYS FROM THE FIRST DAY OF STAKING. THE PENALTY FOR WITHDRAWAL OF STAKING YOUR BPC TOKEN DURING THE FIRST YEAR IS: 75%. THE PENALTY FOR WITHDRAWAL OF YOUR BPC TOKEN DURING YEAR TWO IS: 50%. THE PENALTY FOR WITHDRAWAL OF YOUR BPC TOKEN DURING YEAR THREE IS: 25%.</p>
                    <h2 className="text-sm font-medium mb-1">IF I WITHDRAW MY BPC TOKEN EARLY, WILL I EARN THE 3% APY THAT I ACCRUED FOR EACH 30-DAYS I HAD STAKED BPC TOKEN?</h2>
                    <p className="text-sm mb-4">YES, YOU WILL EARN YOUR AVERAGED 3% APY THAT ACCUMULATED EVERY 30-DAYS UP UNTIL THE DAY YOU BEGAN YOUR STAKING.</p>
                    <h2 className="text-sm font-medium mb-1">WHY WOULD I WITHDRAW MY BPC TOKEN EARLY FROM STAKING?</h2>
                    <p className="text-sm mb-4">BPC TOKEN HOLDERS WHO STAKE THEIR BPC TOKEN, MAY DECIDE TO WITHDRAW THEIR BPC TOKEN FROM THE STAKING FOR ANY REASON. ONE REASON A BPC TOKEN HOLDER MAY WITHDRAW EARLY FROM STAKING, IS TO EARN A PROFIT AS THE MARKET VALUATION OF BPC TOKEN MAY HAVE 10X FROM THE TIME OF THEIR ORIGINAL DEPOSIT, AND A TOKEN HOLDER WHO STAKES, MAY WISH TO TAKE THEIR PROFIT NOW, INSTEAD OF WAITING FOR THE END OF THE 3 YEAR BPC STAKING TERMS.</p>
                </div>
                </div>
            </div>
                
                {loadingStakes && <h2 className="px-4 text-2xl mb-4">LOADING....</h2>}
                {!stakes || stakes.length < 1 ? 
                <div className="px-4">

                <h2 className="text-2xl mb-4">Add new stake:</h2>
                    <p className="mb-4 md:mb-0">Staking sizes</p>
                <div className="flex items-center flex-col md:flex-row">
                    <div className="w-full flex items-center flex-wrap">
                    {stakingSizes.map((item, i) => {
                        return(
                            <div key={i} className="p-2 w-1/2 md:w-1/5">
                            <button className={`w-full md:mb-0 border-2 border-neutral-900 px-5 py-1 rounded-full ${!customStakingSize && stakingSize == item.amount ? "bg-neutral-900 text-white" : "text-neutral-900 bg-transparent"}`} onClick={() => changeStakingSize(item.amount)}>{item.text}</button>
                            </div>
                        )
                    })}
                    <div className="p-2 w-1/2 md:w-1/5">
                        <button className={`w-full md:mb-0 border-2 border-neutral-900 px-5 py-1 rounded-full ${customStakingSize ? "bg-neutral-900 text-white" : "text-neutral-900 bg-transparent"}`} onClick={handleCustomStakingSize}>Custom</button>
                        </div>
                    </div>
                   
                   
                    </div>
                    {customStakingSize && 
                    <div className="w-full my-2">
                    <p className="mb-2">Enter custom staking size:</p>
                    <div className="flex items-center">
                    <input type="number" value={stakingSize} onChange={(e) => setCustomStakeAmount(parseInt(e.target.value))} className="w-1/2 border border-gray-400 rounded-lg p-2" />
                            </div>
                            </div>
                        }
                </div>
                :
                <div className="px-4">
                <h2 className="text-2xl mb-4">Active stake found:</h2>
                {stakes && stakes.map((stake, i) => {
                    return(
                        <div key={i} className="flex items-center bg-gray-100 border border-gray-200 p-4 mb-4 justify-between rounded-lg">
                            <div className="flex flex-wrap w-full">
                            <div className="flex flex-wrap  w-full">
                            <div className="w-full sm:w-1/2">
                            <p className="text-sm text-gray-600">Staking date</p>
                            <p className="mb-2 sm:mb-0 mr-12 text-base">{stake.timestamp.getMonth()+1}/{stake.timestamp.getDate()}/{stake.timestamp.getFullYear()}</p>
                            </div>
                            <div className="w-full sm:w-1/2">
                            <p className="text-sm text-gray-600">Staked amount</p>
                            <p className="mr-12 text-base">{stake.stake}&nbsp;BPC</p>
                            </div></div>
                            </div>
                            <button onClick={() => withdraw(stake.id)} className="px-6 py-2 bg-neutral-900 text-white rounded-lg border-2 border-neutral-900 hover:opacity-70">
                                Withdraw
                            </button>
                         </div>   
                    )
                })}
                {stakes && <p className="text-red-600 font-bold">For security reasons, before creating a new stake, you need to withdraw your current one!</p>}
                </div>
                
                }   
                {walletID && !walletID.match(/^0x[a-fA-F0-9]{40}$/) &&<p className="my-6">Enter a valid Ethereum address.</p>}
                {wallet ? 
                <>
                {!hash ?
                <>
                {!stakes && 
                <>
                 <div className="px-4 my-5">
                <input type="checkbox" id="terms-and-conditions" name="Terms and Conditions" onChange={(e) => setAcceptedTerms(e.target.checked)} className="mr-4" />
                <label htmlFor="terms-and-conditions">I agree to the <a href="/terms-and-conditions" className="font-medium hover:opacity-70" target="_blank" rel="noopener noreferrer" >Terms and Conditions</a></label>
                </div>
                <button disabled={!acceptedTerms || !allowedAmount} className="mx-4 mt-6 px-6 py-3 border rounded-lg bg-neutral-900 text-white flex items-center hover:opacity-70 disabled:opacity-40" onClick={stake}>Stake {stakingSize} BPC now</button>
                </>
                }
                
                </>
                :
                <p className="px-4 text-xl">
                    Success! Follow your staking transaction <a className="font-bold hover:opacity-70" href={"https://etherscan.io/tx/"+hash} target="_blank" rel="noopener noreferrer">here</a>.
                </p>
                }
                

                
                
                </>
                    :
                        <button className="mt-12 px-6 py-3 border rounded-lg bg-neutral-900 text-white flex items-center hover:opacity-70" onClick={connect}><img src="/eth-logo.svg" className="h-6 w-6 mr-2" />Sign in with Ethereum</button>
                    }
            </div>
            
        :
        <div className="p-4 md:p-12">
            <img src="/lottery.png" className="mx-auto mb-12" />
            <div className="mx-2 p-4 flex flex-col bg-gray-100 border border-gray-200 rounded-lg mt-4">
                            <button className="flex justify-between items-center" onClick={() => setTermsOpen(!termsOpen)}>
                        <h2 className={`text-left flex items-center text-sm font-medium uppercase pr-4`}>
                        Click to Read our lottery Terms and Conditions
                        </h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`transition-all h-5 w-5 sm:h-6 sm:w-6 ${termsOpen ? "rotate-90" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>

                </button>
                <div className="accordion-content" aria-expanded={!termsOpen}>
                    <hr className="mt-4"/>
                <div className="mt-4">
                <h2 className="font-medium mb-1">WHO CAN PLAY THE BPC FILMMAKERS WEEKLY LOTTERY?</h2>
                <p className="mb-4">ANYONE WITH BPC TOKEN CAN TOSS IN THEIR LUCK TO PLAY & WIN EVERY WEEK!</p>
                <p className="mb-4 uppercase">You can buy as many lottery “tickets” as you wish. Each lottery ticket price is listed to the left of the screen in BPC token.</p>
                <p className="mb-4">ANY BPC TOKEN HOLDER CAN NAVIGATE THEIR WALLET TO THIS PAGE &amp; PURCHASE BPC LOTTERY ‘TICKETS’ BASED ON THE AMOUNT OF TOKENS THEY CHOOSE TO PLAY WITH. THE PRICE IS LISTED ON THIS PAGE, FOR EACH BPC ‘LOTTERY TICKET’ IN “BPC”.</p>
                <p className="mb-4">ANY BPC LOTTERY ‘TICKETS’ PURCHASED WITH YOUR WALLET PRIOR TO FRIDAYS AT 15:00 PST WILL HAVE A CHANCE TO WIN THE BPC LOTTERY FOR THE WEEK.</p>
                <h2 className="font-medium mb-1">HOW DO I KNOW IF I WON THE BPC TOKEN WEEKLY FILMMAKERS LOTTERY?</h2>
                <p className="mb-4">THE BPC LOTTERY SYSTEM WILL RANDOMLY SELECT THE BPC LOTTERY WINNER EVERY WEEK AT 15:00 PST, AND THE WINNER WILL BE RELEASED BPC TOKEN INTO THEIR WALLET AUTOMATICALLY BY THE BPC LOTTERY SYSTEM.</p>
                </div>
                </div>
            </div>
            {wallet ? 
            <>
             <div className="mt-6 flex items-center justify-between flex-wrap">
                <div className="p-2 w-1/2 md:w-1/3 p-4">
                <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    {ticketPrice && <p className="text-sm text-gray-500">Ticket price:</p>}
                    {ticketPrice && <p className="text-2xl">{ticketPrice} BPC</p>}
                    </div>
                </div>
                <div className="p-2 w-1/2 md:w-1/3 p-4">
                <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    {currentLotteryPot && <p className="text-sm text-gray-500">Current pot:</p>}
                    {currentLotteryPot && <p className="text-2xl">{currentLotteryPot} BPC</p>}
                    </div>
                </div>
                <div className="p-2 w-full md:w-1/3 p-4">
                    <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    {ticketCount && <p className="text-sm text-gray-500">Your tickets:</p>}
                    {ticketCount && <p className="text-2xl">{ticketCount}</p>}
                    </div>
                </div>
            </div>
            {!hash ? 
            <div className="w-2/3 sm:w-1/2 mx-auto">
            <h2 className="mt-6 text-center">Buy lottery tickets:</h2>
            <div className="flex items-center px-4 justify-center">
            <button disabled={ticketAmount < 2} onClick={() => setTicketAmount(ticketAmount - 1)} className="disabled:opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            </button>
            <p className="p-4 text-4xl">{ticketAmount}</p>
            <button onClick={() => setTicketAmount(ticketAmount + 1)} className="disabled:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            </button>
            </div>
            <div className="my-5">
            <input type="checkbox" id="terms-and-conditions" name="Terms and Conditions" onChange={(e) => setAcceptedTerms(e.target.checked)} className="mr-4" />
            <label htmlFor="terms-and-conditions">I agree to the <a href="/terms-and-conditions" className="font-medium hover:opacity-70" target="_blank" rel="noopener noreferrer" >Terms and Conditions</a></label>
            </div>
            <button disabled={!acceptedTerms} className="py-3 border rounded-lg bg-neutral-900 text-white hover:opacity-70 block w-full disabled:opacity-40" onClick={buyTicket}>Buy tickets</button>
            
            </div>
            :
            <p className="px-4 text-xl my-12">
                    Success! Follow your lottery transaction <a className="font-bold hover:opacity-70" href={"https://etherscan.io/tx/"+hash} target="_blank" rel="noopener noreferrer">here</a>.
                </p>
            }
           

            
            </>
            :
            <button className="mt-12 px-6 py-3 border rounded-lg bg-neutral-900 text-white flex items-center hover:opacity-70" onClick={connect}>Sign in with crypto wallet</button>
                
        }
        </div>
            
        }
        </>
        :
        <div className="p-4 md:p-12">
        <button className="px-6 py-3 border rounded-lg bg-neutral-900 text-white flex items-center hover:opacity-70 mx-auto" onClick={connect}>Sign in with crypto wallet</button>
        </div>
    }
        
        </div>
    )
}