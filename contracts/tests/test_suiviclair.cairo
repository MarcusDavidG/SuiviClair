use array::ArrayTrait;
use result::ResultTrait;
use option::OptionTrait;
use traits::Into;
use starknet::ContractAddress;
use starknet::testing::set_caller_address;
use debug::PrintTrait;

use suiviclair::SuiviClair;
use suiviclair::SuiviClair::{
    ShipmentCreated, ShipmentUpdated, AccessGranted, 
    EncryptedShipment, ContractState
};

// Helper function to create a mock address
fn mock_address(value: felt252) -> ContractAddress {
    ContractAddress { value }
}

#[test]
fn test_create_shipment() {
    // Given
    let mut state = ContractState::default();
    let caller = mock_address(1234);
    set_caller_address(caller);

    // Mock encrypted data and proof
    let encrypted_data = 1111;
    let proof = 2222;

    // When
    let shipment_id = SuiviClair::create_shipment(
        ref state,
        encrypted_data,
        proof
    );

    // Then
    let shipment = SuiviClair::get_shipment(@state, shipment_id);
    assert(shipment.encrypted_data == encrypted_data, 'Wrong encrypted data');
    assert(shipment.owner == caller, 'Wrong owner');
    assert(shipment.status == 1, 'Wrong status');
    assert(shipment.proof == proof, 'Wrong proof');
}

#[test]
fn test_update_shipment_status() {
    // Given
    let mut state = ContractState::default();
    let caller = mock_address(1234);
    set_caller_address(caller);

    // Create initial shipment
    let shipment_id = SuiviClair::create_shipment(
        ref state,
        1111, // encrypted_data
        2222  // proof
    );

    // When
    let new_status = 2;
    let new_proof = 3333;
    SuiviClair::update_shipment_status(
        ref state,
        shipment_id,
        new_status,
        new_proof
    );

    // Then
    let updated_shipment = SuiviClair::get_shipment(@state, shipment_id);
    assert(updated_shipment.status == new_status, 'Status not updated');
    assert(updated_shipment.proof == new_proof, 'Proof not updated');
}

#[test]
fn test_grant_access() {
    // Given
    let mut state = ContractState::default();
    let owner = mock_address(1234);
    set_caller_address(owner);

    // Create shipment
    let shipment_id = SuiviClair::create_shipment(
        ref state,
        1111, // encrypted_data
        2222  // proof
    );

    // When
    let third_party = mock_address(5678);
    SuiviClair::grant_access(
        ref state,
        shipment_id,
        third_party
    );

    // Then
    // Switch caller to third party
    set_caller_address(third_party);
    // Third party should be able to view shipment
    let shipment = SuiviClair::get_shipment(@state, shipment_id);
    assert(shipment.id == shipment_id, 'Access not granted');
}

#[test]
#[should_panic(expected: ('Not authorized',))]
fn test_unauthorized_update() {
    // Given
    let mut state = ContractState::default();
    let owner = mock_address(1234);
    set_caller_address(owner);

    // Create shipment
    let shipment_id = SuiviClair::create_shipment(
        ref state,
        1111, // encrypted_data
        2222  // proof
    );

    // When
    // Try to update as different address
    set_caller_address(mock_address(5678));
    SuiviClair::update_shipment_status(
        ref state,
        shipment_id,
        2, // new_status
        3333 // new_proof
    );
}

#[test]
fn test_verify_proof() {
    // Given
    let mut state = ContractState::default();
    let caller = mock_address(1234);
    set_caller_address(caller);

    let proof = 2222;
    
    // Create shipment with proof
    let shipment_id = SuiviClair::create_shipment(
        ref state,
        1111, // encrypted_data
        proof
    );

    // Then
    assert(
        SuiviClair::verify_proof(@state, shipment_id, proof),
        'Proof verification failed'
    );
    assert(
        !SuiviClair::verify_proof(@state, shipment_id, 9999),
        'Wrong proof verified'
    );
}
