/*
Smart contract to deploy on the Ethereum network in order to query on chain data to obtain the latest interest rates 
for all 3 platforms. 
I deployed and this contract on the Kovan test network though this can be re used on the main net or another test network
NOTE: This file is not required within this project directory for the project to run as it is already deployed but I will add it 
to the repo for reference and reuse if desired
*/

pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2; //Not production ready. This is so that I can return a struct and use the LiquidityPool contract


//Needed the following libraries in order to call getReserveData in the lending pool contract (Aave platform)
library DataTypes {
  // refer to the whitepaper, section 1.1 basic concepts for a formal description of these properties.
  struct ReserveData {
    //stores the reserve configuration
    ReserveConfigurationMap configuration;
    //the liquidity index. Expressed in ray
    uint128 liquidityIndex;
    //variable borrow index. Expressed in ray
    uint128 variableBorrowIndex;
    //the current supply rate. Expressed in ray
    uint128 currentLiquidityRate;
    //the current variable borrow rate. Expressed in ray
    uint128 currentVariableBorrowRate;
    //the current stable borrow rate. Expressed in ray
    uint128 currentStableBorrowRate;
    uint40 lastUpdateTimestamp;
    //tokens addresses
    address aTokenAddress;
    address stableDebtTokenAddress;
    address variableDebtTokenAddress;
    //address of the interest rate strategy
    address interestRateStrategyAddress;
    //the id of the reserve. Represents the position in the list of the active reserves
    uint8 id;
  }
  
   struct ReserveConfigurationMap {
    //bit 0-15: LTV
    //bit 16-31: Liq. threshold
    //bit 32-47: Liq. bonus
    //bit 48-55: Decimals //This value can be useful for conversion from rate returned contract and rate as fraction. Divide result by 10^(decimals). In my case the test network was 10^27 instead
    //bit 56: Reserve is active
    //bit 57: reserve is frozen
    //bit 58: borrowing is enabled
    //bit 59: stable rate borrowing enabled
    //bit 60-63: reserved
    //bit 64-79: reserve factor
    uint256 data;
  }
}

contract CompoundInterface {
  function supplyRatePerBlock() external view returns (uint256);
}

contract DaiSavingsInterface {
    function dsr() view public returns(uint256);
}

contract LendingPoolAddressesProvider {
  function getLendingPool() external view returns ( address );
  function getAddress(bytes32 id) public view returns (address); 
}

contract LendingPool {
      function getReserveData(address asset) external view returns (DataTypes.ReserveData memory);
}

contract daiInterest {
    

    //Contract address for compounds cDAI
    address compAddress;
    CompoundInterface compoundContract;
    
    //contract address for MakerDAO's dsr
    address daiSavingsAddress;
    DaiSavingsInterface daiSavingsContract;
     
    //contract address for Aave's dai lending pool 
    LendingPoolAddressesProvider provider;
    LendingPool lendingPool;
    
    /*Constructor to instantiate an instance 
    Note: In production, the addresses should be arguments 
    to the constructor (or even to the functions) so that the 
    caller can give it the latest contract address if there 
    is a change
    */
     constructor() public {
        compAddress = 0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD;
        compoundContract = CompoundInterface(compAddress);
        
        daiSavingsAddress = 0xEA190DBDC7adF265260ec4dA6e9675Fd4f5A78bb;
        daiSavingsContract = DaiSavingsInterface(daiSavingsAddress);
        
        provider = LendingPoolAddressesProvider(address(0x88757f2f99175387aB4C6a4b3067c77A695b0349)); // kovan address
        lendingPool = LendingPool(provider.getLendingPool());
        
    }
    
    //Get all three rates together
    function getRates() public view returns(uint256[] memory) {
        uint256[] memory rates = new uint[](3);
        rates[0] = getSupplyRate(); //Compound Finance Rate
        rates[1] = getDaiSavingsRate(); //Dai Savings Rate
        rates[2] = getAaveLiquidityRate(); //Aave liquidity rate
        return rates;
    }
    
    //Get the rate from Compound finance on chain data
    function getSupplyRate() public view returns(uint256) {
        uint256 result = compoundContract.supplyRatePerBlock();
        return result;
    }
    
    //Get the rate from MakerDAO on chain data for the dsr 
    function getDaiSavingsRate() public view returns(uint256) {
        uint256 rate = daiSavingsContract.dsr();
        return rate;
    }
    
    //Get the rate from Aave on chain data for the dsr 
    function getAaveLiquidityRate() public view returns (uint128){
        DataTypes.ReserveData memory data = lendingPool.getReserveData(address(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD)); //this address is the DAI atoken on kovan 
        uint128 liquidityRate = data.currentLiquidityRate;
        return liquidityRate;
    }
    
    
