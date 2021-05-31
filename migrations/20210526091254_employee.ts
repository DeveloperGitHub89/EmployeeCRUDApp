import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('employees', function (table) {
        table.increments();
        table.string('fname').notNullable();
        table.string('lname').notNullable();
        table.string('phone', 15).notNullable().unique();
        table.date('dob').notNullable();
        table.float('salary').notNullable();
        //table.integer('department_id').references('id').inTable('departments');
        table.timestamps(false,true);
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('employees');
}

