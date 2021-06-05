import { Knex } from "knex";
import {datatype, internet,name,phone,random,unique} from "faker";
const createFakeEmployees = (n:number)=>({
    id:n,
    fname:name.firstName(),
    lname:name.lastName(),
    phone:phone.phoneNumber(),
    salary:datatype.float(),
    dob:datatype.datetime(),
    department_id:2
});
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
   // await knex("employees").del();
    const fakeEmployees = [];
    for (let index = 0; index < 10000; index++) {
       fakeEmployees.push(createFakeEmployees(index+90001))
    }
    // Inserts seed entries
    await knex("employees").insert(fakeEmployees);
};
