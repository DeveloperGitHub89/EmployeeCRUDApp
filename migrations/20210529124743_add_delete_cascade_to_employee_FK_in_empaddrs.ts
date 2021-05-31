import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('employee_addresses', (table) => {
        table.dropForeign('employee_id');
        table.foreign('employee_id').references('employees.id').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
}

