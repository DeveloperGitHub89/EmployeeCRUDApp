import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('managers', function (table) {
        table.increments();
        table.string('fname').notNullable();
        table.string('lname').notNullable();
        table.string('phone', 15).notNullable().unique();
        table.string('password', 1000);
        table.integer('department_id').unsigned();
        table.foreign('department_id').references('departments.id');
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
}

