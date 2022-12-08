/*

    As this page interacts with the block chain it does a lot more than the standard table insert to we have to override it with its own 
    new.js to stop the core insert from becoming to bloated. 


*/

let privateKey = "";
let tempHardcodedPrivKey = "<ADD PRIVATE KEY HERE>";

let web3 = new Web3(Web3.givenProvider || contractUrl);
//set the contract address
let currentAccount;

//set the contract abi
let contractAbi = [{
    "inputs": [{
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
            "name": "_amount",
            "type": "uint256"
        },
        {
            "internalType": "bytes32",
            "name": "_salt",
            "type": "bytes32"
        }
    ],
    "name": "deploy",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "payable",
    "type": "function"
}]




// useless async here
async function deployIt() {
    try {
        showAlert("Deploying contract please wait", 1, 0);
        let _name = document.getElementById('inp-name').value;
        _name = _name.toString();
        let _symbol = document.getElementById('inp-contractSymbol').value;
        _symbol = _symbol.toString();
        let _salt = web3.utils.fromAscii(cryptoSalt);
        let totalSupply = "";
        totalSupply = document.getElementById("inp-totalSupply").value;
        totalSupply = totalSupply.toString() 
        const DeployContract = new web3.eth.Contract(contractAbi, contractAddress);
        let res = await DeployContract.methods.deploy(String(_name), String(_symbol), String(totalSupply), _salt).send({ from: currentAccount });
        console.log(res.events[0].address);
        showAlert("Contract deployed", 1, 1);
        document.getElementById("inp-isDeployd").value = "1"
        document.getElementById("inp-contractAddress").value = `https://testnet.bscscan.com/token/${res.events[0].address}`;
        document.getElementById("btn-token-deploy").classList.add('d-none');
        document.getElementById("btn-create").classList.remove('d-none');
    } catch (e) {
        showAlert(e.message, 2, 0);
        //console.error(e);
    } finally {
    }

}




//add a ready function
let whenDocumentReady = (f) => {
    /in/.test(document.readyState) ? setTimeout('whenDocumentReady(' + f + ')', 9) : f()
}

whenDocumentReady(isReady = () => {
    //show the body div
    document.getElementById('showBody').classList.remove('d-none');
    //get the current property
    let dataItem = JSON.parse(window.localStorage.currentDataItem);
    //clean up the name
    let name = dataItem.name.replace(" ", "");
    //get a symbol
    let symbol = name.substring(0, 3);
    //set the token name
    document.getElementById('inp-name').value = name + 'Token';
    //set the token supply
    document.getElementById('inp-totalSupply').value = dataItem.localCost;
    //set the toekn symbol
    document.getElementById('inp-contractSymbol').value = symbol;
    //set the property id
    document.getElementById('inp-propertyId').value = dataItem.id;
    //get the deployed value
    document.getElementById('inp-isDeployed').value = "0";


    const getAccounts = async () => {
        account = "";
        if (privateKey === "") {
            account = await web3.eth.getAccounts((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    return account;
                }
            });
        } else {
            let result = await web3.eth.accounts.privateKeyToAccount(privateKey);
            account = result.address;
            return account;
        }

        return account[0];
    }

    const isConnected = async () => {
        let conn = false;

        if (!window.ethereum) {
            return false;
        }

        currentAccount = await getAccounts();
        if (currentAccount === undefined) {
            conn = false;
        } else {
            conn = true;
        }

        if (!web3.currentProvider.isMetaMask) {
            conn = false;
            web3 = new Web3("https://data-seed-prebsc-1-s2.binance.org:8545/");
        } else {
            web3 = new Web3(Web3.givenProvider);
        }
        walletConnected = conn
        return conn;
    }

    (async () => {
        let res = await isConnected();
        if (res == false) {
            showAlert("Please connect meta mask", 2, 1);
        } else {
            //res = await deployIt();
            document.getElementById("btn-token-deploy").disabled = false;

        }

    })();


    document.getElementById('btn-token-deploy').addEventListener('click', function() {

        (async () => {
            let res = await isConnected();
            if (res == false) {
                showAlert("Please connect meta mask", 2, 1);
            } else {

                res = await deployIt();
            }

        })();


    })

});