import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('employees', (table)=> {
        table.integer('department_id').unsigned();
        table.foreign('department_id').references('departments.id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('employees', (table)=> {
        table.dropColumn('department_id');
    });
}

