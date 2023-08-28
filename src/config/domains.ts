// domains.ts
// Class that exports custom types to define objects or variables domains

//*******************************WALLET ADDRESS***************************************/
//We can use this type by the following way:
//const address: EthereumAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
//const validAddress: EthereumAddress = ethereumAddress(address);
class EthereumAddressValidator {
    validate(address: string): boolean {
        const addressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
        return addressPattern.test(address);
    }
}

const validator = new EthereumAddressValidator();

export type EthereumAddress = string & { readonly _EthereumAddressBrand: unique symbol };

export function ethereumAddress(address: string): EthereumAddress {
    if (!validator.validate(address)) {
        throw new Error('Invalid Ethereum address');
    }
    return address as EthereumAddress;
}
//*******************************END WALLET ADDRESS***************************************/

//*******************************FIELD DOMAINS***************************************/
export type TaskStatus = 'New' | 'Working' | 'Closed' | 'Cancelled';
export type ServiceContractStatus = 'New' | 'Pending approval' | 'Approved' | 'Closed' | 'Rejected';
//*******************************END FIELD DOMAINS***************************************/
