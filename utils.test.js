import * as utils from './utils.js'; //for when we actual write the code

test(`User must have a Password`, () => {
    expect( utils.UserInsert(``,`Passw0rd!`) ).toBe(false) ;
});
test(`User must have a Uname`, () => {
    expect( utils.UserInsert(`DougDimmadome23`,``) ).toBe(false) ;
});
test(`Initiative must have name`, () => {
    expect( utils.InitiativeInsert(`1`,`22`,``) ).toBe(false) ;
});
test(`Initiative must have valid electionID`, () => {
    expect( utils.InitiativeInsert(`1`,`12j`,`RailroadInitiative`) ).toBe(false) ;
});
test(`Initiative must have valid initiativeID`, () => {
    expect( utils.InitiativeInsert(`wormInitiative`,`12`,`wormInitative`) ).toBe(false) ;
});
