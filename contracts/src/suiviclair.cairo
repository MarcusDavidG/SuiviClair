#[contract]
mod SuiviClair {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use zeroable::Zeroable;
    use array::ArrayTrait;
    use option::OptionTrait;
    use traits::Into;
    use box::BoxTrait;

    // Structs for encrypted data using Calimero SDK
    #[derive(Drop, Serde)]
    struct EncryptedShipment {
        id: felt252,
        encrypted_data: felt252, // Encrypted using Calimero SDK
        owner: ContractAddress,
        status: felt252,
        proof: felt252 // ZK proof for shipment verification
    }

    // Storage
    #[storage]
    struct Storage {
        shipments: LegacyMap::<felt252, EncryptedShipment>,
        shipment_count: u256,
        authorized_parties: LegacyMap::<(felt252, ContractAddress), bool>
    }

    // Events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        ShipmentCreated: ShipmentCreated,
        ShipmentUpdated: ShipmentUpdated,
        AccessGranted: AccessGranted
    }

    #[derive(Drop, starknet::Event)]
    struct ShipmentCreated {
        id: felt252,
        owner: ContractAddress
    }

    #[derive(Drop, starknet::Event)]
    struct ShipmentUpdated {
        id: felt252,
        new_status: felt252
    }

    #[derive(Drop, starknet::Event)]
    struct AccessGranted {
        shipment_id: felt252,
        party: ContractAddress
    }

    // Constructor
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.shipment_count.write(0);
    }

    // External functions
    #[external]
    fn create_shipment(
        ref self: ContractState,
        encrypted_data: felt252,
        proof: felt252
    ) -> felt252 {
        // Increment shipment count
        let current_count = self.shipment_count.read();
        let new_count = current_count + 1;
        self.shipment_count.write(new_count);

        // Create shipment ID
        let shipment_id = pedersen::pedersen(new_count.into(), get_block_timestamp());

        // Create new encrypted shipment
        let shipment = EncryptedShipment {
            id: shipment_id,
            encrypted_data: encrypted_data,
            owner: get_caller_address(),
            status: 1, // Active
            proof: proof
        };

        // Store shipment
        self.shipments.write(shipment_id, shipment);

        // Emit event
        self.emit(Event::ShipmentCreated(ShipmentCreated { 
            id: shipment_id, 
            owner: get_caller_address() 
        }));

        shipment_id
    }

    #[external]
    fn update_shipment_status(
        ref self: ContractState,
        shipment_id: felt252,
        new_status: felt252,
        proof: felt252
    ) {
        // Get existing shipment
        let mut shipment = self.shipments.read(shipment_id);
        assert(shipment.owner == get_caller_address(), 'Not authorized');

        // Update status with new ZK proof
        shipment.status = new_status;
        shipment.proof = proof;

        // Store updated shipment
        self.shipments.write(shipment_id, shipment);

        // Emit event
        self.emit(Event::ShipmentUpdated(ShipmentUpdated { 
            id: shipment_id, 
            new_status: new_status 
        }));
    }

    #[external]
    fn grant_access(
        ref self: ContractState,
        shipment_id: felt252,
        party: ContractAddress
    ) {
        // Verify caller is shipment owner
        let shipment = self.shipments.read(shipment_id);
        assert(shipment.owner == get_caller_address(), 'Not authorized');

        // Grant access
        self.authorized_parties.write((shipment_id, party), true);

        // Emit event
        self.emit(Event::AccessGranted(AccessGranted { 
            shipment_id: shipment_id, 
            party: party 
        }));
    }

    // View functions
    #[view]
    fn get_shipment(self: @ContractState, id: felt252) -> EncryptedShipment {
        let shipment = self.shipments.read(id);
        // Verify caller has access
        assert(
            shipment.owner == get_caller_address() || 
            self.authorized_parties.read((id, get_caller_address())),
            'No access'
        );
        shipment
    }

    #[view]
    fn verify_proof(self: @ContractState, id: felt252, proof: felt252) -> bool {
        let shipment = self.shipments.read(id);
        shipment.proof == proof
    }
}
