import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('managers', (table) => {
        table.dropForeign('department_id');
        table.foreign('department_id').references('departments.id').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
}

