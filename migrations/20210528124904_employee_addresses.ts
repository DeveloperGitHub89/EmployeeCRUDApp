import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('employee_addresses', function (table) {
        table.increments();
        table.string('address',20).notNullable();
        table.string('type').notNullable();
        table.integer('employee_id').unsigned();
        table.foreign('employee_id').references('employees.id');
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('employee_addresses');
}

