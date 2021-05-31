export const definition = [{
    id: { column: 'id', type: 'NUMBER' },
    name: 'name',
    description: 'description',
    location: 'location',
    employees: [{
        id: { column: 'employee_id', type: 'NUMBER' },
        fname: 'fname',
        lname: 'lname',
        phone: 'phone',
        dob:'dob',
        salary: { column: 'salary', type: 'NUMBER' },
        addresses: [{
            address: 'address',
            type: 'type'
        }]
    }]
}];