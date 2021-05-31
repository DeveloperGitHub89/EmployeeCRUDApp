import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('departments', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('location').notNullable();
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('departments');
}

